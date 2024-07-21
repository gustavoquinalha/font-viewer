"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Modal from "./ui/modal";
import { LoaderCircle } from "lucide-react";
import FontGrid from "./FontGrid";
import Pagination from "./Pagination";
import FontSettingsPanel from "./FontSettingsPanel";
import Header from "./Header";

const FontList: React.FC = () => {
  let currentFonts: any[] = [];
  const [loading, setLoading] = useState<boolean>(true);
  const [imutableFonts, setImutableFonts] = useState<FontMetadata[]>([]);
  const [filteredFonts, setFilteredFonts] = useState<FontMetadata[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [previewText, setPreviewText] = useState<string>(
    "Whereas disregard and contempt for human rights have resulted"
  );
  const [fontSize, setFontSize] = useState<number[]>([40]);
  const [lineHeight, setLineHeight] = useState<number[]>([1.3]);
  const [letterSpacing, setLetterSpacing] = useState<number[]>([0]);
  const [selectedFontStyle, setSelectedFontStyle] = useState<string>("All");
  const [filteredFontsSelected, setFilteredFontsSelected] = useState<
    FontMetadata[]
  >([]);
  const itemsPerPage = 6;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<FontMetadata | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all-fonts");
  const [switchChecked, setSwitchChecked] = useState<string>("grid");
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "left"
  );

  const fetchFonts = async () => {
    setLoading(true);
    setError("");
    try {
      if (window.queryLocalFonts) {
        const fontAccess: FontMetadata[] = await window.queryLocalFonts();
        setImutableFonts(fontAccess);
        setLoading(false);
      } else {
        setError("Font access not supported or permission denied");
        setLoading(false);
      }
    } catch (err) {
      setError("Error accessing fonts");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFonts();
  }, []);

  useEffect(() => {
    const filtered = imutableFonts.filter((font) => {
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
  }, [searchTerm, sortOrder, selectedFontStyle, imutableFonts]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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

  const handleLetterSpacingChange = (event: number[]) => {
    setLetterSpacing(event);
  };

  const handleSwitchCheckedChange = (event: string) => {
    setSwitchChecked(event);
  };

  const handleTextAlignChange = (event: any) => {
    setTextAlign(event);
  };

  const handleSelectedFontStyleChange = (value: string) => {
    setSelectedFontStyle(value);
  };

  const handleToggleSortOrder = (value: "asc" | "desc") => {
    setSortOrder(value);
  };

  const handleToggleModal = (value: any, data: any) => {
    setIsModalOpen(value);
    setModalData(data);
  };

  const handleToggleActiveTab = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  const handleFontSelection = (font: FontMetadata) => {
    setFilteredFontsSelected((prevSelected) => {
      if (prevSelected.includes(font)) {
        const result = prevSelected.filter(
          (selectedFont) => selectedFont !== font
        );
        return result;
      } else {
        const result = [...prevSelected, font];
        return result;
      }
    });
  };

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
    const current =
      activeTab === "all-fonts" ? filteredFonts : filteredFontsSelected;
    return Math.ceil(current.length / itemsPerPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pageOptions = Array.from(
    { length: totalPages() },
    (_, index) => index + 1
  );

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

  currentFonts =
    activeTab === "all-fonts" ? filteredFonts : filteredFontsSelected;

  return (
    <div className="w-full mx-auto">
      <Header
        loading={loading}
        error={error}
        activeTab={activeTab}
        handleToggleActiveTab={handleToggleActiveTab}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleSelectedFontStyleChange={handleSelectedFontStyleChange}
        fontStyleOptions={fontStyleOptions}
        selectedFontStyle={selectedFontStyle}
        handleToggleSortOrder={handleToggleSortOrder}
        sortOrder={sortOrder}
        filteredFonts={filteredFonts}
        filteredFontsSelected={filteredFontsSelected}
      />

      {error ? (
        <div className="text-center flex items-center justify-center flex-col gap-4 text-base p-8 text-primary">
          <p className="text-base">{error}</p>
          <div className="">
            <Button onClick={fetchFonts}>Load fonts</Button>
          </div>
        </div>
      ) : (
        <div className="w-full">
          {loading ? (
            <div className="p-8 md:h-[calc(100vh-56px)] flex flex-col items-center justify-center text-center">
              <LoaderCircle className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="w-full flex flex-col md:flex-row">
              <FontSettingsPanel
                previewText={previewText}
                handlePreviewTextChange={handlePreviewTextChange}
                fontSize={fontSize[0]}
                handleFontSizeChange={handleFontSizeChange}
                lineHeight={lineHeight[0]}
                handleLineHeightChange={handleLineHeightChange}
                letterSpacing={letterSpacing[0]}
                handleLetterSpacingChange={handleLetterSpacingChange}
                listMode={switchChecked}
                handleListModeChange={handleSwitchCheckedChange}
                textAlign={textAlign}
                handleTextAlignChange={handleTextAlignChange}
              />

              {currentFonts.length ? (
                <div className="flex flex-col w-full gap-4 p-4">
                  <FontGrid
                    listMode={switchChecked}
                    currentFonts={currentFonts}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    fontSize={fontSize[0]}
                    lineHeight={lineHeight[0]}
                    letterSpacing={letterSpacing[0]}
                    previewText={previewText}
                    filteredFontsSelected={filteredFontsSelected}
                    handleFontSelection={handleFontSelection}
                    handleToggleModal={handleToggleModal}
                    textAlign={textAlign}
                  />

                  <Pagination
                    prevPage={prevPage}
                    nextPage={nextPage}
                    currentPage={currentPage}
                    pageOptions={pageOptions}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                </div>
              ) : (
                <div className="w-full text-center p-8 text-primary">
                  No fonts found :(
                </div>
              )}
            </div>
          )}
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
