import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export interface PantryItemProps {
  name: string;
  image: string;
  amount: number;
  attributes: string[];
  className?: string;
}

export function PantryItem(props: PantryItemProps) {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="flex justify-between font-dmSans">
          <div>{props.name}</div>{" "}
          <Badge variant="outline">{props.amount}</Badge>
        </CardTitle>
        <CardDescription>{props.attributes.join(", ")}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <Image
          src={props.image}
          alt={props.name}
          height={24}
          width={24}
          className="h-40 w-40 rounded-md"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">-</Button>
        <Button>+</Button>
      </CardFooter>
    </Card>
  );
}
