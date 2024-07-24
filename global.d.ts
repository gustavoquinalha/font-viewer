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
    teste?: any;
}

interface GroupedFont {
    family: string;
    fonts: Omit<FontMetadata, "family">[];
  }

interface Window {
    queryLocalFonts(): Promise<FontMetadata[]>;
}