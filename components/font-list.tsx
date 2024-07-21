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
import { Checkbox } from "./ui/checkbox";
import Modal from "./ui/modal";

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
  const [selectedFontStyle, setSelectedFontStyle] = useState<string>("All"); // State for selected font style filter
  const [filteredFontsSelected, setFilteredFontsSelected] = useState<
    FontMetadata[]
  >([]);
  const itemsPerPage = 15;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<FontMetadata | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all-fonts");

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
    const filtered = fonts.filter((font) => {
      const matchesSearchTerm = font.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesFontStyle =
        selectedFontStyle === "All" ||
        font.style?.toLowerCase() === selectedFontStyle.toLowerCase();

      return matchesSearchTerm && matchesFontStyle;
    });

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

  // const toggleSortOrder = () => {
  //   setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  // };

  const toggleSortOrder = (value: "asc" | "desc") => {
    setSortOrder(value);
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
    console.log("handleSelectedFontStyleChange", value);
    setSelectedFontStyle(value);
  };

  const handleToggleSortOrder = (value: "asc" | "desc") => {
    setSortOrder(value);
  };

  const handleToggleModal = (value: any, data: any) => {
    console.log("data", data);

    setIsModalOpen(value);
    setModalData(data);
  };

  const handleFontSelection = (font: FontMetadata) => {
    setFilteredFontsSelected((prevSelected) => {
      if (prevSelected.includes(font)) {
        const result = prevSelected.filter(
          (selectedFont) => selectedFont !== font
        );

        console.log("result 1", result);

        return result;
      } else {
        const result = [...prevSelected, font];

        console.log("result 2", result);

        return result;
      }
    });
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
      <div className="h-auto md:h-14 flex flex-col md:flex-row gap-4 justify-between items-center py-2 px-4 w-full mx-auto sticky top-0 left-0 bg-background/90 border-b border-border backdrop-blur-sm z-50">
        <div className="flex items-center gap-2">
          <div className="text-primary font-medium whitespace-nowrap text-sm md:text-base">
            Font Viewer
          </div>
          <ModeToggle />
        </div>

        <div className="flex flex-col md:flex-row gap-2 w-full items-center justify-center">
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
                <SelectItem value="All">All</SelectItem>{" "}
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
                <SelectItem value={"asc"}>A-z</SelectItem>
                <SelectItem value={"desc"}>Z-a</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            defaultValue="all-fonts"
          >
            <TabsList>
              <TabsTrigger value="all-fonts">
                All fonts ({filteredFonts.length})
              </TabsTrigger>
              <TabsTrigger value="selected-fonts">Seleted fonts</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {error ? (
        <div className="text-center flex items-center justify-center flex-col gap-2 text-sm p-8 text-primary">
          <p>{error}</p>
          <div className="">
            <Button onClick={fetchFonts}>Load fonts</Button>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col md:flex-row">
          <div className="md:max-w-72 w-max-w-72 p-4 pb-8 md:sticky top-14 left-0 overflow-hidden z-10 h-auto md:h-[calc(100vh-56px)] overflow-y-auto">
            <div className="w-full rounded flex flex-col gap-8 items-center justify-center mx-auto">
              <div className="flex w-full flex-col gap-2">
                <h1 className="text-lg text-primary font-medium">
                  Explore your installed fonts with ease.
                </h1>
                <h2 className="text-sm text-muted-foreground font-normal">
                  Discover and visualize a variety of styles directly in your
                  browser.
                </h2>
              </div>

              <div className="flex flex-col items-center gap-2 w-full">
                <label className="text-xs text-primary flex items-center justify-between gap-2 w-full">
                  <span className="font-medium text-primary">
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
                  <span className="font-medium text-primary">Font size</span>
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
                  <span className="font-medium text-primary">Line height</span>
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
                  <span className="font-medium text-primary">
                    Letter spacing
                  </span>
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

          {/* filteredFontsSelected */}

          <div className="flex flex-col w-full gap-4 p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
              {filteredFonts.slice(startIndex, endIndex).map((font, index) => (
                <div
                  className="relative group rounded flex flex-col gap-2 bg-background hover:bg-secondary border border-input text-primary overflow-hidden px-8 py-10"
                  key={index}
                >
                  <div className="text-xs text-primary/60 w-full text-center uppercase">
                    {font.style}
                  </div>

                  <div className="absolute top-2 right-2">
                    <Checkbox
                      onCheckedChange={() => handleFontSelection(font)}
                      checked={filteredFontsSelected.includes(font)}
                    />
                  </div>

                  <div
                    onClick={() => handleToggleModal(true, font)}
                    className="cursor-pointer w-full text-4xl text-primary leading-none py-6 h-full flex justify-center items-center text-center whitespace-pre-wrap"
                    style={{
                      fontFamily: font.family,
                      fontSize: `${fontSize}px`,
                      lineHeight: `${lineHeight}`,
                      letterSpacing: `${letterSpacing}rem`,
                    }}
                  >
                    {previewText}
                  </div>

                  <div
                    onClick={() => handleToggleModal(true, font)}
                    className="cursor-pointer text-base text-primary/80 w-full text-center"
                  >
                    {font.family}
                  </div>

                  <div
                    onClick={() => handleToggleModal(true, font)}
                    className="cursor-pointer text-xs text-primary/60 w-full text-center"
                  >
                    {font.fullName}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-1 justify-center items-center">
              <Button
                variant="outline"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <Select onValueChange={(value) => setCurrentPage(Number(value))}>
                <SelectTrigger className="w-full max-w-full md:max-w-40">
                  <SelectValue placeholder={`Page ${currentPage}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Page</SelectLabel>
                    {pageOptions.map((page, index) => (
                      <SelectItem key={index} value={String(page)}>
                        Page {page}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={nextPage}
                disabled={currentPage === totalPages()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
      >
        <div></div>
      </Modal>
    </div>
  );
};

export default FontList;
