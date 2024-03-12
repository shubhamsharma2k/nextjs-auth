"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const [me, setMe] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const getUserDetails = async () => {
      const resp = await axios.get("/api/users/me");
      if (resp.status === 200) {
        setMe(resp.data.data);
      }
    };

    getUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/users/logout");
      if (res.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mt-4">
        <Link
          href={`/profile/${me._id}`}
          className="bg-transparent hover:bg-blue-500 text-white-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Go to Profile Details
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-transparent hover:bg-blue-500 text-white-400 font-semibold hover:text-white py-2 px-4 my-4 border border-blue-500 hover:border-transparent rounded"
      >
        Logout
      </button>
    </div>
  );
}
