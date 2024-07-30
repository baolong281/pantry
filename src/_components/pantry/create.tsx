import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUploader from "./imageUpload";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AutoComplete } from "@/components/autocomplete";
import type { Option } from "@/components/autocomplete";
import { useToast } from "@/components/ui/use-toast";

interface CreatePantryItemProps {
  options: Option[];
  user: string;
}

export function CreatePantryItem({ options, user }: CreatePantryItemProps) {
  const router = useRouter();

  const [name, setName] = useState<Option>();
  const [quantity, setQuantity] = useState("1");
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    const res = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: inputValue,
        image: "",
        quantity: Number(quantity),
        username: user,
      }),
    });

    if (res.ok) {
      toast({
        title: "Item Added ✅",
        description: `${Number(quantity)} ${inputValue} has been added to your pantry`,
      });
      router.refresh();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="h-13 w-1/6">
        <Button variant="outline">Add New Item + </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>
            Manually add new items or drop image
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4">
              <ImageUploader />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Item Name
            </Label>
            <div className="col-span-3">
              <AutoComplete
                options={options}
                emptyMessage="No items found"
                placeholder="Search for items"
                value={name}
                onValueChange={setName}
                disabled={false}
                isLoading={false}
                inputValue={inputValue}
                setInputValue={setInputValue}
              ></AutoComplete>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Quantity
            </Label>
            <Input
              id="username"
              className="col-span-3"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
