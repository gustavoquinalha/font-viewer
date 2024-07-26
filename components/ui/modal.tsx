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
import RandomShape from "../RandomShape";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { Button } from "./button";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Label } from "./label";
import Link from "next/link";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Textarea } from "./textarea";
import { Alert, AlertDescription, AlertTitle } from "./alert";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: GroupedFont;
}

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

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  const [previewText, setPreviewText] = useState<string>(
    "Whereas disregard and contempt for human rights have resulted."
  );
  const [fontFamily, setFontFamily] = useState<string>("");
  const [fontSize, setFontSize] = useState<number[]>([40]);
  const [lineHeight, setLineHeight] = useState<number[]>([1.3]);
  const [letterSpacing, setLetterSpacing] = useState<number[]>([0]);
  const [switchChecked, setSwitchChecked] = useState<string>("grid");
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "center"
  );
  const [selectedChar, setSelectedChar] = useState<string | null>("A");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  useEffect(() => {
    setFontFamily(data?.fonts[0]?.fullName || "");
  }, [data?.fonts]);

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

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

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

  const handleStylefont = (event: any) => {
    console.log("handleStylefont", event);

    setFontFamily(event);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 w-full z-[110] backdrop-blur">
      <div className="bg-background border border-border rounded-lg shadow-lg p-8 py-10 w-screen h-screen flex relative overflow-auto">
        <div className="fixed top-10 right-10">
          <X
            className="w-5 h-5 cursor-pointer opacity-50 hover:opacity-100"
            onClick={onClose}
          />
        </div>
        {data ? (
          <div className="w-full block md:flex flex-row mx-auto">
            <div className="w-full p-4">
              <div className="mb-8 flex flex-col items-center justify-center text-center gap-4 container">
                <div
                  className="text-7xl font-bold text-primary"
                  style={{
                    fontFamily: `"${fontFamily}", "${data.family}"`,
                  }}
                >
                  {data.family}
                </div>

                <Tabs value={fontFamily} onValueChange={handleStylefont}>
                  <TabsList className="!flex flex-wrap h-full">
                    {data.fonts.map((item, index) => (
                      <TabsTrigger
                        key={index}
                        value={item.fullName || ""}
                        className="w-fit"
                      >
                        {item.style}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              <div
                className="flex pb-20 flex-col gap-20"
                style={{
                  fontFamily: `"${fontFamily}", "${data.family}"`,
                }}
              >
                <div className="container flex flex-col border border-input rounded">
                  <div
                    className={cn(
                      "w-full text-7xl text-primary leading-none min-h-[300px] flex items-center mx-auto p-8",
                      { "text-center justify-center": textAlign === "center" },
                      { "text-left justify-start": textAlign === "left" },
                      { "text-right justify-end": textAlign === "right" }
                    )}
                    style={{
                      fontFamily: `"${fontFamily}", "${data.family}"`,
                      fontSize: `${fontSize}px`,
                      lineHeight: lineHeight[0],
                      letterSpacing: `${letterSpacing}rem`,
                      textAlign: textAlign,
                    }}
                    contentEditable={true}
                    suppressContentEditableWarning
                    dangerouslySetInnerHTML={{ __html: previewText }}
                  ></div>

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

                <div className="flex flex-col gap-6 container">
                  <h1
                    className="text-5xl font-bold text-primary tracking-wide"
                    style={{ lineHeight: 1.3 }}
                  >
                    {text1}
                  </h1>
                  <h2
                    className="text-2xl font-normal text-primary/80 tracking-normal"
                    style={{ lineHeight: 1.3 }}
                  >
                    {text2}
                  </h2>
                  <p
                    className="text-base text-primary tracking-normal"
                    style={{ lineHeight: 1.5 }}
                  >
                    {text3}
                  </p>
                </div>

                <div className="flex gap-4 relative container">
                  <div className="w-[300px] h-[300px] aspect-square border sticky top-0 left-0 z-10 text-[10rem] leading-none overflow-hidden flex justify-center items-center text-center">
                    <span>{selectedChar}</span>
                  </div>
                  <div className="w-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1">
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

                <div className="flex flex-col container gap-4">
                  <Label className="uppercase">Components</Label>
                  <div className=" columns-1 md:columns-2 lg:columns-3 xl:columns-4">
                    <section className="w-full mb-4">
                      <div className="flex flex-wrap gap-4 w-full">
                        <Card className="w-full">
                          <CardHeader>
                            <CardTitle>Primary</CardTitle>
                          </CardHeader>
                          <CardContent className="flex flex-col gap-4">
                            <Button>Primary</Button>
                            <Button disabled>Disabled</Button>
                            <Button size="sm">Small</Button>
                            <Button size="lg">Large</Button>
                          </CardContent>
                        </Card>

                        <Card className="w-full">
                          <CardHeader>
                            <CardTitle>Secondary</CardTitle>
                          </CardHeader>
                          <CardContent className="flex flex-col gap-4">
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="secondary" disabled>
                              Disabled
                            </Button>
                            <Button variant="secondary" size="sm">
                              Small
                            </Button>
                            <Button variant="secondary" size="lg">
                              Large
                            </Button>
                          </CardContent>
                        </Card>

                        <Card className="w-full">
                          <CardHeader>
                            <CardTitle>Outline</CardTitle>
                          </CardHeader>
                          <CardContent className="flex flex-col gap-4">
                            <Button variant="outline">Outline</Button>
                            <Button variant="outline" disabled>
                              Disabled
                            </Button>
                            <Button variant="outline" size="sm">
                              Small
                            </Button>
                            <Button variant="outline" size="lg">
                              Large
                            </Button>
                          </CardContent>
                        </Card>

                        <Card className="w-full">
                          <CardHeader>
                            <CardTitle>Ghost</CardTitle>
                          </CardHeader>
                          <CardContent className="flex flex-col gap-4">
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="ghost" disabled>
                              Disabled
                            </Button>
                            <Button variant="ghost" size="sm">
                              Small
                            </Button>
                            <Button variant="ghost" size="lg">
                              Large
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </section>

                    <section className="w-full mb-4">
                      <div className="flex flex-wrap gap-4 w-full">
                        <Card className="w-full">
                          <CardHeader>
                            <CardTitle>Basic Card</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>
                              This is a basic card with a header, content, and
                              optional footer.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button>Learn More</Button>
                          </CardFooter>
                        </Card>

                        <Card className="w-full">
                          <CardHeader>
                            <CardTitle>Elevated Card</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>
                              This is an elevated card with a subtle shadow
                              effect to make it stand out.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="secondary">Learn More</Button>
                          </CardFooter>
                        </Card>

                        <Card className="w-full">
                          <CardHeader>
                            <CardTitle>Subtle Card</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>
                              This is a subtle card with a lighter background
                              and border.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline">Learn More</Button>
                          </CardFooter>
                        </Card>

                        <Card className="w-full">
                          <CardHeader>
                            <CardTitle>Bordered Card</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>
                              This is a card with a visible border around the
                              edges.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="ghost">Learn More</Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </section>

                    <section className="w-full mb-4">
                      <div className="flex flex-wrap gap-4 w-full">
                        <Alert className="w-full">
                          <AlertTitle>Primary Alert</AlertTitle>
                          <AlertDescription>
                            This is a primary alert with a title and
                            description.
                          </AlertDescription>
                        </Alert>
                        
                        <Alert className="w-full" variant="destructive">
                          <AlertTitle>Danger Alert</AlertTitle>
                          <AlertDescription>
                            This is a danger alert with a title and description.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </section>

                    <section className="w-full mb-4">
                      <Card className="w-full">
                        <CardHeader>
                          <CardTitle>Contact Us</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <form className="grid gap-4">
                            <div className="grid gap-1">
                              <Label htmlFor="name">Name</Label>
                              <Input id="name" placeholder="Enter your name" />
                            </div>
                            <div className="grid gap-1">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                              />
                            </div>
                            <div className="grid gap-1">
                              <Label htmlFor="message">Message</Label>
                              <Textarea
                                id="message"
                                placeholder="Enter your message"
                              />
                            </div>
                            <Button type="submit">Submit</Button>
                          </form>
                        </CardContent>
                      </Card>
                    </section>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-4">
                  <Label className="uppercase">Posters</Label>
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
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Modal;
