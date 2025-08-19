"use client";

import {
  CheckCircle2,
  Globe,
  Mail,
  MoreVertical,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SmallLoader from "@/components/assets/small-loader";
import { Button } from "@/components/ui/button";
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
import type { Destination, User } from "@/types";
import useSimpleAppContext from "@/hooks/useSimpleAppContext";
import {
  addDestination,
  removeDestination,
  verifyDestination,
} from "./actions";
import { DestinationDialog } from "./DestinationDialog";

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
      destinationID: destination.destinationId,
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
    setHint("Destination was verified successfully");
    router.refresh();
  };

  const newDestination = async (f: FormData) => {
    setHint(<SmallLoader />);
    const destinationEmail = f.get("destination-email") as string;
    const selectedDomain = f.get("destination-domain") as string;
    if (!destinationEmail || !selectedDomain) {
      setError("Email and domain are required");
      return;
    }

    try {
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
      setHint(null);
      router.refresh();
      setShowNew(false);
      return;
    } catch (error) {
      console.error(error);
      setHint(null);
      setError("Failed to create destination");
    }
  };
  if (!destinations)
    return (
      <section className="space-y-4">
        {showNew && (
          <DestinationDialog
            cardDesc="Great news! Your mail will be forwarded to this address once it's verified. You'll be able to create exciting new Rules for your selected Domain - it's that simple!"
            cardTitle="Add New Destination"
            onAction={newDestination}
            onCancel={() => setShowNew(false)}
            type="create"
            userEmail={user?.email}
          />
        )}
        <Button
          className="flex items-center gap-2 border-2 border-transparent animate-border-glow w-full"
          onClick={() => setShowNew(!showNew)}
          variant="outline"
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
          cardDesc="Great news! Your mail will be forwarded to this address once it's verified. You'll be able to create exciting new Rules for your selected Domain - it's that simple!"
          // userEmail={destinations.length > 0 ? "" : user?.email}
          cardTitle="Add New Destination"
          onAction={newDestination}
          onCancel={() => setShowNew(false)}
          type="create"
        />
      )}
      {destinations.map((destination) => (
        <Card className="shadow-lg " key={destination.destinationId}>
          {showDelete && (
            <DestinationDialog
              cardDesc={`Warning: All rules associated with ${destination.destinationEmail} will be permanently disabled and no further email forwarding will occur. Furthermore, this destination will be blocked from any future rule creation, rendering it completely inoperable.`}
              cardTitle={`Delete ${destination.destinationEmail} From One Alias Service`}
              onAction={async (f) => {
                const password = f.get("current-password") as string;
                if (!password || password.length < 8) {
                  setError("Password is required");
                  return;
                }
                setHint(<SmallLoader />);
                const deleteResponse = await removeDestination({
                  destinationID: destination.destinationId,
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
                setHint(null);
                router.refresh();
                return;
              }}
              onCancel={() => setShowDelete(false)}
              type="delete"
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
              {destination.isVerified && (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              )}
            </CardTitle>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" title="options" variant="ghost">
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
              <Globe className="text-purple-300" size={20} />
              {destination.domain}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            {!destination.isVerified && (
              <Button
                onClick={() => {
                  handleVerify(destination);
                }}
                size="sm"
                variant="outline"
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
