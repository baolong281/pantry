import "server-only";
import { db } from "./db";

export async function getItems(userName: string) {
  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.name, userName),
  });

  if (!user) {
    return [];
  }

  const items = await db.query.items.findMany({
    where: (model, { eq }) => eq(model.userId, user.id),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return items;
}

export async function checkUsername(username: string) {
  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.name, username),
  });

  if (!user) {
    return false;
  }

  return true;
}
