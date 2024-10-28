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

import { Destination } from "@/Helper/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Globe, Mail, ShieldCheck, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

function DestinationsCard({ destinations }: { destinations: Destination[] }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [password, setPassword] = useState("");

  const handleDelete = (destination: Destination) => {
    setSelectedDestination(destination);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedDestination) {
      console.log(
        "Deleting destination:",
        selectedDestination.destinationID,
        "with password:",
        password,
      );
    }
    setShowDeleteDialog(false);
    setPassword("");
    setSelectedDestination(null);
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
                <Button variant="outline" size="sm">
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
