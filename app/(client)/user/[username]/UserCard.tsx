import {
  AtSign,
  CheckCircle,
  Forward,
  Inbox,
  Mail,
  Pencil,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User } from "@/Helper/types";
import { Input } from "@/components/ui/input";
import useAppContext from "@/hooks/useAppContext";
import { createRequest } from "@/Helper/request";

const UserProfileCard = ({
  name,
  username,
  email,
  emailVerified,
  avatar,
  aliasCount,
  destinationCount,
}: User) => {
  // const navigate = useNavigate();
  const { setHint, setError } = useAppContext();
  const handleVerifyEmail = async () => {
    const verifyEmailResult = await createRequest(
      "GET",
      `/user/${username}/verify`,
    );

    if (!verifyEmailResult) {
      setError("Failed to verify email");
      return;
    }

    if (verifyEmailResult.status === 200 && verifyEmailResult.data) {
      setHint(verifyEmailResult.data.message);
    } else if (verifyEmailResult.error) {
      setError(verifyEmailResult.error);
    } else {
      setError("An unknown error occurred");
    }
  };

  return (
    <Card className="w-full  mx-auto overflow-hidden">
      {/* Header Section */}
      <CardHeader className="relative pb-0">
        <div className="absolute right-4 top-4 flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Edit User Details</AlertDialogTitle>
                <AlertDialogDescription>
                  Make changes to your profile details below
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="New Name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input id="username" className="col-span-3" />
                </div>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Save Changes</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatar}
                alt={" "}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-full border-4 border-ring shadow-lg  flex items-center justify-center  text-2xl font-bold">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full bg-green-500" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <AtSign size={20} color="hsl(var(--primary))" />
              {username}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="mt-6 space-y-6">
        {/* Email Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">
                Primary Email
              </Label>
              <p className="font-medium flex items-center gap-2">
                <Mail size={20} color="hsl(var(--primary))" />
                {email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {emailVerified ? (
                <Badge
                  // color="hsl(var(--primary))"
                  variant="outline"
                  className="flex items-center gap-1 border-green-500"
                >
                  <CheckCircle size={20} className="text-green-500" />
                  Verified
                </Badge>
              ) : (
                <div className="flex items-center gap-2">
                  <Badge
                    variant="destructive"
                    className="flex items-center gap-1"
                  >
                    <XCircle size={20} className="text-red-600" />
                    Unverified
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleVerifyEmail}
                    className="flex items-center gap-1"
                  >
                    <Mail className="h-3 w-3" />
                    Verify Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex justify-between items-center mt-6 gap-4">
          <div className="flex items-center space-x-4 p-4  rounded-lg shadow-ring shadow-sm w-full">
            <Forward size={20} className="text-primary" />
            <div>
              <Label className="text-sm text-muted-foreground">Rules</Label>
              <p className="text-2xl font-semibold">{aliasCount}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 rounded-lg shadow-ring shadow-sm w-full">
            <Inbox size={20} className="text-primary" />
            <div>
              <Label className="text-sm text-muted-foreground">
                Destinations
              </Label>
              <p className="text-2xl font-semibold">{destinationCount}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
