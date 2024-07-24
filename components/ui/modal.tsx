import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import FontSettingsPanel from "../FontSettingsPanel";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { Badge } from "./badge";
import RandomShape from "../RandomShape";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  data?: FontMetadata | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, data }) => {
  const [previewText, setPreviewText] = useState<string>(
    "Whereas disregard and contempt for human rights have resulted."
  );
  const [fontSize, setFontSize] = useState<number[]>([40]);
  const [lineHeight, setLineHeight] = useState<number[]>([1.3]);
  const [letterSpacing, setLetterSpacing] = useState<number[]>([0]);
  const [switchChecked, setSwitchChecked] = useState<string>("grid");
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "center"
  );

  const generateAllCharacters = () => {
    const characters = [];
    for (let i = 33; i <= 126; i++) {
      characters.push(String.fromCharCode(i));
    }

    const additionalChars = [
      "ç",
      "ã",
      "á",
      "é",
      "í",
      "ó",
      "ú",
      "â",
      "ê",
      "î",
      "ô",
      "û",
      "ä",
      "ë",
      "ï",
      "ö",
      "ü",
      "À",
      "Á",
      "Â",
      "Ã",
      "Ä",
      "Å",
      "Æ",
      "Ç",
      "È",
      "É",
      "Ê",
      "Ë",
      "Ì",
      "Í",
      "Î",
      "Ï",
      "Ñ",
      "Ò",
      "Ó",
      "Ô",
      "Õ",
      "Ö",
      "Ø",
      "Ù",
      "Ú",
      "Û",
      "Ü",
      "Ý",
      "Þ",
      "ß",
      "à",
      "á",
      "â",
      "ã",
      "ä",
      "å",
      "æ",
      "è",
      "é",
      "ê",
      "ë",
      "ì",
      "í",
      "î",
      "ï",
      "ð",
      "ñ",
      "ò",
      "ó",
      "ô",
      "õ",
      "ö",
      "ø",
      "ù",
      "ú",
      "û",
      "ü",
      "ý",
      "þ",
      "ÿ",
    ];

    characters.push(...additionalChars);

    return characters;
  };

  const [selectedChar, setSelectedChar] = useState<string | null>("A");

  const colorSchemes = [
    {
      background: "#103A00",
      icon: "#FF2A00",
      text: "#EDE463",
    },
    {
      background: "#D2ED75",
      icon: "#00C3FF",
      text: "#5D0100",
    },
    {
      background: "#FFD85B",
      icon: "#00CA00",
      text: "#003062",
    },
    {
      background: "#004030",
      icon: "#FF0000",
      text: "#FFBBFF",
    },
    {
      background: "#FF6E00",
      icon: "#002B69",
      text: "#B4F38D",
    },
    {
      background: "#00A4FF",
      icon: "#003F03",
      text: "#8FFAA8",
    },
    {
      background: "#FFB6F4",
      icon: "#33256E",
      text: "#FF2900",
    },
    {
      background: "#1A256A",
      icon: "#FF0000",
      text: "#D2ED72",
    },
    {
      background: "#FF0060",
      icon: "#EAE462",
      text: "#2B1D65",
    },
    {
      background: "#002C69",
      icon: "#EDE462",
      text: "#FF2900",
    },
    {
      background: "#003E02",
      icon: "#4FFDDC",
      text: "#5F7EFF",
    },
  ];

  const text1 =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  const text2 =
    "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  const text3 =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("!overflow-hidden");
    } else {
      document.body.classList.remove("!overflow-hidden");
    }

    return () => {
      document.body.classList.remove("!overflow-hidden");
    };
  }, [isOpen]);

  const handlePreviewTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPreviewText(event.target.value);
  };

  const allCharacters = generateAllCharacters();

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

  if (!isOpen) return null;

  const sanitizeContent = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const allowedTags = ["B", "I", "U", "STRONG", "EM"];
    const sanitizeNode = (node: Node) => {
      if (node.nodeType === 1) {
        const element = node as Element;
        if (!allowedTags.includes(element.tagName)) {
          const textNode = document.createTextNode(element.textContent || "");
          element.parentNode?.replaceChild(textNode, element);
        } else {
          Array.from(element.childNodes).forEach(sanitizeNode);
        }
      } else if (node.nodeType === 3) {
      } else {
        node.parentNode?.removeChild(node);
      }
    };

    Array.from(event.currentTarget.childNodes).forEach(sanitizeNode);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 w-full z-50 backdrop-blur">
      <div className="bg-background border border-border rounded-lg shadow-lg p-8 py-10 w-screen h-screen flex relative overflow-auto">
        <div className="fixed top-10 right-10">
          <X
            className="w-5 h-5 cursor-pointer opacity-50 hover:opacity-100"
            onClick={onClose}
          />
        </div>
        {data ? (
          <div
            className="w-full block md:flex flex-row mx-auto"
            style={{
              fontFamily: data.family,
            }}
          >
            <div className="w-full p-4">
              <div className="mb-8 flex flex-col items-center justify-center text-center gap-2 w-full max-w-screen-lg mx-auto">
                <div className="flex gap-2 items-center">
                  <div className="text-lg text-primary/50 font-sans">
                    {data.family}
                  </div>
                  <Badge variant="secondary" className="font-sans">
                    {data.style}
                  </Badge>
                </div>

                <div className="text-6xl text-primary font-bold">
                  {data.fullName}
                </div>
              </div>

              <div className="flex pb-20 flex-col gap-20">
                <div className="w-full max-w-screen-lg mx-auto flex flex-col gap-2 border border-input rounded">
                  <div
                    className={cn(
                      "w-full text-7xl text-primary leading-none min-h-[300px] flex items-center mx-auto p-8",
                      { "text-center justify-center": textAlign === "center" },
                      { "text-left justify-start": textAlign === "left" },
                      { "text-right justify-end": textAlign === "right" }
                    )}
                    style={{
                      fontFamily: data.family,
                      fontSize: `${fontSize}px`,
                      lineHeight: lineHeight[0],
                      letterSpacing: `${letterSpacing}rem`,
                      textAlign: textAlign,
                    }}
                    contentEditable={true}
                    onInput={sanitizeContent}
                    suppressContentEditableWarning={true}
                  >
                    {previewText}
                  </div>

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
                    modalMode={true}
                  />
                </div>

                <div className="flex flex-col gap-6 w-full max-w-screen-lg mx-auto">
                  <h1
                    contentEditable={true}
                    onInput={sanitizeContent}
                    suppressContentEditableWarning={true}
                    className="text-5xl font-bold text-primary tracking-wide"
                    style={{ lineHeight: 1.3 }}
                  >
                    {text1}
                  </h1>

                  <h2
                    contentEditable={true}
                    onInput={sanitizeContent}
                    suppressContentEditableWarning={true}
                    className="text-2xl font-normal text-primary/80 tracking-normal"
                    style={{ lineHeight: 1.3 }}
                  >
                    {text2}
                  </h2>

                  <p
                    contentEditable={true}
                    onInput={sanitizeContent}
                    suppressContentEditableWarning={true}
                    className="text-base text-primary/50 tracking-normal"
                    style={{ lineHeight: 1.5 }}
                  >
                    {text3}
                  </p>
                </div>

                <div className="w-full">
                  <Carousel className="w-full">
                    <CarouselContent className="w-full -ml-0 gap-2">
                      {colorSchemes.map((color, index) => (
                        <CarouselItem
                          key={index}
                          className="p-4 select-none aspect-square pointer-events-none basis-1/3 rounded-sm border h-[70vh] flex justify-center items-center text-center text-5xl relative z-50 overflow-hidden"
                          style={{
                            background: color.background,
                          }}
                        >
                          <RandomShape
                            fill={color.icon}
                            className="absolute -z-10"
                          />
                          <div
                            className="text-[5rem] font-bold w-full max-w-96"
                            style={{
                              color: color.text,
                            }}
                          >
                            <span className="whitespace-break-spaces break-all">
                              ABCDEFGHIJKLMNOPQRSTUVXWYZ0123456789
                            </span>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>

                <div className="flex gap-4 relative w-full max-w-screen-lg mx-auto">
                  <div className="w-[300px] min-w-[300px] h-[300px] aspect-square border sticky top-0 left-0 z-10 text-[10rem] leading-none overflow-hidden flex justify-center items-center text-center">
                    <span>{selectedChar}</span>
                  </div>
                  <div className="w-full grid grid-cols-10 gap-1">
                    {allCharacters.map((char, index) => (
                      <div
                        key={index}
                        onMouseEnter={() => setSelectedChar(char)}
                        className="card border hover:bg-secondary aspect-square flex text-xl justify-center items-center text-center"
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
