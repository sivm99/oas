import {
  AtSign,
  CheckCircle,
  Forward,
  Inbox,
  Mail,
  MoreVertical,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User } from "@/Helper/types";
import useAppContext from "@/hooks/useAppContext";
import { createRequest } from "@/Helper/request";
import { useState } from "react";
import { UserDialog } from "./UserDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const { setHint, setError, setUser, token, setLoginExpired } =
    useAppContext();

  const [showUpdate, setShowUpdate] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);

  const handleVerifyEmail = async () => {
    if (!token) {
      // setError("You have to Login Again for this action");
      setLoginExpired(true);
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
    if (verifyEmailResult.status === 401) {
      setLoginExpired(true);
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
      {showUpdate && (
        <UserDialog
          type="basic"
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

            if (userResponse.status === 401) {
              setLoginExpired(true);
              return;
            }
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
            setShowUpdate(false);
            return;
          }}
          onCancel={() => setShowUpdate(false)}
        />
      )}

      {showAvatar && (
        <UserDialog
          type="pic"
          onAction={async (f) => {
            if (!token) {
              // setError("You Must Be logged in for Changing Your Details");
              setLoginExpired(true);
              return;
            }
            const avatar = f.get("avatar-url") as string;
            const userResponse = await createRequest(
              "PATCH",
              "/user/:username",
              { username },
              token,
              {
                avatar,
              },
            );
            if (userResponse.status === 401) {
              setLoginExpired(true);
              return;
            }
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
            setShowAvatar(false);
            return;
          }}
          onCancel={() => setShowAvatar(false)}
        />
      )}

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        {/* <div className="absolute right-4 top-8 flex gap-2">
          <Button onClick={() => setShowUpdate(!showUpdate)} variant="outline">
            <Pencil size={20} />
          </Button>
        </div> */}

        <div className="flex items-center gap-3">
          <div className="relative">
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <Avatar className="border-2 border-transparent animate-border-glow">
                <AvatarImage src={avatar} className="p-[.9]" />
                <AvatarFallback>
                  {name
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}{" "}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="">
                <AvatarImage
                  src="https://utfs.io/f/zC13qIHNKdXyq2ELyxDKfF6roNkB8A1wCqxzTpVhO9i2RjHW"
                  className="p-[.9]"
                />
                <AvatarFallback>
                  {name
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}{" "}
                </AvatarFallback>
              </Avatar>
            )}
            {/* <span className="absolute bottom-0 right-0 w-3 h-3 sm:w-5 sm:h-5 border-2 border-white rounded-full bg-green-500" /> */}
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <AtSign size={20} color="hsl(var(--primary))" />
              {username}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" title="options">
              <MoreVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setShowUpdate(!showUpdate)}>
              New Name
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setShowAvatar(!showAvatar)}>
              Update Avatar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
