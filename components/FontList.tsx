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
  const [imutableFonts, setImutableFonts] = useState<GroupedFont[]>([]);
  const [filteredFonts, setFilteredFonts] = useState<GroupedFont[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [previewText, setPreviewText] = useState<string>(
    "Whereas disregard and contempt for human rights have resulted."
  );
  const [fontSize, setFontSize] = useState<number[]>([40]);
  const [lineHeight, setLineHeight] = useState<number[]>([1.3]);
  const [letterSpacing, setLetterSpacing] = useState<number[]>([0]);
  const [selectedFontStyle, setSelectedFontStyle] = useState<string>("All");
  const [filteredFontsSelected, setFilteredFontsSelected] = useState<
    FontMetadata[]
  >([]);
  const itemsPerPage = 12;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<GroupedFont>();
  const [activeTab, setActiveTab] = useState<string>("all-fonts");
  const [switchChecked, setSwitchChecked] = useState<string>("grid");
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "center"
  );
  const [fontStyleOptions, setFontStyleOptions] = useState<string[]>([]);

  const groupFontsByFamily = (fonts: FontMetadata[]): GroupedFont[] => {
    return fonts.reduce((acc: GroupedFont[], font) => {
      const existingGroup = acc.find((group) => group.family === font.family);

      if (existingGroup) {
        existingGroup.fonts.push({
          postScriptName: font.postScriptName,
          fullName: font.fullName,
          style: font.style,
        });
      } else {
        acc.push({
          family: font.family,
          fonts: [
            {
              postScriptName: font.postScriptName,
              fullName: font.fullName,
              style: font.style,
            },
          ],
        });
      }

      return acc;
    }, []);
  };

  const fetchFonts = async () => {
    setLoading(true);
    setError("");
    try {
      if (window.queryLocalFonts) {
        const fontAccess: FontMetadata[] = await window.queryLocalFonts();
        const groupedFonts = groupFontsByFamily(fontAccess);
        setImutableFonts(groupedFonts);
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
    const filtered = imutableFonts
      .map((group) => {
        const filteredFontsInGroup = group.fonts.filter((font) => {
          const matchesSearchTerm = font.fullName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());

          const matchesFontStyle =
            selectedFontStyle === "All" ||
            font.style?.toLowerCase() === selectedFontStyle.toLowerCase();

          return matchesSearchTerm && matchesFontStyle;
        });

        return {
          family: group.family,
          fonts: filteredFontsInGroup,
        };
      })
      .filter((group) => group.fonts.length > 0);

    const sortedFonts = [...filtered].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.family.localeCompare(b.family);
      } else {
        return b.family.localeCompare(a.family);
      }
    });

    setFilteredFonts(sortedFonts);
  }, [searchTerm, sortOrder, selectedFontStyle, imutableFonts]);

  useEffect(() => {
    const styles = imutableFonts.flatMap((group) =>
      group.fonts
        .map((font) => font.style)
        .filter((style) => style !== undefined)
    );
    const uniqueStyles = Array.from(new Set(styles));
    setFontStyleOptions(uniqueStyles);
  }, [imutableFonts]);

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

  const handleToggleModal = (event: any, value: any, data: any) => {
    event.preventDefault();
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
          <p className="text-base text-muted-foreground">{error}</p>
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
                modalMode={false}
              />

              {currentFonts.length ? (
                <div className="flex flex-col w-full gap-5 p-5 pb-10">
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
                    activeTab={activeTab}
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
                <div className="w-full text-center p-8 text-muted-foreground">
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
      ></Modal>
    </div>
  );
};

export default FontList;
