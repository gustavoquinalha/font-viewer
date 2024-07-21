import React from "react";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

interface FontMetadata {
  family: string;
  fullName?: string;
  style?: string;
}

interface FontGridProps {
  listMode: string;
  currentFonts: FontMetadata[];
  startIndex: number;
  endIndex: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  textAlign: 'left' | 'center' | 'right';
  previewText: string;
  filteredFontsSelected: FontMetadata[];
  handleFontSelection: (font: FontMetadata) => void;
  handleToggleModal: (open: boolean, font: FontMetadata) => void;
}

const FontGrid: React.FC<FontGridProps> = ({
  listMode,
  currentFonts,
  startIndex,
  endIndex,
  fontSize,
  lineHeight,
  letterSpacing,
  textAlign,
  previewText,
  filteredFontsSelected,
  handleFontSelection,
  handleToggleModal,
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full",
        { "!grid-cols-1": listMode === "list" }
      )}
    >
      {currentFonts.slice(startIndex, endIndex).map((font, index) => (
        <div
          className="relative group rounded flex flex-col gap-2 bg-background hover:bg-secondary border border-input text-primary overflow-hidden px-8 py-10"
          key={index}
        >
          <div className="absolute top-4 right-4">
            <Checkbox
              onCheckedChange={() => handleFontSelection(font)}
              checked={filteredFontsSelected.includes(font)}
            />
          </div>

          <div className="text-base text-primary/60 w-full uppercase">
            {font.style}
          </div>

          <div
            onClick={() => handleToggleModal(true, font)}
            className={cn(
              "cursor-pointer w-full text-4xl text-primary leading-none py-6 whitespace-pre-wrap",
              { "min-h-80": listMode === "grid" }
            )}
            style={{
              fontFamily: font.family,
              fontSize: `${fontSize}px`,
              lineHeight: lineHeight,
              letterSpacing: `${letterSpacing}rem`,
              textAlign: textAlign,
            }}
          >
            {previewText}
          </div>

          <div
            onClick={() => handleToggleModal(true, font)}
            className="cursor-pointer text-base text-primary w-full"
          >
            {font.family}
          </div>

          <div
            onClick={() => handleToggleModal(true, font)}
            className="cursor-pointer text-base text-primary/60 w-full"
          >
            {font.fullName}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FontGrid;
