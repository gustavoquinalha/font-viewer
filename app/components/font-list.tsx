"use client";

import React, { useEffect, useState } from "react";

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
  const [fontSize, setFontSize] = useState<number>(32); // Default font size
  const [lineHeight, setLineHeight] = useState<number>(1.5); // Default line height
  const [selectedFontStyle, setSelectedFontStyle] = useState<string>(""); // State for selected font style filter
  const itemsPerPage = 21;

  useEffect(() => {
    async function fetchFonts() {
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
    }

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

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(event.target.value));
  };

  const handleLineHeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLineHeight(Number(event.target.value));
  };

  const handleSelectedFontStyleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedFontStyle(event.target.value);
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
    "thin",
    "normal",
    "medium",
    "bold",
    "semi-bold",
    "italic",
    "black",
    "extra-black",
  ];

  return (
    <div className="w-full mx-auto">
      <div className="flex gap-4 justify-between items-center h-18 py-2 px-4 w-full mx-auto sticky top-0 left-0 bg-zinc-950/90 border-b border-zinc-800 backdrop-blur z-50">
        <div className="flex items-center gap-2">
          <div className="text-white font-bold whitespace-nowrap text-sm md:text-base">
            Font Viewer
          </div>
          <div className="flex flex-wrap items-center justify-center text-center gap-1 border border-zinc-800 bg-zinc-900/50 px-2 py-1 rounded">
            <span className="text-xs text-white">{filteredFonts.length}</span>
            <span className="text-xs text-zinc-400">Fonts found</span>
          </div>
        </div>

        <div className="flex gap-2 w-full max-w-lg">
          <input
            type="text"
            className="w-full h-8 cursor-pointer px-4 py-1 text-xs text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded"
            placeholder="Search fonts..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            className="h-8 cursor-pointer px-4 py-1 text-xs text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded whitespace-nowrap"
            onClick={toggleSortOrder}
          >
            {sortOrder === "asc" ? "A - Z" : "Z - A"}
          </button>
        </div>

        <div className="flex gap-1 justify-center items-center">
          <button
            className="h-8 cursor-pointer px-4 py-1 text-xs text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded whitespace-nowrap"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <select
            className="h-8 cursor-pointer px-4 py-1 text-xs text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded whitespace-nowrap"
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
            className="h-8 cursor-pointer px-4 py-1 text-xs text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded whitespace-nowrap"
            onClick={nextPage}
            disabled={currentPage === totalPages()}
          >
            Next
          </button>
        </div>
      </div>

      {error ? (
        <div className="text-center p-4">
          <p>{error}</p>
        </div>
      ) : (
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:max-w-80 min-w-80 p-8 lg:sticky top-10 left-0 overflow-hidden z-10 h-fit">
            <div className="w-full rounded flex flex-col gap-2 items-center justify-center text-center">
              <h1 className="text-4xl text-white font-bold">
                Explore your installed fonts with ease.
              </h1>
              <h2 className="text-xl text-zinc-500 font-normal">
                Discover and visualize a variety of styles directly in your
                browser.
              </h2>
              <div className="w-full rounded flex flex-col gap-2 items-center justify-center text-center mx-auto mt-8">
                <h3 className="text-sm text-zinc-200 font-normal">
                  Type your text to preview
                </h3>

                <div className="flex gap-2 items-center w-full">
                  <textarea
                    id="textTest"
                    rows={4}
                    className="resize-none text-center w-full cursor-pointer px-4 py-1 text-xs text-white bg-zinc-950 border border-zinc-800 rounded whitespace-nowrap"
                    value={previewText}
                    onChange={handlePreviewTextChange}
                  />
                </div>

                <div className="flex flex-col items-center gap-2 w-full">
                  <label className="text-xs text-white">
                    Font Size: {fontSize}px
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    className="cursor-pointer w-full"
                  />
                </div>

                <div className="flex flex-col items-center gap-2 w-full">
                  <label className="text-xs text-white">
                    Line Height: {lineHeight}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={lineHeight}
                    onChange={handleLineHeightChange}
                    className="cursor-pointer w-full"
                  />
                </div>

                <div className="w-full">
                  <select
                    className="w-full h-8 cursor-pointer px-4 py-1 text-xs text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded"
                    value={selectedFontStyle}
                    onChange={handleSelectedFontStyleChange}
                  >
                    <option value="">Select Style</option>
                    {fontStyleOptions.map((option, index) => (
                      <option key={index} value={option.toLowerCase()}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full">
            {filteredFonts.slice(startIndex, endIndex).map((font, index) => (
              <div
                className="group border text-white border-zinc-800 rounded flex flex-col gap-2 bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-700 overflow-hidden"
                key={index}
              >
                <div className="flex flex-col items-center justify-between px-4 py-10">
                  <div
                    className="text-4xl text-white leading-none py-6 min-h-32 flex justify-center items-center text-center whitespace-pre-wrap"
                    style={{
                      fontFamily: font.family,
                      fontSize: `${fontSize}px`,
                      lineHeight: `${lineHeight}`,
                    }}
                  >
                    {previewText}
                  </div>
                  <div className="text-base text-zinc-400">{font.family}</div>
                </div>

                <div className="bg-zinc-900 group-hover:bg-zinc-800 px-4 py-6 border-t h-full border-zinc-800 group-hover:border-zinc-700 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-zinc-500">Font fullName</div>
                    <div className="text-xs text-zinc-200">{font.fullName}</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-zinc-500">Font style</div>
                    <div className="text-xs text-zinc-200">{font.style}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FontList;
