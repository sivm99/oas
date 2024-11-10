import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { createRequest } from "@/Helper/request";
import { Destination, ResponseObject } from "@/Helper/types";
import useAppContext from "@/hooks/useAppContext";
import { getLocalToken } from "@/Helper/getLocalData";
import { getCookieFromString } from "@/hooks/useSetCookie";
import { DestinationDialog } from "./DestinationDialog";
import { useState } from "react";

function NewDestination() {
  const {
    user,
    destinations,
    setDestinations,
    setError,
    setHint,
    setToken,
    token,
  } = useAppContext();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const newDestination = async (f: FormData) => {
    const localToken = await getLocalToken();
    if (localToken) {
      setToken(localToken);
    }
    const destinationEmail = f.get("destination-email") as string;
    const selectedDomain = f.get("destination-domain") as string;
    if (!destinationEmail || !selectedDomain) {
      setError("Email and domain are required");
      return;
    }

    try {
      if (!token) {
        setError("You are not logged in");
        return;
      }

      const destinationResult = await createRequest(
        "POST",
        "/mail/destinations",
        {},
        token,
        { destinationEmail, domain: selectedDomain },
      );

      if (!destinationResult || !destinationResult.data) {
        setError(destinationResult.error || "Failed to create destination");
        return;
      }

      const newDestination =
        destinationResult.data as ResponseObject<Destination>;

      if (newDestination.status === "success" && newDestination.data) {
        if (destinationResult.cookies) {
          const newToken = getCookieFromString(
            destinationResult.cookies,
            "token",
          );

          if (newToken) {
            setToken(newToken);
          }
        }
        if (!destinations) {
          setDestinations([newDestination.data]);
        } else {
          setDestinations([...destinations, newDestination.data]);
        }
        setHint(`${newDestination.message}`);
        setIsDialogOpen(false);
      } else {
        setError(newDestination.message);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to create destination");
    }
  };

  return (
    <section className="mt-4">
      {user?.destinationCount == 0 && (
        <Button
          variant="outline"
          onClick={() => setIsDialogOpen(!isDialogOpen)}
          className="flex items-center gap-2 border-2 border-transparent animate-border-glow w-full"
        >
          <Plus size={20} />
          Add Destination
        </Button>
      )}
      {isDialogOpen && (
        <DestinationDialog
          type="create"
          userEmail={user?.email}
          onCancel={() => setIsDialogOpen(false)}
          cardTitle="Add New Destination"
          cardDesc="Great news! Your mail will be forwarded to this address once it's verified. You'll be able to create exciting new Rules for your selected Domain - it's that simple!"
          onAction={newDestination}
        />
      )}
    </section>
  );
}

export default NewDestination;
