"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Destination, User } from "@/Helper/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Globe,
  Mail,
  MoreVertical,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { DestinationDialog } from "./DestinationDialog";
import {
  addDestination,
  removeDestination,
  verifyDestination,
} from "./actions";
import useSimpleAppContext from "@/hooks/useSimpleAppContext";
import SmallLoader from "@/components/assets/SmallLoader";
import { useRouter } from "next/navigation";

function DestinationsCard({
  destinations,
  user,
}: {
  destinations?: Destination[];
  user?: User;
}) {
  const { setError, setLoginExpired, setHint } = useSimpleAppContext();

  const [showDelete, setShowDelete] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const router = useRouter();

  const handleVerify = async (destination: Destination) => {
    setHint(<SmallLoader />);
    const res = await verifyDestination({
      destinationID: destination.destinationID,
    });
    if (res.status === 401) {
      setHint(null);
      setLoginExpired(true);
      return;
    }
    if (res.error || !res.success || !res.verifiedDestination) {
      setHint(null);
      setError(res.error || "Failed to verify destination");
      return;
    }
    router.refresh();
  };

  const newDestination = async (f: FormData) => {
    const destinationEmail = f.get("destination-email") as string;
    const selectedDomain = f.get("destination-domain") as string;
    if (!destinationEmail || !selectedDomain) {
      setError("Email and domain are required");
      return;
    }

    try {
      setHint(<SmallLoader />);
      const destinationResult = await addDestination({
        destinationEmail,
        domain: selectedDomain,
      });

      if (destinationResult.status === 401) {
        setHint(null);
        setLoginExpired(true);
        setShowNew(false);
        return;
      }

      if (
        !destinationResult ||
        !destinationResult.success ||
        !destinationResult.newDestination
      ) {
        setHint(null);
        setError(destinationResult.error || "Failed to create destination");
        return;
      }
      router.refresh();
      setShowNew(false);
      return;
    } catch (error) {
      console.error(error);
      setError("Failed to create destination");
    }
  };
  if (!destinations)
    return (
      <section className="space-y-4">
        {showNew && (
          <DestinationDialog
            type="create"
            userEmail={user?.email}
            onCancel={() => setShowNew(false)}
            cardTitle="Add New Destination"
            cardDesc="Great news! Your mail will be forwarded to this address once it's verified. You'll be able to create exciting new Rules for your selected Domain - it's that simple!"
            onAction={newDestination}
          />
        )}
        <Button
          variant="outline"
          onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-2 border-2 border-transparent animate-border-glow w-full"
        >
          <Plus size={20} />
          Add Destination
        </Button>
      </section>
    );

  return (
    <section className="space-y-4">
      {showNew && (
        <DestinationDialog
          type="create"
          // userEmail={destinations.length > 0 ? "" : user?.email}
          onCancel={() => setShowNew(false)}
          cardTitle="Add New Destination"
          cardDesc="Great news! Your mail will be forwarded to this address once it's verified. You'll be able to create exciting new Rules for your selected Domain - it's that simple!"
          onAction={newDestination}
        />
      )}
      {destinations.map((destination) => (
        <Card key={destination.destinationID} className="shadow-lg ">
          {showDelete && (
            <DestinationDialog
              type="delete"
              onCancel={() => setShowDelete(false)}
              cardTitle={`Delete ${destination.destinationEmail} From One Alias Service`}
              cardDesc={`Warning: All rules associated with ${destination.destinationEmail} will be permanently disabled and no further email forwarding will occur. Furthermore, this destination will be blocked from any future rule creation, rendering it completely inoperable.`}
              onAction={async (f) => {
                const password = f.get("current-password") as string;
                if (!password || password.length < 8) {
                  setError("Password is required");
                  return;
                }
                setHint(<SmallLoader />);
                const deleteResponse = await removeDestination({
                  destinationID: destination.destinationID,
                  password,
                });

                // if (deleteResponse.status === 401) {
                //   setLoginExpired(true);
                //   return;
                // }
                if (!deleteResponse.success) {
                  setHint(null);
                  setError(
                    deleteResponse.error || "Failed to delete destination",
                  );
                  setShowDelete(false);
                  return;
                }

                setShowDelete(false);
                router.refresh();
                return;
              }}
            />
          )}

          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span className="truncate p-1">
                  {destination.destinationEmail}
                </span>
              </div>
              {destination.verified && (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              )}
            </CardTitle>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" title="options">
                  <MoreVertical size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setShowNew(!showNew)}>
                  New Destination
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onSelect={() => setShowDelete(!showDelete)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Globe size={20} className="text-purple-300" />
              {destination.domain}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            {!destination.verified && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleVerify(destination);
                }}
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                Verify
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}

export default DestinationsCard;
