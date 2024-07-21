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

interface Window {
    queryLocalFonts(): Promise<FontMetadata[]>;
}