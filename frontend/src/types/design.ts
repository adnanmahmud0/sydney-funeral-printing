export interface DesignObject {
  id: string;
  type: 'text' | 'shape' | 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  locked?: boolean;

  // Text properties
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  textAlign?: 'left' | 'center' | 'right';
  color?: string;

  // Shape properties
  shape?: 'rectangle' | 'circle' | 'triangle' | 'star';
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;

  // Image properties
  imageUrl?: string;

  // Shape with image background
  backgroundImage?: string;
  backgroundPosition?: { x: number; y: number };
  backgroundScale?: number;

  // Effects
  shadow?: {
    x: number;
    y: number;
    blur: number;
    color: string;
  };
  blur?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
}

export interface DesignPage {
  id: string;
  name: string;
  objects: DesignObject[];
  canvasSize: {
    width: number;
    height: number;
  };
}

export interface HistoryState {
  pages: DesignPage[];
  currentPageId: string;
  selectedId: string | null;
}