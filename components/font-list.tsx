"use client";

import { ModeToggle } from "@/components/mode-toggle";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface FontMetadata {
  family: string;
  fullName?: string;
  postScriptName?: string;
  style?: string;
  weight?: number;
  stretch?: string;
  unicodeRanges?: string[];
  variantAxes?: string[];
  version?: string;
}

const FontList: React.FC = () => {
  const [fonts, setFonts] = useState<FontMetadata[]>([]);
  const [filteredFonts, setFilteredFonts] = useState<FontMetadata[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [previewText, setPreviewText] = useState<string>(
    "Whereas disregard and contempt for human rights have resulted"
  );
  const [fontSize, setFontSize] = useState<number[]>([40]); // Default font size
  const [lineHeight, setLineHeight] = useState<number[]>([1.3]); // Default line height
  const [letterSpacing, setLetterSpacing] = useState<number[]>([0]); // Default line height
  const [selectedFontStyle, setSelectedFontStyle] = useState<string>(""); // State for selected font style filter
  const itemsPerPage = 15;

  const fetchFonts = async () => {
    setError("");
    try {
      if (window.queryLocalFonts) {
        const fontAccess: FontMetadata[] = await window.queryLocalFonts();
        setFonts(fontAccess);
      } else {
        setError("Font access not supported or permission denied");
      }
    } catch (err) {
      setError("Error accessing fonts");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFonts();
  }, []);

  useEffect(() => {
    // Filtra e ordena as fontes com base no searchTerm, sortOrder e selectedFontStyle
    const filtered = fonts.filter(
      (font) =>
        font.family.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedFontStyle === "" ||
          font.style?.toLowerCase() === selectedFontStyle.toLowerCase())
    );

    const sortedFonts = [...filtered].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.family.localeCompare(b.family);
      } else {
        return b.family.localeCompare(a.family);
      }
    });

    setFilteredFonts(sortedFonts);
  }, [searchTerm, sortOrder, selectedFontStyle, fonts]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePreviewTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPreviewText(event.target.value);
  };

  const handleFontSizeChange = (event: number[]) => {
    setFontSize(event);
  };

  const handleLineHeightChange = (event: number[]) => {
    setLineHeight(event);
  };

  const handleLetterSpacing = (event: number[]) => {
    setLetterSpacing(event);
  };

  const handleSelectedFontStyleChange = (value: string) => {
    setSelectedFontStyle(value === "All" ? "" : value);
  };

  // Funções para controle de paginação
  const nextPage = () => {
    if (currentPage < totalPages()) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = () => {
    return Math.ceil(filteredFonts.length / itemsPerPage);
  };

  // Calcula os índices de início e fim para a página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Opções para o select de páginas
  const pageOptions = Array.from(
    { length: totalPages() },
    (_, index) => index + 1
  );

  // Opções para o select de estilos de fonte
  const fontStyleOptions = [
    "All",
    "Thin",
    "Normal",
    "Medium",
    "Bold",
    "Semi-Bold",
    "SemiBold",
    "Italic",
    "Black",
    "Extra-Black",
    "ExtraBlack",
  ];

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center py-2 px-4 w-full mx-auto sticky top-0 left-0 bg-background/90 border-b border-border backdrop-blur-sm z-50">
        <div className="flex items-center gap-2">
          <div className="text-primary font-bold whitespace-nowrap text-sm md:text-base">
            Font Viewer
          </div>
          <ModeToggle />
        </div>

        <div className="flex flex-col md:flex-row gap-2 w-full items-center justify-center">
          <div className="flex gap-2 w-full max-w-full md:max-w-80">
            <Input
              type="text"
              placeholder="Search fonts..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <Select onValueChange={handleSelectedFontStyleChange}>
            <SelectTrigger className="w-full max-w-full md:max-w-60">
              <SelectValue placeholder="Select Font Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Font Style</SelectLabel>
                {fontStyleOptions.map((option, index) => (
                  <SelectItem key={index} value={option.toLowerCase()}>
                    {option === "" ? "All" : option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Tabs defaultValue="AZ" className="">
            <TabsList onClick={toggleSortOrder}>
              <TabsTrigger value="AZ">A-Z</TabsTrigger>
              <TabsTrigger value="ZA">Z-A</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Badge variant="outline" className="whitespace-nowrap">
          {filteredFonts.length} fonts
        </Badge>
      </div>

      {error ? (
        <div className="text-center flex items-center justify-center flex-col gap-2 text-sm p-8 text-primary">
          <p>{error}</p>
          <div className="">
            <Button id="load-fonts" onClick={fetchFonts}>
              Load fonts
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col md:flex-row">
          <div className="md:max-w-80 w-max-w-80 p-4 md:sticky top-16 left-0 overflow-hidden z-10 h-fit">
            <div className="w-full rounded flex flex-col gap-8 items-center justify-center mx-auto">
              <div className="flex w-full flex-col gap-2">
                <h1 className="text-xl text-primary font-bold">
                  Explore your installed fonts with ease.
                </h1>
                <h2 className="text-sm text-muted-foreground font-normal">
                  Discover and visualize a variety of styles directly in your
                  browser.
                </h2>
              </div>

              <div className="flex flex-col items-center gap-2 w-full">
                <label className="text-xs text-primary flex items-center justify-between gap-2 w-full">
                  <span className="font-bold text-primary">
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

              <div className="flex flex-col items-center gap-2 w-full">
                <label className="text-xs text-primary flex items-center justify-between gap-2 w-full">
                  <span className="font-bold text-primary">Font size</span>
                  <span className="text-muted-foreground">{fontSize}px</span>
                </label>
                <Slider
                  defaultValue={fontSize}
                  onValueChange={handleFontSizeChange}
                  min={10}
                  max={120}
                  step={1}
                />
              </div>

              <div className="flex flex-col items-center gap-2 w-full">
                <label className="text-xs text-primary flex items-center justify-between gap-2 w-full">
                  <span className="font-bold text-primary">Line height</span>
                  <span className="text-muted-foreground">{lineHeight}</span>
                </label>
                <Slider
                  defaultValue={lineHeight}
                  onValueChange={handleLineHeightChange}
                  min={0}
                  max={3}
                  step={0.1}
                />
              </div>

              <div className="flex flex-col items-center gap-2 w-full">
                <label className="text-xs text-primary flex items-center justify-between gap-2 w-full">
                  <span className="font-bold text-primary">Letter spacing</span>
                  <span className="text-muted-foreground">{letterSpacing}</span>
                </label>
                <Slider
                  defaultValue={letterSpacing}
                  onValueChange={handleLetterSpacing}
                  min={-1}
                  max={1}
                  step={0.1}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col p-4 w-full gap-8 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4  w-full">
              {filteredFonts.slice(startIndex, endIndex).map((font, index) => (
                <div
                  className="group rounded flex flex-col gap-2 bg-background border border-input text-primary overflow-hidden px-8 py-10"
                  key={index}
                >
                  <div className="text-xs text-primary/60 w-full text-center uppercase">
                    {font.style}
                  </div>

                  <div
                    className="w-full text-4xl text-primary leading-none py-6 h-full flex justify-center items-center text-center whitespace-pre-wrap"
                    style={{
                      fontFamily: font.family,
                      fontSize: `${fontSize}px`,
                      lineHeight: `${lineHeight}`,
                      letterSpacing: `${letterSpacing}rem`,
                    }}
                  >
                    {previewText}
                  </div>

                  <div className="text-base text-primary/80 w-full text-center">
                    {font.family}
                  </div>

                  <div className="text-xs text-primary/60 w-full text-center">
                    {font.fullName}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-1 justify-center items-center">
              <button
                className="h-8 cursor-pointer px-4 py-1 text-xs text-primary bg-background hover:bg-background border border-border rounded whitespace-nowrap"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <select
                className="h-8 cursor-pointer px-2 py-1 text-xs text-primary bg-background hover:bg-background border border-border rounded whitespace-nowrap"
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
              >
                {pageOptions.map((page) => (
                  <option key={page} value={page}>
                    Page {page}
                  </option>
                ))}
              </select>

              <button
                className="h-8 cursor-pointer px-4 py-1 text-xs text-primary bg-background hover:bg-background border border-border rounded whitespace-nowrap"
                onClick={nextPage}
                disabled={currentPage === totalPages()}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FontList;
