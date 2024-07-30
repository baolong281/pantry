import { PantryDashboard } from "@/_components/pantry/dashboard";

export default function HomePage() {
  const items = [
    {
      name: "Tomato",
      image:
        "https://www.hunts.com/sites/g/files/qyyrlu211/files/images/products/diced-tomatoes-79288.png",
      amount: 10,
      attributes: ["Cooked", "Fresh"],
    },
    {
      name: "Potato",
      image:
        "https://images.seattletimes.com/wp-content/uploads/2024/04/04082024_OpEd-Potatoes_124536.jpg?d=2040x1488",
      amount: 10,
      attributes: ["Starchy", "Ground"],
    },
    {
      name: "Tomato Can",
      image:
        "https://www.hunts.com/sites/g/files/qyyrlu211/files/images/products/diced-tomatoes-79288.png",
      amount: 10,
      attributes: ["Cooked", "Fresh"],
    },
    {
      name: "Shallot",
      image:
        "https://images.seattletimes.com/wp-content/uploads/2024/04/04082024_OpEd-Potatoes_124536.jpg?d=2040x1488",
      amount: 10,
      attributes: ["Starchy", "Ground"],
    },
    {
      name: "Linguine",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Linguine.jpg/1200px-Linguine.jpg",
      amount: 5,
      attributes: ["Fresh", "Vegetable"],
    },
    {
      name: "Ground Beef",
      image:
        "https://i5.walmartimages.com/seo/All-Natural-80-Lean-20-Fat-Ground-Beef-Chuck-1-lb-Tray_31487a79-8b5e-40b2-ba36-3e1ee2b74d04.c1bb6a54ac0a8582d79eb17dc07f2f59.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
      amount: 5,
      attributes: ["Fresh", "Vegetable"],
    },
  ];

  return <PantryDashboard items={items} />;
}
