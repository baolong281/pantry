import { PantryDashboard } from "@/_components/pantry/dashboard";
import { getItems } from "@/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: { slug: string[] };
}) {
  const user = params.slug[0] as string;
  const items = await getItems(user);

  const itemsArray = items.map((item) => ({
    name: item.name,
    image: item.image,
    amount: item.quantity,
    attributes: item.attributes,
  }));

  return <PantryDashboard items={itemsArray} user={user} />;
}
