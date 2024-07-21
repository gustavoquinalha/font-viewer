import React, { useState } from "react";
import { Button } from "./button";

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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  data?: FontMetadata | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, data }) => {
  const [previewText] = useState<string>(
    "Whereas disregard and contempt for human rights have resulted"
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

  const allCharacters = generateAllCharacters();

  if (!isOpen) return null;

  const sanitizeContent = (event: React.SyntheticEvent<HTMLDivElement>) => {
    // Sanitization logic to prevent XSS or unwanted content
    const allowedTags = ["B", "I", "U", "STRONG", "EM"];
    const sanitizeNode = (node: Node) => {
      if (node.nodeType === 1) {
        // Element
        const element = node as Element;
        if (!allowedTags.includes(element.tagName)) {
          const textNode = document.createTextNode(element.textContent || "");
          element.parentNode?.replaceChild(textNode, element);
        } else {
          Array.from(element.childNodes).forEach(sanitizeNode);
        }
      } else if (node.nodeType === 3) {
        // Text
        // No need to sanitize text nodes
      } else {
        // Remove other types of nodes
        node.parentNode?.removeChild(node);
      }
    };

    Array.from(event.currentTarget.childNodes).forEach(sanitizeNode);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/95 w-full z-50 backdrop-blur">
      <div className="bg-background border border-border rounded-lg shadow-lg p-8 py-10 w-full max-w-screen-md h-[90vh] flex relative overflow-auto">
        {data ? (
          <div className="w-full">
            <div className="absolute top-4 right-4">
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
            </div>

            <div className="flex gap-1 items-baseline">
              <div className="text-xs text-primary">{data.family}</div>
              <div className="text-xs text-primary">/ {data.fullName} /</div>
              <div className="text-xs text-primary uppercase">{data.style}</div>
            </div>

            <div className="flex py-8 flex-col gap-8">
              <div
                className="w-full text-7xl text-primary leading-none"
                style={{
                  fontFamily: data.family,
                }}
                contentEditable={true}
                onInput={sanitizeContent}
                suppressContentEditableWarning={true}
              >
                {previewText}
              </div>

              <div
                className="w-full text-base text-primary/80 leading-none"
                style={{
                  fontFamily: data.family,
                }}
                contentEditable={true}
                onInput={sanitizeContent}
                suppressContentEditableWarning={true}
              >
                {previewText}
              </div>

              <div
                className="w-full text-xs text-primary/50 leading-none"
                style={{
                  fontFamily: data.family,
                }}
                contentEditable={true}
                onInput={sanitizeContent}
                suppressContentEditableWarning={true}
              >
                {previewText}
              </div>

              <div className="w-full grid grid-cols-4 md:grid-cols-8 gap-2">
                {allCharacters.map((char, index) => (
                  <div key={index} className="border p-4 text-center text-xl rounded hover:bg-secondary">
                    {char}
                  </div>
                ))}
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
