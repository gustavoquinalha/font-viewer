import React from "react";
import { Textarea } from "./ui/textarea";
import { Slider } from "./ui/slider";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Grid2X2,
  Rows3,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
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

interface FontSettingsPanelProps {
  previewText: string;
  handlePreviewTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  fontSize: number;
  handleFontSizeChange: (value: number[]) => void;
  lineHeight: number;
  handleLineHeightChange: (value: number[]) => void;
  letterSpacing: number;
  handleLetterSpacingChange: (value: number[]) => void;
  listMode: string;
  handleListModeChange: (checked: string) => void;
  textAlign: string;
  handleTextAlignChange: (checked: string) => void;
  modalMode: boolean;
  styles?: string[];
  handleSelectedFontStyleChange: (value: string) => void;
  selectedFontStyle: string | null;
}

const FontSettingsPanel: React.FC<FontSettingsPanelProps> = ({
  previewText,
  handlePreviewTextChange,
  fontSize,
  handleFontSizeChange,
  lineHeight,
  handleLineHeightChange,
  letterSpacing,
  handleLetterSpacingChange,
  listMode,
  handleListModeChange,
  textAlign,
  handleTextAlignChange,
  modalMode,
  styles,
  handleSelectedFontStyleChange,
  selectedFontStyle,
}) => {
  return (
    <div
      className={cn(
        "w-full",
        {
          "md:max-w-72 !w-72 p-5 pb-8 md:sticky top-14 left-0 overflow-hidden z-10 h-auto md:h-[calc(100vh-56px)] overflow-y-auto":
            !modalMode,
        },
        { "border-t px-4 py-5 bg-primary-foreground": modalMode }
      )}
    >
      <div
        className={cn(
          "w-full rounded flex gap-8 items-center justify-center mx-auto",
          {
            "flex-col": !modalMode,
          }
        )}
      >
        {/* {!modalMode ? (
          
        ) : ()} */}
        {!modalMode ? (
          <div className="flex w-full flex-col gap-2">
            <h1 className="text-lg text-primary font-medium">
              Explore your installed fonts with ease.
            </h1>
            <h2 className="text-base text-muted-foreground font-sans font-normal">
              Discover and visualize a variety of styles directly in your
              browser.
            </h2>
          </div>
        ) : (
          ""
        )}

        {!modalMode ? (
          <div className="flex flex-col gap-2 w-full">
            <label className="text-base text-primary flex items-center justify-between gap-2 w-full">
              <span className="font-medium text-primary font-sans">
                List type
              </span>
            </label>
            <Tabs
              value={listMode}
              onValueChange={(value) => handleListModeChange(value)}
              defaultValue="grid"
              className="w-full"
            >
              <TabsList className="w-full">
                <TabsTrigger value="grid" className="w-full">
                  <Grid2X2 className="w-5 h-5" />
                </TabsTrigger>
                <TabsTrigger value="list" className="w-full">
                  <Rows3 className="w-5 h-5" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        ) : (
          ""
        )}

        <div className="flex flex-col gap-2 w-full">
          {!modalMode ? (
            <label className="text-base text-primary flex items-center justify-between gap-2 w-full">
              <span className="font-medium text-primary font-sans">
                Text align
              </span>
            </label>
          ) : (
            ""
          )}

          <Tabs
            value={textAlign}
            onValueChange={(value) => handleTextAlignChange(value)}
            defaultValue="left"
            className="w-full"
          >
            <TabsList className="w-full">
              <TabsTrigger value="left" className="w-full">
                <AlignLeft className="w-5 h-5" />
              </TabsTrigger>
              <TabsTrigger value="center" className="w-full">
                <AlignCenter className="w-5 h-5" />
              </TabsTrigger>
              <TabsTrigger value="right" className="w-full">
                <AlignRight className="w-5 h-5" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {!modalMode ? (
          <div className="flex flex-col items-center gap-2 w-full">
            <label className="text-base text-primary flex items-center justify-between gap-2 w-full">
              <span className="font-medium text-primary font-sans">
                Type your text to preview
              </span>
            </label>
            <Textarea
              id="textTest"
              rows={4}
              placeholder="Hello World"
              value={previewText}
              onChange={handlePreviewTextChange}
            />
          </div>
        ) : (
          ""
        )}

        {modalMode ? (
          <div className="flex flex-col items-center gap-2 w-full relative">
            <Select onValueChange={handleSelectedFontStyleChange}>
              <SelectTrigger className="w-full max-w-full font-sans">
                <SelectValue
                  className="w-full"
                  placeholder={`${selectedFontStyle || "Select font style"}`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Style</SelectLabel>
                  <SelectItem value="All">All</SelectItem>
                  {styles?.map((style, index) => (
                    <SelectItem key={index} value={style.toLowerCase()}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        ) : (
          ""
        )}

        <div className="flex flex-col items-center gap-2 w-full">
          <label className="text-base text-primary flex items-center justify-between gap-2 w-full">
            <span className="font-medium text-primary font-sans">
              Font size
            </span>
            <span className="text-muted-foreground font-sans">
              {fontSize}px
            </span>
          </label>
          <Slider
            defaultValue={[fontSize]}
            onValueChange={handleFontSizeChange}
            min={10}
            max={120}
            step={1}
          />
        </div>

        <div className="flex flex-col items-center gap-2 w-full">
          <label className="text-base text-primary flex items-center justify-between gap-2 w-full">
            <span className="font-medium text-primary font-sans">
              Line height
            </span>
            <span className="text-muted-foreground font-sans">
              {lineHeight}
            </span>
          </label>
          <Slider
            defaultValue={[lineHeight]}
            onValueChange={handleLineHeightChange}
            min={0}
            max={3}
            step={0.1}
          />
        </div>

        <div className="flex flex-col items-center gap-2 w-full">
          <label className="text-base text-primary flex items-center justify-between gap-2 w-full">
            <span className="font-medium text-primary font-sans">
              Letter spacing
            </span>
            <span className="text-muted-foreground font-sans">
              {letterSpacing}
            </span>
          </label>
          <Slider
            defaultValue={[letterSpacing]}
            onValueChange={handleLetterSpacingChange}
            min={-1}
            max={1}
            step={0.1}
          />
        </div>

        {!modalMode ? (
          <div className="">
            <span className="text-muted-foreground font-sans">
              This is an open source project,{" "}
              <a
                className="hover:underline hover:text-primary"
                href="https://github.com/gustavoquinalha/font-preview"
                target="blank"
              >
                click here to contribute
              </a>
              .
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FontSettingsPanel;
