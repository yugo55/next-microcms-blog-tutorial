import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import * as crypto from "crypto"

export async function POST(request: Request): Promise<Response> {
  console.log("Received webhook request");
  const bodyText = await request.text();
  const bodyBuffer = Buffer.from(bodyText, "utf-8");

  const secret = process.env.MICROCMS_WEBHOOK_SIGNATURE_SECRET;
  if (!secret) {
    console.error("Secret is empty.");
    return NextResponse.json({
      status: 500,
    });
  }

  const signature = request.headers.get("X-MICROCMS-Signature")
  if (!signature) {
    console.error("Signature is empty.");
    return NextResponse.json({
      status: 400,
    });
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(bodyBuffer)
    .digest("hex");

  const isValid = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  );

  if (!isValid) {
    console.error("Invalid signature.");
    return NextResponse.json({
      status: 400,
    });
  }

  console.log("Signature verification passed");
  revalidatePath("/");
  console.log("Revalidated articles tag");
  
  return NextResponse.json({ message: "success" })
}
