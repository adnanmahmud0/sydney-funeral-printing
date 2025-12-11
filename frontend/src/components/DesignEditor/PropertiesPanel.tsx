/* eslint-disable @next/next/no-img-element */
import { DesignObject } from "@/types/design";
import {
  Type,
  Square,
  Image,
  ImageIcon,
  AlignHorizontalJustifyCenter,
  AlignVerticalJustifyCenter,
  AlignCenter,
} from "lucide-react";

interface PropertiesPanelProps {
  selectedObject: DesignObject | undefined;
  onUpdate: (updates: Partial<DesignObject>) => void;
  canvasSize?: { width: number; height: number };
}

export function PropertiesPanel({
  selectedObject,
  onUpdate,
  canvasSize,
}: PropertiesPanelProps) {
  if (!selectedObject) {
    return (
      <div className="w-full h-full bg-white border-l border-gray-200 p-6 flex items-center justify-center overflow-y-auto">
        <p className="text-gray-500 text-center">
          Select an object to edit its properties
        </p>
      </div>
    );
  }

  // Alignment functions
  const alignHorizontalCenter = () => {
    if (!canvasSize) return;
    const centerX = (canvasSize.width - selectedObject.width) / 2;
    onUpdate({ x: centerX });
  };

  const alignVerticalCenter = () => {
    if (!canvasSize) return;
    const centerY = (canvasSize.height - selectedObject.height) / 2;
    onUpdate({ y: centerY });
  };

  const alignCenter = () => {
    if (!canvasSize) return;
    const centerX = (canvasSize.width - selectedObject.width) / 2;
    const centerY = (canvasSize.height - selectedObject.height) / 2;
    onUpdate({ x: centerX, y: centerY });
  };

  return (
    <div className="w-full h-full bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4 space-y-6">
        <div>
          <h2 className="text-gray-900 mb-4 flex items-center gap-2">
            {selectedObject.type === "text" && <Type className="w-5 h-5" />}
            {selectedObject.type === "shape" && <Square className="w-5 h-5" />}
            {selectedObject.type === "image" && (
              <ImageIcon className="w-5 h-5" />
            )}
            Properties
          </h2>
        </div>

        {/* Position & Size */}
        <div className="space-y-3">
          <h3 className="text-gray-700 text-sm">Position & Size</h3>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-gray-600 text-xs block mb-1">X</label>
              <input
                type="number"
                value={Math.round(selectedObject.x)}
                onChange={(e) => onUpdate({ x: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded text-sm"
              />
            </div>
            <div>
              <label className="text-gray-600 text-xs block mb-1">Y</label>
              <input
                type="number"
                value={Math.round(selectedObject.y)}
                onChange={(e) => onUpdate({ y: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-gray-600 text-xs block mb-1">Width</label>
              <input
                type="number"
                value={Math.round(selectedObject.width)}
                onChange={(e) => onUpdate({ width: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded text-sm"
              />
            </div>
            <div>
              <label className="text-gray-600 text-xs block mb-1">Height</label>
              <input
                type="number"
                value={Math.round(selectedObject.height)}
                onChange={(e) => onUpdate({ height: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-600 text-xs block mb-1">Rotation</label>
            <input
              type="range"
              min="0"
              max="360"
              value={selectedObject.rotation}
              onChange={(e) => onUpdate({ rotation: Number(e.target.value) })}
              className="w-full"
            />
            <span className="text-gray-600 text-xs">
              {Math.round(selectedObject.rotation)}°
            </span>
          </div>

          <div>
            <label className="text-gray-600 text-xs block mb-1">Opacity</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={selectedObject.opacity}
              onChange={(e) => onUpdate({ opacity: Number(e.target.value) })}
              className="w-full"
            />
            <span className="text-gray-600 text-xs">
              {Math.round(selectedObject.opacity * 100)}%
            </span>
          </div>
        </div>

        {/* Alignment */}
        {canvasSize && (
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <h3 className="text-gray-700 text-sm">Alignment</h3>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={alignHorizontalCenter}
                className="flex flex-col items-center justify-center gap-1 p-3 bg-gray-50 hover:bg-[#1C75BC] hover:text-white border border-gray-200 rounded transition-colors group"
                title="Align Horizontal Center"
              >
                <AlignHorizontalJustifyCenter className="w-5 h-5" />
                <span className="text-xs">H Center</span>
              </button>

              <button
                onClick={alignVerticalCenter}
                className="flex flex-col items-center justify-center gap-1 p-3 bg-gray-50 hover:bg-[#1C75BC] hover:text-white border border-gray-200 rounded transition-colors group"
                title="Align Vertical Center"
              >
                <AlignVerticalJustifyCenter className="w-5 h-5" />
                <span className="text-xs">V Center</span>
              </button>

              <button
                onClick={alignCenter}
                className="flex flex-col items-center justify-center gap-1 p-3 bg-gray-50 hover:bg-[#1C75BC] hover:text-white border border-gray-200 rounded transition-colors group"
                title="Align Center"
              >
                <AlignCenter className="w-5 h-5" />
                <span className="text-xs">Center</span>
              </button>
            </div>
          </div>
        )}

        {/* Text Properties */}
        {selectedObject.type === "text" && (
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <h3 className="text-gray-700 text-sm">Text</h3>

            <div>
              <label className="text-gray-600 text-xs block mb-1">
                Font Size
              </label>
              <input
                type="number"
                value={selectedObject.fontSize}
                onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded text-sm"
              />
            </div>

            <div>
              <label className="text-gray-600 text-xs block mb-1">
                Font Family
              </label>
              <select
                value={selectedObject.fontFamily}
                onChange={(e) => onUpdate({ fontFamily: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded text-sm"
              >
                <option value="Inter">Inter</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Georgia">Georgia</option>
                <option value="Courier New">Courier New</option>
              </select>
            </div>

            <div>
              <label className="text-gray-600 text-xs block mb-1">
                Font Weight
              </label>
              <select
                value={selectedObject.fontWeight}
                onChange={(e) =>
                  onUpdate({ fontWeight: Number(e.target.value) })
                }
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded text-sm"
              >
                <option value={300}>Light</option>
                <option value={400}>Regular</option>
                <option value={500}>Medium</option>
                <option value={600}>Semibold</option>
                <option value={700}>Bold</option>
              </select>
            </div>

            <div>
              <label className="text-gray-600 text-xs block mb-1">
                Text Align
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(["left", "center", "right"] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() => onUpdate({ textAlign: align })}
                    className={`py-2 rounded text-xs transition-colors ${
                      selectedObject.textAlign === align
                        ? "bg-[#1C75BC] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {align.charAt(0).toUpperCase() + align.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-gray-600 text-xs block mb-1">Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedObject.color}
                  onChange={(e) => onUpdate({ color: e.target.value })}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedObject.color}
                  onChange={(e) => onUpdate({ color: e.target.value })}
                  className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Shape Properties */}
        {selectedObject.type === "shape" && (
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <h3 className="text-gray-700 text-sm">Appearance</h3>

            <div>
              <label className="text-gray-600 text-xs block mb-1">
                Fill Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedObject.fill}
                  onChange={(e) => onUpdate({ fill: e.target.value })}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedObject.fill}
                  onChange={(e) => onUpdate({ fill: e.target.value })}
                  className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded text-sm"
                />
              </div>
            </div>

            {!selectedObject.backgroundImage ? (
              <button
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          onUpdate({
                            backgroundImage: event.target.result as string,
                            backgroundPosition: { x: 50, y: 50 },
                            backgroundScale: 1,
                          });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  };
                  input.click();
                }}
                className="w-full px-3 py-2 bg-[#1C75BC] hover:bg-[#155a94] text-white rounded transition-colors text-sm flex items-center justify-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                Add Image Fill
              </button>
            ) : (
              <div className="space-y-3">
                <div className="bg-gray-100 border border-gray-200 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 text-sm">Image Fill</span>
                    <button
                      onClick={() =>
                        onUpdate({
                          backgroundImage: undefined,
                          backgroundPosition: undefined,
                          backgroundScale: undefined,
                        })
                      }
                      className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <img
                    src={selectedObject.backgroundImage}
                    alt="Fill"
                    className="w-full h-20 object-cover rounded"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-xs block mb-1">
                    Position X
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={selectedObject.backgroundPosition?.x || 50}
                    onChange={(e) =>
                      onUpdate({
                        backgroundPosition: {
                          x: Number(e.target.value),
                          y: selectedObject.backgroundPosition?.y || 50,
                        },
                      })
                    }
                    className="w-full"
                  />
                  <span className="text-gray-600 text-xs">
                    {selectedObject.backgroundPosition?.x || 50}%
                  </span>
                </div>

                <div>
                  <label className="text-gray-600 text-xs block mb-1">
                    Position Y
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={selectedObject.backgroundPosition?.y || 50}
                    onChange={(e) =>
                      onUpdate({
                        backgroundPosition: {
                          x: selectedObject.backgroundPosition?.x || 50,
                          y: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full"
                  />
                  <span className="text-gray-600 text-xs">
                    {selectedObject.backgroundPosition?.y || 50}%
                  </span>
                </div>

                <div>
                  <label className="text-gray-600 text-xs block mb-1">
                    Scale
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={selectedObject.backgroundScale || 1}
                    onChange={(e) =>
                      onUpdate({ backgroundScale: Number(e.target.value) })
                    }
                    className="w-full"
                  />
                  <span className="text-gray-600 text-xs">
                    {((selectedObject.backgroundScale || 1) * 100).toFixed(0)}%
                  </span>
                </div>

                <button
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          if (event.target?.result) {
                            onUpdate({
                              backgroundImage: event.target.result as string,
                              backgroundPosition: { x: 50, y: 50 },
                              backgroundScale: 1,
                            });
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    };
                    input.click();
                  }}
                  className="w-full px-3 py-2 bg-[#1C75BC] hover:bg-[#155a94] text-white rounded transition-colors text-sm"
                >
                  Change Image
                </button>
              </div>
            )}

            <div>
              <label className="text-gray-600 text-xs block mb-1">
                Stroke Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedObject.stroke}
                  onChange={(e) => onUpdate({ stroke: e.target.value })}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedObject.stroke}
                  onChange={(e) => onUpdate({ stroke: e.target.value })}
                  className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-600 text-xs block mb-1">
                Stroke Width
              </label>
              <input
                type="number"
                value={selectedObject.strokeWidth}
                onChange={(e) =>
                  onUpdate({ strokeWidth: Number(e.target.value) })
                }
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded text-sm"
              />
            </div>

            {selectedObject.shape === "rectangle" && (
              <div>
                <label className="text-gray-600 text-xs block mb-1">
                  Corner Radius
                </label>
                <input
                  type="number"
                  value={selectedObject.cornerRadius || 0}
                  onChange={(e) =>
                    onUpdate({ cornerRadius: Number(e.target.value) })
                  }
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded text-sm"
                />
              </div>
            )}
          </div>
        )}

        {/* Effects */}
        <div className="space-y-3 pt-4 border-t border-gray-200">
          <h3 className="text-gray-700 text-sm">Effects</h3>

          <div>
            <label className="text-gray-600 text-xs block mb-1">Blur</label>
            <input
              type="range"
              min="0"
              max="20"
              value={selectedObject.blur || 0}
              onChange={(e) => onUpdate({ blur: Number(e.target.value) })}
              className="w-full"
            />
            <span className="text-gray-600 text-xs">
              {selectedObject.blur || 0}px
            </span>
          </div>
        </div>

        {/* Image Properties */}
        {selectedObject.type === "image" && (
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <h3 className="text-gray-700 text-sm">Image</h3>

            {selectedObject.imageUrl && (
              <div className="bg-gray-100 border border-gray-200 rounded p-3">
                <img
                  src={selectedObject.imageUrl}
                  alt="Preview"
                  className="w-full h-32 object-contain rounded mb-2"
                />
              </div>
            )}

            <button
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        const img = new Image();
                        img.onload = () => {
                          onUpdate({
                            imageUrl: event.target.result as string,
                            width: img.naturalWidth,
                            height: img.naturalHeight,
                          });
                        };
                        img.src = event.target.result as string;
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                };
                input.click();
              }}
              className="w-full px-3 py-2 bg-[#1C75BC] hover:bg-[#155a94] text-white rounded transition-colors text-sm flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              Replace Image
            </button>

            <button
              onClick={() => {
                if (selectedObject.imageUrl) {
                  const img = new Image();
                  img.onload = () => {
                    onUpdate({
                      width: img.naturalWidth,
                      height: img.naturalHeight,
                    });
                  };
                  img.src = selectedObject.imageUrl;
                }
              }}
              className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded transition-colors text-sm"
            >
              Reset to Original Size
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
