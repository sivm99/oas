"use client";
import UserField from "./UserField";
import DestinationField from "./DestinationField";
import useAppContext from "@/hooks/useAppContext";
import { useEffect } from "react";
import { redirect, useParams } from "next/navigation";
import RuleField from "./RuleField";

function DashBoard() {
  const params = useParams<{ username: string }>();

  const { user } = useAppContext();
  const { username } = params;

  useEffect(() => {
    if (user?.username != username) {
      redirect(`/user/${user?.username}`);
    }
  }, [user, username]);

  return (
    <main className="dash_wrapper">
      <div className="dash_child">
        <UserField />
      </div>
      <div className="dash_child">
        <RuleField />
      </div>
      <div className="dash_child">
        <DestinationField />
      </div>
    </main>
  );
}

export default DashBoard;
