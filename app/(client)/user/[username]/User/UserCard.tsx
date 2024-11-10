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

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User } from "@/Helper/types";
import useAppContext from "@/hooks/useAppContext";
import { createRequest } from "@/Helper/request";
import { getLocalToken } from "@/Helper/getLocalData";
import { isUserResponse } from "@/Helper/typeFunction";
import { useState } from "react";
import { UserDialog } from "./UserDialog";

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

  const [showUpdate, setShowUpdate] = useState(false);

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
      {showUpdate && (
        <UserDialog
          onAction={async (f) => {
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
                setError("Username length must be between 4-16 characters.");
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
              setError(userResponse.error || "User Details cant be updated");
              return;
            }

            const updatedUser = userResponse.data.data as User;
            setUser(updatedUser);
            if (userResponse.cookies) {
              setToken(userResponse.cookies);
            }
            setShowUpdate(false);
            return;
          }}
          onCancel={() => setShowUpdate(false)}
        />
      )}
      <CardHeader className="relative pb-0">
        <div className="absolute right-4 top-8 flex gap-2">
          <Button onClick={() => setShowUpdate(!showUpdate)} variant="outline">
            <Pencil size={20} />
          </Button>
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
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full border-2 sm:border-4 border-transparent animate-border-glow shadow-lg flex items-center justify-center text-xl sm:text-2xl font-bold">
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
        {/* <Button onClick={() => setShowUpdate(!showUpdate)} variant="outline">
          <Pencil size={20} />
        </Button> */}
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
