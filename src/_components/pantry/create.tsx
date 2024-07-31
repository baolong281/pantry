import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { ClientUploadedFileData } from "uploadthing/types";

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
  const [image, setImage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [attributes, setAttributes] = useState<string>("");
  const { toast } = useToast();

  const onUploadComplete = (
    res: ClientUploadedFileData<{ uploadedBy: number }>,
  ) => {
    res.url && setImage(res.url);
  };

  const handleSubmit = async () => {
    if (!inputValue) {
      setError("Please enter a name");
      return;
    }
    if (!image) {
      setError("Please upload an image");
      return;
    }

    const res = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: inputValue,
        image: image,
        quantity: Number(quantity),
        username: user,
        attributes: attributes,
      }),
    });

    if (res.ok) {
      setAttributes("");
      setQuantity("1");
      setInputValue("");
      setImage("");

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
      <DialogTrigger asChild className="h-13 w-1/6 text-xs lg:text-lg">
        <Button variant="outline" className="w-fit">
          Add New Item +{" "}
        </Button>
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
              <ImageUploader onUploadComplete={onUploadComplete} />
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
            <Label htmlFor="name" className="text-right">
              Atributes
            </Label>
            <div className="col-span-3">
              <Input
                id="username"
                className="col-span-3"
                value={attributes}
                onChange={(e) => setAttributes(e.target.value)}
              />
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
        <DialogFooter className="flex justify-between align-middle">
          {error && <p className="mr-auto text-red-500">{error}</p>}
          <Button type="submit" onClick={handleSubmit}>
            Add Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
