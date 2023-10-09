import query from "@/lib/queryApi";
import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { adminDb } from "../../../../firebaseAdmin";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { prompt, chatId, model, session } = reqBody;

    // Assuming 'query' is an asynchronous function, await its result.
    const reply = await query(prompt, chatId, model);

    const message: Message = {
      text: reply || "chatGPT was unable to answer that!",
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        _id: "chatGPT",
        name: "chatGpt",
        avatar: "https://links.papareact.com/89k",
      },
    };

    const firestorePath = `users/${session?.user?.email}/chats/${chatId}/messages`;
    console.log("Firestore Path:", firestorePath);

    await adminDb
      .collection(firestorePath)
      .add(message);

    const response = NextResponse.json({
      message: message.text,
      success: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
