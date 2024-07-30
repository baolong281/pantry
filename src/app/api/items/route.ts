// pages/api/createItem.ts
import { db } from "@/server/db";
import { items, users } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // read the request body which is json
  const body = await req.json();
  const { name, image, quantity, username } = body;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.name, username))
    .execute();

  if (user.length === 0) {
    return new NextResponse(JSON.stringify({ error: "User does not exist" }), {
      status: 400,
    });
  }

  const item = await incrementItem(name, quantity, user[0]!.id);

  if (item) {
    return new NextResponse(JSON.stringify(item), { status: 200 });
  }

  try {
    const newItem = await db
      .insert(items)
      .values({
        name: name,
        image: image,
        quantity: quantity,
        userId: user[0]!.id,
      })
      .returning();

    return new NextResponse(JSON.stringify(newItem), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to create item" }),
      {
        status: 500,
      },
    );
  }
}

async function incrementItem(name: string, quantity: number, userId: number) {
  const item = await db
    .select()
    .from(items)
    .where(and(eq(items.name, name), eq(items.userId, userId)))
    .execute();

  if (item.length === 0) {
    return null; // Return null or any appropriate response if item is not found
  }

  const updatedItem = await db
    .update(items)
    .set({ quantity: item[0]!.quantity + quantity })
    .where(eq(items.name, name))
    .returning()
    .execute();

  return updatedItem;
}
