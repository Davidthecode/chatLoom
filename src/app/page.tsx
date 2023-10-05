'use client';

import Auth from "./components/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./state/auth/authContext";

export default function Home() {
  const {isAuth} = useAuthContext();
  const router = useRouter();
  const { push } = router;

  useEffect(() => {
    // Redirect to Chatloom if user is already authenticated
    if (!isAuth) {
      push("/");
    }else {
      push("/chats")
    }
  }, [isAuth]);

  return (
    <div>
      {!isAuth && (
        <Auth/>
      )}
    </div>
  );
};