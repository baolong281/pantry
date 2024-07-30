"use client";

import { PantryItem, PantryItemProps } from "./item";
import { SearchBar } from "./search";
import { useState } from "react";
import type { Option } from "@/components/autocomplete";
import { CreatePantryItem } from "./create";

export interface PantryDashboardProps {
  items: PantryItemProps[];
}

const validSearch = (
  searchValue: Option | undefined,
  item: PantryItemProps,
): boolean => {
  if (!searchValue) {
    return true;
  }

  return item.name.toLowerCase().includes(searchValue.label.toLowerCase());
};

export function PantryDashboard({ items }: PantryDashboardProps) {
  const [searchValue, setSearchValue] = useState<Option>();

  const options = items.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  return (
    <div className="flex flex-col">
      <div className="flex h-12 w-full">
        <SearchBar
          options={options}
          value={searchValue}
          onValueChange={setSearchValue}
        />
      </div>
      <div className="-mb-4 gap-8 p-8 pb-0 pl-10">
        <CreatePantryItem />
      </div>
      <div className="col-span-1 grid gap-4 p-8 md:grid-cols-3 lg:grid-cols-5">
        {items.map((item) => {
          if (validSearch(searchValue, item)) {
            return <PantryItem key={item.name} {...item} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}
