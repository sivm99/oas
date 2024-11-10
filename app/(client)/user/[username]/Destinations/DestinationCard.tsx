"use client";

import {
  Card,
  // CardContent,
  CardDescription,
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
import { getCookieFromString } from "@/hooks/useSetCookie";

function DestinationsCard({ destinations }: { destinations: Destination[] }) {
  const { token, setToken, setError, setHint, setDestinations } =
    useAppContext();

  const [showDelete, setShowDelete] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const verifyDestination = async (destination: Destination) => {
    if (!token) {
      const localToken = localStorage.getItem("token");
      if (!localToken) {
        setError("Login Expired , Please Login Again");
        return;
      }
      setToken(localToken);
    }
    const res = await createRequest(
      "POST",
      "/mail/destinations/:destinationID/verify",
      { destinationID: destination.destinationID },
      token,
      {},
    );

    if (res.error || !res.data) {
      setError(res.error || "Failed to verify destination");
      return;
    }

    const verifiedDestination = res.data as ResponseObject<Destination>;

    if (verifiedDestination.status === "success" && verifiedDestination.data) {
      setHint(`${verifiedDestination.message}`);
    }
    const newToken = res.cookies
      ? getCookieFromString(res.cookies, "token")
      : null;

    setToken(newToken || token);

    setDestinations(
      destinations.map((d) => {
        if (d.destinationID === destination.destinationID) {
          return verifiedDestination.data;
        }
        return d;
      }),
    );
  };

  return (
    <section>
      {destinations.map((destination) => (
        <Card key={destination.destinationID} className="shadow-lg">
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
            <CardDescription className="flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              {destination.domain}
            </CardDescription>
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

          {/* <CardContent> */}
          {/* Empty content since email moved to title */}
          {/* </CardContent> */}

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
