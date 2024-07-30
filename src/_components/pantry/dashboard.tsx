"use client";

import { PantryItem, PantryItemProps } from "./item";
import { SearchBar } from "./search";
import { useState } from "react";
import type { Option } from "@/components/autocomplete";

export interface PantryDashboardProps {
  items: PantryItemProps[];
}

const validSearch = (searchValue: Option | undefined, item): boolean => {
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
      <div className="grid w-full grid-cols-3 pb-0">
        <SearchBar
          options={options}
          value={searchValue}
          onValueChange={setSearchValue}
        />
      </div>
      <div className="col-span-1 grid gap-8 p-8 md:grid-cols-3 lg:grid-cols-5">
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
