"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (user.email && user.password) {
      try {
        setLoading(true);
        const resp = await axios.post("/api/users/login", user);
        if (resp.status === 200) {
          router.push("/profile");
          console.log(resp.data);
        } else {
          toast.error("Error");
        }
        setLoading(false);
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please enter email and password");
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setSaveButtonDisabled(false);
    } else {
      setSaveButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div>
        <p>Email</p>
        <input
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          className="text-black p-2"
        />
      </div>
      <div className="m-4">
        <p>Password</p>
        <input
          id="password"
          type="text"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          className="text-black p-2"
        />
      </div>
      <button
        type="button"
        className="bg-indigo-600 px-3 py-2 rounded"
        onClick={submit}
      >
        Submit
      </button>
      <Link href="/signup">Signup</Link>
    </div>
  );
}
