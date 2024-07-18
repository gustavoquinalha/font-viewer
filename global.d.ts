interface FontMetadata {
    family: string;
}

interface Window {
    queryLocalFonts(): Promise<FontMetadata[]>;
}