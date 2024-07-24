import React from "react";
import { cn } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";

interface FontGridProps {
  listMode: string;
  currentFonts: GroupedFont[];
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
        "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full",
        { "!grid-cols-1": listMode === "list" }
      )}
    >
      {currentFonts.slice(startIndex, endIndex).map((font, index) => (
        <div className="relative group" key={index}>
          {font.fonts.length > 1 ? (
            <div className="w-full">
              {font.fonts.slice(0, 6).map((_fontName, index) => (
                <div
                  key={index}
                  style={{ bottom: -index * 2, left: -index * 2, zIndex: -index - 1 }}
                  className={cn(
                    "h-full absolute transition-all rounded bg-primary-foreground border border-input w-full",
                    {
                      "border-foreground":
                        filteredFontsSelected.includes(font) &&
                        activeTab === "all-fonts",
                    }
                  )}
                ></div>
              ))}
            </div>
          ) : (
            ""
          )}
          <div
            className={cn(
              "relative h-full transition-all rounded flex flex-col gap-1 bg-primary-foreground group-hover:bg-secondary border border-input text-primary overflow-hidden px-8 py-10 z-50",
              {
                "border-foreground":
                  filteredFontsSelected.includes(font) &&
                  activeTab === "all-fonts",
              }
            )}
          >
            {/* <div className="absolute inset-0 -z-10 flex justify-center items-center text-center">
              <RandomShape fill={"current"} className=" fill-primary/10" />
            </div> */}

            <div className="w-full flex items-center justify-between">
              <div className="flex items-center justify-center gap-4">
                <div className="flex">
                  <Checkbox
                    onCheckedChange={() => handleFontSelection(font)}
                    checked={filteredFontsSelected.includes(font)}
                  />
                </div>

                <div className="text-base text-primary w-full">
                  {font.family}
                </div>
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
                "w-full h-full text-4xl text-primary leading-none py-6 whitespace-pre-wrap flex items-center",
                { "min-h-80": listMode === "grid" },
                { "text-center justify-center": textAlign === "center" },
                { "text-left justify-start": textAlign === "left" },
                { "text-right justify-end": textAlign === "right" }
              )}
              style={{
                fontFamily: `"${font.family}"`,
                fontSize: `${fontSize}px`,
                lineHeight: lineHeight,
                letterSpacing: `${letterSpacing}rem`,
                textAlign: textAlign,
              }}
            >
              {previewText}
            </div>

            <span className="text-base flex flex-wrap gap-1">
              {font.fonts.map((item, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs group-hover:bg-muted-foreground/10"
                >
                  {item.style}
                </Badge>
              ))}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FontGrid;
