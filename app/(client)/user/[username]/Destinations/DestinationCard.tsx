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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Destination, ResponseObject } from "@/Helper/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Globe, Mail, ShieldCheck, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import useAppContext from "@/hooks/useAppContext";
import { createRequest } from "@/Helper/request";
import { getCookieFromString } from "@/hooks/useSetCookie";

function DestinationsCard({ destinations }: { destinations: Destination[] }) {
  const { token, setToken, setError, setHint, setDestinations } =
    useAppContext();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [password, setPassword] = useState("");

  const handleDelete = async (destination: Destination) => {
    setSelectedDestination(destination);
    setShowDeleteDialog(true);

    if (!token) {
      const localToken = localStorage.getItem("token");
      if (!localToken) {
        setError("Login Expired , Please Login Again");
        return;
      }
      setToken(localToken);
    }
    const res = await createRequest(
      "DELETE",
      "/mail/destinations/:destinationID",
      { destinationID: destination.destinationID },
      token,
      { password }
    );

    if (res.error || !res.data) {
      setError(res.error || "Failed to delete destination");
      return;
    }

    if (res.status === 204) {
      setDestinations(
        destinations.filter(
          (d) => d.destinationID !== destination.destinationID
        )
      );
      setHint("Destination deleted successfully");
    }
    const newToken = res.cookies
      ? getCookieFromString(res.cookies, "token")
      : null;

    setToken(newToken || token);
    return;
  };

  const confirmDelete = () => {
    if (selectedDestination) {
      console.log(
        "Deleting destination:",
        selectedDestination.destinationID,
        "with password:",
        password
      );
    }
    setShowDeleteDialog(false);
    setPassword("");
    setSelectedDestination(null);
  };

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
      {}
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
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.map((destination) => (
          <Card key={destination.destinationID} className="shadow-lg">
            <CardHeader>
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
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(destination)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Please enter your password to confirm deletion
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DestinationsCard;
