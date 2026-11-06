import { NextResponse } from "next/server";

// Rend compatible l'export statique GitHub Pages (aucune donnée dynamique).
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}