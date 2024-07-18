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
  const [fontSize, setFontSize] = useState<number>(40); // Default font size
  const [lineHeight, setLineHeight] = useState<number>(1.3); // Default line height
  const [letterSpacing, setLetterSpacing] = useState<number>(0); // Default line height
  const [selectedFontStyle, setSelectedFontStyle] = useState<string>(""); // State for selected font style filter
  const itemsPerPage = 15;

  const fetchFonts = async () => {
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

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(event.target.value));
  };

  const handleLineHeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLineHeight(Number(event.target.value));
  };

  const handleLetterSpacing = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLetterSpacing(Number(event.target.value));
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
      <div className="flex gap-4 justify-between items-center h-16 py-2 px-4 w-full mx-auto sticky top-0 left-0 bg-zinc-950/90 border-b border-zinc-800 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2">
          <div className="text-white font-bold whitespace-nowrap text-sm md:text-base">
            Font Viewer
          </div>
        </div>

        <div className="flex gap-2 w-full items-center justify-center">
          <div className="flex gap-2 w-full max-w-80">
            <input
              type="text"
              className="w-full h-10 cursor-pointer px-4 py-1 text-xs text-white bg-zinc-950 border border-zinc-800 rounded"
              placeholder="Search fonts..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex flex-col items-center gap-2 w-full max-w-48 relative">
            <span className="absolute top-3 left-3 text-xs font-bold text-white">
              Font Style
            </span>
            <select
              className="pl-20 w-full h-10 cursor-pointer px-4 py-1 text-xs text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded"
              value={selectedFontStyle}
              onChange={handleSelectedFontStyleChange}
            >
              <option value="">All</option>
              {fontStyleOptions.map((option, index) => (
                <option key={index} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            className="relative h-10 cursor-pointer px-4 py-1 text-xs text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded whitespace-nowrap flex items-center gap-4"
            onClick={toggleSortOrder}
          >
            <span className="text-xs font-bold text-white">Order</span>
            {sortOrder === "asc" ? "A - Z" : "Z - A"}
          </button>
        </div>

        <div
          className={`text-xs whitespace-nowrap flex items-center justify-center text-center gap-1 bg-zinc-900/50 px-3 py-1.5 rounded-full ${
            filteredFonts.length > 0
              ? "text-green-400 bg-green-600/10"
              : "text-red-500 bg-red-600/10"
          }`}
        >
          <span className="font-bold">{filteredFonts.length}</span>
          <span>Fonts</span>
        </div>
      </div>

      {error ? (
        <div className="text-center text-sm p-8 text-zinc-400">
          <p>{error}</p>
          <button
            className="h-8 cursor-pointer px-4 py-1 text-xs text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded whitespace-nowrap"
            id="load-fonts"
            onClick={fetchFonts}
          >
            Load fonts
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col md:flex-row">
          <div className="md:max-w-80 w-max-w-80 p-4 md:sticky top-16 left-0 overflow-hidden z-10 h-fit">
            <div className="w-full rounded flex flex-col gap-8 items-center justify-center mx-auto">
              <div className="flex w-full flex-col gap-2">
                <h1 className="text-xl text-white font-bold">
                  Explore your installed fonts with ease.
                </h1>
                <h2 className="text-sm text-zinc-500 font-normal">
                  Discover and visualize a variety of styles directly in your
                  browser.
                </h2>
              </div>

              <div className="flex flex-col items-center gap-2 w-full">
                <label className="text-xs text-white flex items-center justify-between gap-2 w-full">
                  <span className="font-bold text-white">
                    Type your text to preview
                  </span>
                </label>
                <textarea
                  id="textTest"
                  rows={4}
                  className="resize-none w-full cursor-pointer p-2 text-xs text-white bg-zinc-950 border border-zinc-800 rounded"
                  placeholder="Hello World"
                  value={previewText}
                  onChange={handlePreviewTextChange}
                />
              </div>

              <div className="flex flex-col items-center gap-2 w-full">
                <label className="text-xs text-white flex items-center justify-between gap-2 w-full">
                  <span className="font-bold text-white">Font size</span>
                  <span className="text-zinc-400">{fontSize}px</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  className="cursor-pointer w-full accent-zinc-600"
                />
              </div>

              <div className="flex flex-col items-center gap-2 w-full">
                <label className="text-xs text-white flex items-center justify-between gap-2 w-full">
                  <span className="font-bold text-white">Line height</span>
                  <span className="text-zinc-400">{lineHeight}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={lineHeight}
                  onChange={handleLineHeightChange}
                  className="cursor-pointer w-full accent-zinc-600"
                />
              </div>

              <div className="flex flex-col items-center gap-2 w-full">
                <label className="text-xs text-white flex items-center justify-between gap-2 w-full">
                  <span className="font-bold text-white">Letter spacing</span>
                  <span className="text-zinc-400">{letterSpacing}</span>
                </label>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.1"
                  value={letterSpacing}
                  onChange={handleLetterSpacing}
                  className="cursor-pointer w-full accent-zinc-600"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col p-4 w-full gap-8 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4  w-full">
              {filteredFonts.slice(startIndex, endIndex).map((font, index) => (
                <div
                  className="group border border-zinc-800 rounded flex flex-col gap-2 bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-700 overflow-hidden px-8 py-10"
                  key={index}
                >
                  <div className="text-xs text-zinc-500 w-full text-center uppercase">
                    {font.style}
                  </div>

                  <div
                    className="w-full text-4xl text-white leading-none py-6 h-full flex justify-center items-center text-center whitespace-pre-wrap"
                    style={{
                      fontFamily: font.family,
                      fontSize: `${fontSize}px`,
                      lineHeight: `${lineHeight}`,
                      letterSpacing: `${letterSpacing}rem`,
                    }}
                  >
                    {previewText}
                  </div>

                  <div className="text-base text-zinc-500 w-full text-center">
                    {font.family}
                  </div>

                  <div className="text-xs text-white w-full text-center">
                    {font.fullName}
                  </div>
                </div>
              ))}
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
                className="h-8 cursor-pointer px-2 py-1 text-xs text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded whitespace-nowrap"
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
        </div>
      )}
    </div>
  );
};

export default FontList;
