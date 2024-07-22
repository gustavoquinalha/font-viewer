import React, { useState } from "react";
import { Button } from "./button";
import { X } from "lucide-react";
import FontSettingsPanel from "../FontSettingsPanel";
import { cn } from "@/lib/utils";

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
    for (let i = 32; i <= 126; i++) {
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

  const text1 =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  const text2 =
    "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  const text3 =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";

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
      <div className="bg-background border border-border rounded-lg shadow-lg p-8 py-10 w-[90vw] h-[90vh] flex relative overflow-auto">
        <div className="absolute top-4 right-4">
          <X
            className="w-5 h-5 cursor-pointer opacity-50 hover:opacity-100"
            onClick={onClose}
          />
        </div>
        {data ? (
          <div className="w-full block md:flex flex-row max-w-screen-lg mx-auto">
            <div className="w-full p-4">
              <div className="flex gap-1 items-baseline mb-2">
                <div className="text-base text-primary">{data.family}</div>
                <div className="text-base text-primary">
                  / {data.fullName} /
                </div>
                <div className="text-base text-primary uppercase">
                  {data.style}
                </div>
              </div>

              <div className="flex pb-8 flex-col gap-10">
                <div className="w-full flex flex-col gap-2 border border-input rounded overflow-hidden">
                  <div
                    className={cn(
                      "mb-10 w-full text-7xl text-primary leading-none min-h-[50vh] flex items-center mx-auto p-8",
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

                <h1
                  contentEditable={true}
                  onInput={sanitizeContent}
                  suppressContentEditableWarning={true}
                  className="text-5xl font-bold text-primary"
                  style={{ lineHeight: 1.3 }}
                >
                  {text1}
                </h1>

                <h2
                  contentEditable={true}
                  onInput={sanitizeContent}
                  suppressContentEditableWarning={true}
                  className="text-3xl font-normal text-primary/80"
                  style={{ lineHeight: 1.3 }}
                >
                  {text2}
                </h2>

                <p
                  contentEditable={true}
                  onInput={sanitizeContent}
                  suppressContentEditableWarning={true}
                  className="text-base text-primary/50"
                  style={{ lineHeight: 1.5 }}
                >
                  {text3}
                </p>

                <div className="w-full grid grid-cols-3 md:grid-cols-6 gap-2">
                  {allCharacters.map((char, index) => (
                    <div
                      key={index}
                      className="border p-4 text-2xl rounded hover:bg-secondary min-h-24 flex justify-center items-center text-center"
                    >
                      {char}
                    </div>
                  ))}
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
