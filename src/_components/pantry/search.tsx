import { AutoComplete } from "@/components/autocomplete";
import type { Option } from "@/components/autocomplete";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SearchBarProps {
  options: Option[];
  value: Option | undefined;
  onValueChange: (value: Option | undefined) => void;
}

export function SearchBar({ options, value, onValueChange }: SearchBarProps) {
  return (
    <div className="relative h-full w-full">
      <AutoComplete
        options={options}
        emptyMessage="No items found"
        placeholder="Search for items"
        value={value}
        onValueChange={onValueChange}
        disabled={false}
        isLoading={false}
      ></AutoComplete>
      <Button
        variant="outline"
        className="absolute right-0 top-1/2 z-auto mr-2 h-8 w-8 -translate-y-1/2 transform border-none p-0 ring-0"
        onClick={(event) => {
          onValueChange?.(undefined);
        }}
      >
        <X />
      </Button>
    </div>
  );
}
