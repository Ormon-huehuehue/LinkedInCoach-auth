"use client"

import { signInAction, signInWithLinkedIn } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default  function Login() {
  return (
    

        <button
              type="button"
              className="flex w-full justify-center rounded-md bg-linkedInBackground px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueBackground cursor-pointer"
              onClick = {() => {
                signInWithLinkedIn()
              }}
        > sign In with linkedInn</button>
        
  );
}
