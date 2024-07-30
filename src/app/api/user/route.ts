import { db } from "@/server/db";
import { items, users } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const username = url.searchParams.get("username") as string;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.name, username))
    .execute();

  if (user.length === 0) {
    return new NextResponse(JSON.stringify({ user: "User does not exist" }), {
      status: 200,
    });
  }

  return new NextResponse(JSON.stringify({ user: user[0]!.name }), {
    status: 200,
  });
}

// create new user j
export async function POST(req: Request) {
  const body = await req.json();
  const { username } = body;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.name, username))
    .execute();

  if (user.length != 0) {
    return new NextResponse(JSON.stringify({ user: user[0]!.name }), {
      status: 200,
    });
  }

  try {
    const newUser = await db
      .insert(users)
      .values({
        name: username,
      })
      .returning();

    return new NextResponse(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to create user" }),
      {
        status: 500,
      },
    );
  }
}
