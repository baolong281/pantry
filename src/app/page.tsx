import { PantryDashboard } from "@/_components/pantry/dashboard";
import { getItems } from "@/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const items = await getItems();

  const itemsArray = items.map((item) => ({
    name: item.name,
    image: item.image,
    amount: item.quantity,
    attributes: ["Cooked", "Fresh"],
  }));

  return <PantryDashboard items={itemsArray} />;
}
