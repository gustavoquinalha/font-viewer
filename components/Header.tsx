import React from "react";
import { ModeToggle } from "./mode-toggle";
import SearchSection from "./SearchSection";
import TabsSection from "./TabsSection";

interface HeaderProps {
  loading: boolean;
  error: string | null;
  activeTab: string;
  handleToggleActiveTab: (value: string) => void;
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectedFontStyleChange: (value: string) => void;
  fontStyleOptions: string[];
  selectedFontStyle: string | null;
  handleToggleSortOrder: (value: "asc" | "desc") => void;
  sortOrder: string;
  filteredFonts: any[];
  filteredFontsSelected: any[];
}

const Header: React.FC<HeaderProps> = ({
  loading,
  error,
  activeTab,
  handleToggleActiveTab,
  searchTerm,
  handleSearchChange,
  handleSelectedFontStyleChange,
  fontStyleOptions,
  selectedFontStyle,
  handleToggleSortOrder,
  sortOrder,
  filteredFonts,
  filteredFontsSelected,
}) => {
  return (
    <div className="h-auto md:h-14 flex flex-col md:flex-row gap-4 justify-between items-center py-2 px-4 w-full mx-auto sticky top-0 left-0 bg-background/90 border-b border-border backdrop-blur-sm z-50">
      <div className="flex items-center gap-2">
        <div className="text-primary font-medium whitespace-nowrap text-sm md:text-base">
          Font Viewer
        </div>
        <ModeToggle />
      </div>

      <SearchSection
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleSelectedFontStyleChange={handleSelectedFontStyleChange}
        fontStyleOptions={fontStyleOptions}
        selectedFontStyle={selectedFontStyle}
        handleToggleSortOrder={handleToggleSortOrder}
        sortOrder={sortOrder}
        activeTab={activeTab}
      />

      <TabsSection
        loading={loading}
        error={error}
        activeTab={activeTab}
        handleToggleActiveTab={handleToggleActiveTab}
        filteredFonts={filteredFonts}
        filteredFontsSelected={filteredFontsSelected}
      />
    </div>
  );
};

export default Header;
