import "server-only";
import { db } from "./db";

export async function getItems() {
  const items = db.query.items.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return items;
}
