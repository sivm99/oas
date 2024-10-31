import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { createRequest } from "@/Helper/request";
import { Destination, ResponseObject } from "@/Helper/types";
import useAppContext from "@/hooks/useAppContext";
import { getLocalToken } from "@/Helper/getLocalData";
import { getCookieFromString } from "@/hooks/useSetCookie";

const domains = ["1as.in", "20032003.xyz", "n3y.in"];

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
  const [destinationEmail, setDestinationEmail] = useState("");
  const [selectedDomain, setSelectedDomain] = useState(domains[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setDestinationEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const localToken = await getLocalToken();
    if (localToken) {
      setToken(localToken);
    }

    if (!destinationEmail || !selectedDomain) {
      console.error("Email and domain are required");
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
        { destinationEmail, domain: selectedDomain }
      );

      if (!destinationResult || !destinationResult.data) {
        setError(destinationResult.error || "Failed to create destination");
        return;
      }

      const newDestination =
        destinationResult.data as ResponseObject<Destination>;

      if (newDestination.status === "success" && newDestination.data) {
        if (destinationResult.cookies) {

            const newToken = getCookieFromString(destinationResult.cookies, "token");

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
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Destination
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Destination</DialogTitle>
            <DialogDescription>
              Add a new destination email address where your emails will be
              forwarded.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter destination email"
                  value={destinationEmail}
                  onChange={(e) => setDestinationEmail(e.target.value)}
                />
              </div>

              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-secondary p-3 rounded-md">
              <p className="text-sm font-medium">Configuration Summary:</p>
              <p className="text-sm">
                By adding{" "}
                <span className="text-primary">{destinationEmail}</span> as your
                destination address, you &apos ll be able to:
              </p>
              <ul className="text-sm list-disc ml-4 mt-1">
                <li>
                  Create custom email aliases on{" "}
                  <span className="text-primary">{selectedDomain}</span>
                </li>
                <li>
                  Have all emails sent to these aliases automatically forwarded
                  to your destination address
                </li>
                <li>Manage multiple aliases from one central destination</li>
              </ul>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleSubmit}>
                Add Destination
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default NewDestination;
