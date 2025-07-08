import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://cdn-dev.preoday.com/challenge/menu");
  const data = await res.json();
  return NextResponse.json(data);
}
