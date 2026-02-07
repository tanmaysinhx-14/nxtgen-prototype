import { NextResponse } from "next/server";
import { routes } from "../lib/mockRoutes";

export async function POST(req: Request) {
  const { accessibility } = await req.json();

  const result = accessibility
    ? routes.filter(r => r.accessible)
    : routes;

  return NextResponse.json(result);
}
