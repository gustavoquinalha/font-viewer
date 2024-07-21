import React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

interface SearchSectionProps {
  loading: boolean;
  error: string | null;
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectedFontStyleChange: (value: string) => void;
  fontStyleOptions: string[];
  selectedFontStyle: string | null;
  handleToggleSortOrder: (value: "asc" | "desc") => void;
  sortOrder: string;
  activeTab: string;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  loading,
  error,
  searchTerm,
  handleSearchChange,
  handleSelectedFontStyleChange,
  fontStyleOptions,
  selectedFontStyle,
  handleToggleSortOrder,
  sortOrder,
  activeTab,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row gap-2 w-full items-center justify-center",
        { disabled: loading || error || activeTab === "selected-fonts" }
      )}
    >
      <div className="flex gap-2 w-full max-w-full md:max-w-64">
        <Input
          type="text"
          placeholder="Search fonts..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <Select onValueChange={handleSelectedFontStyleChange}>
        <SelectTrigger className="w-full max-w-full md:max-w-32">
          <SelectValue
            placeholder={`${selectedFontStyle || "Select font style"}`}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Font Style</SelectLabel>
            <SelectItem value="All">All</SelectItem>
            {fontStyleOptions.map((option, index) => (
              <SelectItem key={index} value={option.toLowerCase()}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={handleToggleSortOrder}>
        <SelectTrigger className="w-full max-w-full md:max-w-24">
          <SelectValue
            placeholder={`${
              sortOrder === "asc" ? "A-z" : "Z-a" || "Select order"
            }`}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Order</SelectLabel>
            <SelectItem value="asc">A-z</SelectItem>
            <SelectItem value="desc">Z-a</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchSection;
