"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      const resp = await axios.post("/api/users/signup", user);
      if (resp.status === 201) {
        setLoading(false)
        toast.success("Account created successfully");
        router.push("/login");
      } else {
        toast.error("Error");
        setLoading(false)

      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setSaveButtonDisabled(false);
    } else {
      setSaveButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Signup</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
        className="text-black"
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        className="text-black"
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="text"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
        className="text-black"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={submit}
        disabled={saveButtonDisabled}
      >
        Submit
      </button>
      <Link href="/login">Signin</Link>
    </div>
  );
}
