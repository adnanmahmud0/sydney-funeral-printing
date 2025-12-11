import {
  Undo,
  Redo,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Save,
  Menu,
  Settings,
  Ruler,
  ImagePlus,
  X,
  Crosshair,
} from "lucide-react";
import { useState } from "react";

interface ToolbarProps {
  canvasSize: { width: number; height: number };
  onExport: () => void;
  onToggleSidebar: () => void;
  onToggleProperties: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUpdatePageSize: (width: number, height: number) => void;
  onEditImage: (file: File) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onCenterCanvas: () => void;
  zoom: number;
  onClose: () => void;
}

export function Toolbar({
  canvasSize,
  onExport,
  onToggleSidebar,
  onToggleProperties,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onUpdatePageSize,
  onEditImage,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onCenterCanvas,
  zoom,
  onClose,
}: ToolbarProps) {
  const [showSizeDialog, setShowSizeDialog] = useState(false);
  const [tempWidth, setTempWidth] = useState(canvasSize.width);
  const [tempHeight, setTempHeight] = useState(canvasSize.height);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onEditImage(file);
    }
    // Reset the input so the same file can be selected again
    e.target.value = "";
  };

  const handleSizeSubmit = () => {
    onUpdatePageSize(tempWidth, tempHeight);
    setShowSizeDialog(false);
  };

  const presetSizes = [
    { name: "A4 Portrait", width: 794, height: 1123 },
    { name: "A4 Landscape", width: 1123, height: 794 },
    { name: "Square", width: 1000, height: 1000 },
    { name: "Social Post", width: 1080, height: 1080 },
    { name: "Story", width: 1080, height: 1920 },
  ];

  return (
    <>
      <div className="h-14 md:h-16 bg-white border-b border-gray-200 flex items-center justify-between px-3 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <h1 className="text-gray-900 text-sm md:text-base mr-2 md:mr-6">
            Design Editor
          </h1>

          {/* Edit Image Button */}
          <label className="px-3 md:px-4 py-2 bg-[#1C75BC] hover:bg-[#155a94] text-white rounded transition-colors flex items-center gap-2 cursor-pointer text-sm">
            <ImagePlus className="w-4 h-4" />
            <span>Edit Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <div className="hidden md:block h-8 w-px bg-gray-200" />

          <div className="flex items-center gap-2">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className={`p-2 hover:bg-gray-100 rounded transition-colors ${
                canUndo
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <Undo className="w-5 h-5" />
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className={`p-2 hover:bg-gray-100 rounded transition-colors ${
                canRedo
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <Redo className="w-5 h-5" />
            </button>
          </div>

          <div className="hidden md:block h-8 w-px bg-gray-200" />

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onZoomOut}
              className="p-2 hover:bg-gray-100 rounded text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-gray-700 text-sm min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={onZoomIn}
              className="p-2 hover:bg-gray-100 rounded text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={onZoomReset}
              className="p-2 hover:bg-gray-100 rounded text-gray-700 hover:text-gray-900 transition-colors"
              title="Reset Zoom"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
            <button
              onClick={onCenterCanvas}
              className="p-2 hover:bg-gray-100 rounded text-gray-700 hover:text-gray-900 transition-colors"
              title="Center Canvas"
            >
              <Crosshair className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile Properties Button */}
          <button
            onClick={onToggleProperties}
            className="lg:hidden p-2 hover:bg-gray-100 rounded text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              setTempWidth(canvasSize.width);
              setTempHeight(canvasSize.height);
              setShowSizeDialog(true);
            }}
            className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded transition-colors text-sm"
          >
            <Ruler className="w-4 h-4" />
            <span>
              {canvasSize.width} × {canvasSize.height}
            </span>
          </button>

          <button className="hidden md:flex px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded transition-colors items-center gap-2">
            <Save className="w-4 h-4" />
            Save
          </button>

          <button
            onClick={onExport}
            className="px-3 md:px-4 py-2 bg-[#1C75BC] hover:bg-[#155a94] text-white rounded transition-colors flex items-center gap-2 text-sm md:text-base"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded text-gray-700 hover:text-gray-900 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Page Size Dialog */}
      {showSizeDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <h2 className="text-gray-900 text-xl mb-4">Canvas Size</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-600 text-sm block mb-2">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={tempWidth}
                    onChange={(e) => setTempWidth(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-sm block mb-2">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={tempHeight}
                    onChange={(e) => setTempHeight(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-600 text-sm block mb-2">
                  Presets
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {presetSizes.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        setTempWidth(preset.width);
                        setTempHeight(preset.height);
                      }}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded transition-colors text-sm"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowSizeDialog(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSizeSubmit}
                  className="flex-1 px-4 py-2 bg-[#1C75BC] hover:bg-[#155a94] text-white rounded transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
