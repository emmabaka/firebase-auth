"use client";
import { useState } from "react";
import { setUser } from "@/store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/reduxHooks";

const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
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
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <button>Register</button>
      </form>
      <p>
        Or <Link href="/login">Log in</Link>
      </p>
    </>
  );
};

export default Register;
