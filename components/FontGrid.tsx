import React from "react";
import { cn } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";

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
  textAlign: "left" | "center" | "right";
  previewText: string;
  filteredFontsSelected: FontMetadata[];
  handleFontSelection: (font: FontMetadata) => void;
  handleToggleModal: (event: any, open: boolean, font: FontMetadata) => void;
  activeTab: string;
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
  activeTab,
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
          className={cn(
            "relative group rounded flex flex-col gap-1 bg-secondary/30 hover:bg-secondary dark:hover:bg-secondary/80 border border-input text-primary overflow-hidden px-8 py-10",
            {
              "border-foreground":
                filteredFontsSelected.includes(font) &&
                activeTab === "all-fonts",
            }
          )}
          key={index}
        >
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex">
                <Checkbox
                  onCheckedChange={() => handleFontSelection(font)}
                  checked={filteredFontsSelected.includes(font)}
                />
              </div>
              <span className="text-base">
                <Badge variant="secondary">{font.style}</Badge>
              </span>
            </div>
            <span>
              <EyeIcon
                className="h-6 w-6 cursor-pointer opacity-50 hover:opacity-100"
                onClick={() => handleToggleModal(event, true, font)}
              />
            </span>
          </div>

          <div
            className={cn(
              "w-full text-4xl text-primary leading-none py-6 whitespace-pre-wrap flex items-center",
              { "min-h-80": listMode === "grid" },
              { "text-center justify-center": textAlign === "center" },
              { "text-left justify-start": textAlign === "left" },
              { "text-right justify-end": textAlign === "right" }
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

          <div className="text-base text-primary w-full">{font.family}</div>

          <div className=" text-base text-primary/60 w-full">
            {font.fullName}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FontGrid;
