import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface PantryItemProps {
  name: string;
  image: string;
  amount: number;
  attributes: string[];
  className?: string;
}

export function PantryDashboard() {
  const items = [
    {
      name: "Tomato Can",
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
  ];

  return (
    <div className="col-span-1 grid grid-cols-5 gap-48 p-8">
      {items.map((item) => (
        <PantryItem key={item.name} {...item} />
      ))}
    </div>
  );
}

export function PantryItem(props: PantryItemProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex justify-between font-dmSans">
          <div>{props.name}</div>{" "}
          <Badge variant="outline">{props.amount}</Badge>
        </CardTitle>
        <CardDescription>{props.attributes.join(", ")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={props.image}
          alt={props.name}
          height={24}
          width={24}
          className="h-24 w-24 rounded-md"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Remove</Button>
        <Button>Add</Button>
      </CardFooter>
    </Card>
  );
}
