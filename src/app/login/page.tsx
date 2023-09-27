"use client";
import { useState } from "react";
import { setUser } from "@/store/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/reduxHooks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        router.push("/");
      })
      .catch(console.log);
  };
  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </label>
        <button type="submit">Log in</button>
      </form>
      <p>
        Or <Link href="/register">Register</Link>
      </p>
    </>
  );
};

export default Login;
