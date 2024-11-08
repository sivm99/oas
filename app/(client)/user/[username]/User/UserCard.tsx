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
import { getLocalToken } from "@/Helper/getLocalData";
import { isUserResponse } from "@/Helper/typeFunction";

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
  const { setHint, setError, setUser, token, setToken } = useAppContext();

  if (!token) {
    getLocalToken().then((localToken) => {
      if (localToken) {
        setToken(localToken);
      }
    });
  }

  const handleVerifyEmail = async () => {
    if (!token) {
      setError("You have to Login Again for this action");
      return;
    }

    const verifyEmailResult = await createRequest(
      "GET",
      `/user/:username/verify`,
      { username },
      token,
    );

    if (!verifyEmailResult) {
      setError("Failed to verify email");
      return;
    }

    if (verifyEmailResult.status === 200 && verifyEmailResult.data) {
      setHint(verifyEmailResult.data.message);
      if (isUserResponse(verifyEmailResult.data)) {
        setUser(verifyEmailResult.data.data);
        if (verifyEmailResult.cookies) {
          setToken(verifyEmailResult.cookies);
        }
      }
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

              <form
                className="grid gap-4 py-4"
                action={async (f) => {
                  if (!token) {
                    setError("You Must Be logged in for Changing Your Details");
                    return;
                  }
                  const newName = f.get("newName") as string;
                  const newUsername = f.get("new-username") as string;
                  console.log({ newName, newUsername });
                  const uRegex = /^[a-zA-Z][a-zA-Z0-9._-]{3,}$/;

                  if (newUsername) {
                    if (newUsername.length < 4 || newUsername.length > 16) {
                      setError(
                        "Username length must be between 4-16 characters.",
                      );
                      return;
                    }

                    if (!uRegex.test(newUsername.toLowerCase())) {
                      setError(
                        "Username must start with a letter and can only contain letters, numbers, dots, underscores, or hyphens.",
                      );
                      return;
                    }
                  }

                  const userResponse = await createRequest(
                    "PATCH",
                    "/user/:username",
                    { username },
                    token,
                    {
                      name: newName,
                      username: newUsername,
                    },
                  );

                  if (
                    userResponse.error ||
                    !userResponse.data ||
                    !userResponse.data.data
                  ) {
                    setError(
                      userResponse.error || "User Details cant be updated",
                    );
                    return;
                  }

                  const updatedUser = userResponse.data.data as User;
                  setUser(updatedUser);
                  if (userResponse.cookies) {
                    setToken(userResponse.cookies);
                  }
                  return;
                }}
              >
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="newName" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="newName"
                    name="newName"
                    placeholder="New Name"
                    minLength={4}
                    // defaultValue={name}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="new-username"
                    name="new-username"
                    title="4-16 characters, starting with a letter, and containing only letters, numbers, dots, underscores, or hyphens."
                    className="col-span-3"
                    placeholder="cool-boi"
                    minLength={4}
                    // pattern="^[a-zA-Z][a-zA-Z0-9._-]*$"
                    pattern="^[a-zA-Z]\S*$"
                    maxLength={16}
                  />
                </div>
                <AlertDialogAction type="submit">
                  Save Changes
                </AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </form>
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
                className="w-12 h-12 sm:w-20 sm:h-20 rounded-full border-2 sm:border-4 border-transparent animate-border-glow shadow-lg"
              />
            ) : (
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full border-2 sm:border-4 border-ring shadow-lg flex items-center justify-center text-xl sm:text-2xl font-bold">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-3 h-3 sm:w-5 sm:h-5 border-2 border-white rounded-full bg-green-500" />
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
                  variant="secondary"
                  className="flex items-center gap-1 border-green-500"
                >
                  <CheckCircle size={20} className="text-green-500" />
                </Badge>
              ) : (
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <XCircle size={20} className="text-red-600" />
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleVerifyEmail}
                    className="flex items-center gap-1"
                  >
                    <Mail className="h-3 w-3" />
                    Verify
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {aliasCount > 0 && (
            <div className="flex items-center justify-between p-2 rounded-md border">
              <div className="flex items-center gap-2">
                <Forward size={16} className="text-primary" />
                <Label className="text-sm text-muted-foreground">Rules</Label>
              </div>
              <p className="text-lg font-medium">{aliasCount}</p>
            </div>
          )}
          {destinationCount > 0 && (
            <div className="flex items-center justify-between p-2 rounded-md border">
              <div className="flex items-center gap-2">
                <Inbox size={16} className="text-primary" />
                <Label className="text-sm text-muted-foreground">
                  Destinations
                </Label>
              </div>
              <p className="text-lg font-medium">{destinationCount}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
