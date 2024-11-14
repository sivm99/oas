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

import { Destination, ResponseObject } from "@/Helper/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Globe,
  Mail,
  MoreVertical,
  ShieldCheck,
} from "lucide-react";
import useAppContext from "@/hooks/useAppContext";
import { createRequest } from "@/Helper/request";
import { DestinationDialog } from "./DestinationDialog";
import { db } from "@/Helper/dbService";

function DestinationsCard({ destinations }: { destinations: Destination[] }) {
  const { token, setError, setHint, setDestinations, setLoginExpired } =
    useAppContext();

  const [showDelete, setShowDelete] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const verifyDestination = async (destination: Destination) => {
    if (!token) {
      setLoginExpired(true);
      return;
    }
    const res = await createRequest(
      "POST",
      "/mail/destinations/:destinationID/verify",
      { destinationID: destination.destinationID },
      token,
      {},
    );
    if (res.status === 401) {
      setLoginExpired(true);
      return;
    }
    if (res.error || !res.data) {
      setError(res.error || "Failed to verify destination");
      return;
    }

    const verifiedDestination = res.data as ResponseObject<Destination>;

    if (verifiedDestination.status === "success" && verifiedDestination.data) {
      setHint(`${verifiedDestination.message}`);
    }
    setDestinations(
      destinations.map((d) => {
        if (d.destinationID === destination.destinationID) {
          return verifiedDestination.data;
        }
        return d;
      }),
    );
  };

  const newDestination = async (f: FormData) => {
    const destinationEmail = f.get("destination-email") as string;
    const selectedDomain = f.get("destination-domain") as string;
    if (!destinationEmail || !selectedDomain) {
      setError("Email and domain are required");
      return;
    }

    try {
      if (!token) {
        // setError("You are not logged in");
        setLoginExpired(true);
        return;
      }

      const destinationResult = await createRequest(
        "POST",
        "/mail/destinations",
        {},
        token,
        { destinationEmail, domain: selectedDomain },
      );
      if (destinationResult.status === 401) {
        setLoginExpired(true);
        return;
      }
      if (!destinationResult || !destinationResult.data) {
        setError(destinationResult.error || "Failed to create destination");
        return;
      }

      const newDestination =
        destinationResult.data as ResponseObject<Destination>;

      if (newDestination.status === "success" && newDestination.data) {
        if (!destinations) {
          setDestinations([newDestination.data]);
        } else {
          setDestinations([...destinations, newDestination.data]);
        }
        setHint(`${newDestination.message}`);
        setShowNew(false);
      } else {
        setError(newDestination.message);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to create destination");
    }
  };

  return (
    <section>
      {destinations.map((destination) => (
        <Card key={destination.destinationID} className="shadow-lg">
          {showNew && (
            <DestinationDialog
              type="create"
              onCancel={() => setShowNew(false)}
              cardTitle="Add New Destination"
              cardDesc="Great news! Your mail will be forwarded to this address once it's verified. You'll be able to create exciting new Rules for your selected Domain - it's that simple!"
              onAction={newDestination}
            />
          )}
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
                if (!token) {
                  setLoginExpired(true);
                  setShowDelete(false);

                  return;
                }

                const deleteResponse = await createRequest(
                  "DELETE",
                  "/mail/destinations/:destinationID",
                  {
                    destinationID: destination.destinationID,
                  },
                  token,
                  {
                    password,
                  },
                );
                if (deleteResponse.status === 401) {
                  setLoginExpired(true);
                  return;
                }
                if (deleteResponse.error || deleteResponse.status !== 204) {
                  setError(
                    deleteResponse.error || "Some Unknown Error Occurred",
                  );
                  setShowDelete(false);
                  return;
                }
                await db.deleteDestinationById(
                  destination.destinationID,
                  destination.username,
                );
                setDestinations(
                  destinations.filter(
                    (p) => destination.destinationID !== p.destinationID,
                  ),
                );

                setShowDelete(false);
                window.location.reload();
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
            <div className="space-x-2 flex items-center gap-2">
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
                  verifyDestination(destination);
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
