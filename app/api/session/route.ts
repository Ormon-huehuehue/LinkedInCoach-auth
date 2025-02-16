import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {

  console.log("/api/session called")
  const cookieStore = cookies();
  const supabase = createClient();
  const { data } = await (await supabase).auth.getSession();

  console.log("data", data)

  if (!data.session) {
    return new NextResponse(
      JSON.stringify({ error: "No active session" }),
      {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": "chrome-extension://ecmkdildiabljkllajajlapjmdidgkam", 
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Credentials": "true", // Allow cookies
        },
      }
    );
  }

  return new NextResponse(
    JSON.stringify(data.session),
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "chrome-extension://ecmkdildiabljkllajajlapjmdidgkam", // Change to your extension ID in production
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "chrome-extension://ecmkdildiabljkllajajlapjmdidgkam",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
