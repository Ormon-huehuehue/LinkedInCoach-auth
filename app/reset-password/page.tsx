"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("text-red-500"); // Default to red for errors
  const [isTokenValid, setIsTokenValid] = useState(true);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");

    if (accessToken) {
      supabase.auth
        .setSession({
          access_token: accessToken,
          refresh_token: hashParams.get("refresh_token") || "",
        })
        .then(({ error }) => {
          if (error) {
            setIsTokenValid(false);
            setMessage("The reset link has expired or is invalid.");
          }
        });
    } else {
      setIsTokenValid(false);
      setMessage("The reset link is missing or invalid.");
    }
  }, []);

  const handlePasswordReset = async () => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage(error.message);
      setMessageColor("text-red-500");
    } else {
      setMessage("Password updated successfully!");
      setMessageColor("text-green-500");
      setTimeout(() => router.push("/login"), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

      {!isTokenValid ? (
        <p className="text-red-500">The reset link has expired or is invalid.</p>
      ) : (
        <>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 mb-2"
          />
          <button
            onClick={handlePasswordReset}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </>
      )}

      {message && <p className={`mt-2 ${messageColor}`}>{message}</p>}
    </div>
  );
}
