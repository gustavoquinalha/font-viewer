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
import { Search } from "lucide-react";

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
      <div className="flex gap-2 w-full max-w-full md:max-w-64 relative">
        <Input
          type="text"
          className="pr-8"
          placeholder="Search fonts..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="absolute top-2 right-2 font-medium">
          <Search className="w-5 h-5" />
        </div>
      </div>

      <Select onValueChange={handleSelectedFontStyleChange}>
        <SelectTrigger className="w-full max-w-full md:max-w-36 lg:max-w-44 relative pl-20 md:pl-3 lg:pl-20">
          <SelectValue
            placeholder={`${selectedFontStyle || "Select font style"}`}
          />
          <div className="absolute top-2 left-2 font-medium block md:hidden lg:block">
            Font style
          </div>
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
        <SelectTrigger className="w-full max-w-full md:max-w-32 lg:max-w-36 relative pl-14 md:pl-3 lg:pl-14">
          <SelectValue
            placeholder={`${
              sortOrder === "asc" ? "A-z" : "Z-a" || "Select order"
            }`}
          />
          <div className="absolute top-2 left-2 font-medium block md:hidden lg:block">
            Order
          </div>
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
