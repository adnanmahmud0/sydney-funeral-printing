import {
  MousePointer2,
  Type,
  Square,
  Circle,
  Triangle,
  Star,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import { DesignObject } from "@/types/design";
import { useState } from "react";

interface SidebarProps {
  activeTool: "select" | "text" | "shape" | "image";
  onToolChange: (tool: "select" | "text" | "shape" | "image") => void;
  onAddObject: (object: DesignObject) => void;
}

export function Sidebar({
  activeTool,
  onToolChange,
  onAddObject,
}: SidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const addText = () => {
    const newText: DesignObject = {
      id: `text-${Date.now()}`,
      type: "text",
      x: 400,
      y: 300,
      width: 200,
      height: 50,
      rotation: 0,
      opacity: 1,
      text: "Double click to edit",
      fontSize: 24,
      fontFamily: "Inter",
      fontWeight: 400,
      textAlign: "left",
      color: "#000000",
    };
    onAddObject(newText);
  };

  const addShape = (shape: "rectangle" | "circle" | "triangle" | "star") => {
    const newShape: DesignObject = {
      id: `shape-${Date.now()}`,
      type: "shape",
      x: 450,
      y: 300,
      width: 150,
      height: 150,
      rotation: 0,
      opacity: 1,
      shape,
      fill: "#3b82f6",
      stroke: "#1e40af",
      strokeWidth: 2,
      cornerRadius: shape === "rectangle" ? 8 : 0,
    };
    onAddObject(newShape);
  };

  const addImage = (url: string) => {
    const img = new Image();
    img.onload = () => {
      const newImage: DesignObject = {
        id: `image-${Date.now()}`,
        type: "image",
        x: 400,
        y: 250,
        width: img.naturalWidth,
        height: img.naturalHeight,
        rotation: 0,
        opacity: 1,
        imageUrl: url,
      };
      onAddObject(newImage);
    };
    img.src = url;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          addImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-full bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      <div className="p-4">
        <h2 className="text-gray-900 text-sm uppercase tracking-wide mb-3">
          Tools
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onToolChange("select")}
            className={`p-3 rounded flex flex-col items-center gap-2 transition-colors ${
              activeTool === "select"
                ? "bg-[#1C75BC] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <MousePointer2 className="w-5 h-5" />
            <span className="text-xs">Select</span>
          </button>

          <button
            onClick={() => {
              onToolChange("text");
              setExpandedSection(expandedSection === "text" ? null : "text");
            }}
            className={`p-3 rounded flex flex-col items-center gap-2 transition-colors ${
              activeTool === "text"
                ? "bg-[#1C75BC] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Type className="w-5 h-5" />
            <span className="text-xs">Text</span>
          </button>

          <button
            onClick={() => {
              onToolChange("shape");
              setExpandedSection(
                expandedSection === "shapes" ? null : "shapes"
              );
            }}
            className={`p-3 rounded flex flex-col items-center gap-2 transition-colors ${
              activeTool === "shape"
                ? "bg-[#1C75BC] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Square className="w-5 h-5" />
            <span className="text-xs">Shapes</span>
          </button>

          <button
            onClick={() => {
              onToolChange("image");
              setExpandedSection(
                expandedSection === "images" ? null : "images"
              );
            }}
            className={`p-3 rounded flex flex-col items-center gap-2 transition-colors ${
              activeTool === "image"
                ? "bg-[#1C75BC] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            <span className="text-xs">Images</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {expandedSection === "text" && (
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-gray-900 text-sm mb-3">Add Text</h3>
            <button
              onClick={addText}
              className="w-full p-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded transition-colors text-sm"
            >
              + Add Text Box
            </button>
          </div>
        )}

        {expandedSection === "shapes" && (
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-gray-900 text-sm mb-3">Add Shape</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addShape("rectangle")}
                className="p-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded transition-colors flex flex-col items-center gap-2"
              >
                <Square className="w-6 h-6" />
                <span className="text-xs">Rectangle</span>
              </button>

              <button
                onClick={() => addShape("circle")}
                className="p-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded transition-colors flex flex-col items-center gap-2"
              >
                <Circle className="w-6 h-6" />
                <span className="text-xs">Circle</span>
              </button>

              <button
                onClick={() => addShape("triangle")}
                className="p-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded transition-colors flex flex-col items-center gap-2"
              >
                <Triangle className="w-6 h-6" />
                <span className="text-xs">Triangle</span>
              </button>

              <button
                onClick={() => addShape("star")}
                className="p-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded transition-colors flex flex-col items-center gap-2"
              >
                <Star className="w-6 h-6" />
                <span className="text-xs">Star</span>
              </button>
            </div>
          </div>
        )}

        {expandedSection === "images" && (
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-gray-900 text-sm mb-3">Add Image</h3>
            <label className="w-full p-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded transition-colors flex flex-col items-center gap-2 cursor-pointer">
              <Upload className="w-6 h-6" />
              <span className="text-xs">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
