"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { removeUser } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isAuth, email } = useAuth();
  return isAuth ? (
    <>
      <h1>Home</h1>
      <button onClick={() => dispatch(removeUser())}>
        Log out from {email}
      </button>
    </>
  ) : (
    router.push("/login")
  );
}
