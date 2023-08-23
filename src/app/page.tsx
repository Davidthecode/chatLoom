'use client';

import Auth from "./components/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useContext } from "react";
import { AuthContext } from "./state/authContext";

export default function Home() {
  const checkContext = useContext(AuthContext)
  const router = useRouter();
  const { push } = router;

  useEffect(() => {
    // Redirect to Chatloom if user is already authenticated
    if (checkContext?.isAuth) {
      push("/chats");
    };
  }, [checkContext?.isAuth]);

  return (
    <div>
      {!checkContext?.isAuth && (
        <Auth/>
      )};
    </div>
  );
};