// import { getServerURL } from "@/utils/getServerURL";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

interface IChatMessage {
  developer_message: string;
  user_message: string;
  model?: string;
}

export async function POST(request: NextRequest) {
  try {
    const h = await headers();
    const origin =
      process.env.NEXT_PUBLIC_IS_LOCAL === "true"
        ? "http://localhost:8000"
        : process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : `http://${h.get("host")}`;

    const body = (await request.json()) as IChatMessage;

    // Get API key from environment variable
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || typeof apiKey !== "string") {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Add API key to the request body
    const requestBody = {
      developer_message: body.developer_message,
      user_message: body.user_message,
      model: body.model ?? "gpt-4.1-mini",
      api_key: apiKey,
    };

    console.log("Forwarding request to backend:", `${origin}/api/chat`);

    // Forward the request to the backend API
    const response = await fetch(`${origin}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Backend API responded with status: ${response.status}: ${errorText}`
      );
    }

    // Return the streaming response
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in chat API route:", error);
    return NextResponse.json(
      { error: "Failed to communicate with Dragon AI" },
      { status: 500 }
    );
  }
}
