import { DesignObject } from "@/types/design";
import {
  Eye,
  EyeOff,
  Copy,
  Trash2,
  GripVertical,
  Lock,
  Unlock,
} from "lucide-react";

interface LayersPanelProps {
  objects: DesignObject[];
  selectedId: string | null;
  onSelectObject: (id: string) => void;
  onDeleteObject: (id: string) => void;
  onDuplicateObject: (id: string) => void;
  onReorderObjects: (fromIndex: number, toIndex: number) => void;
  onToggleLock: (id: string) => void;
}

export function LayersPanel({
  objects,
  selectedId,
  onSelectObject,
  onDeleteObject,
  onDuplicateObject,
  onReorderObjects,
  onToggleLock,
}: LayersPanelProps) {
  const getObjectName = (obj: DesignObject) => {
    if (obj.type === "text") return obj.text || "Text";
    if (obj.type === "shape") return obj.shape || "Shape";
    if (obj.type === "image") return "Image";
    return "Object";
  };

  const getObjectIcon = (obj: DesignObject) => {
    return obj.type.charAt(0).toUpperCase() + obj.type.slice(1);
  };

  return (
    <div className="h-36 md:h-48 bg-white border-t border-gray-200">
      <div className="h-full flex flex-col">
        <div className="px-4 py-2 md:py-3 border-b border-gray-200">
          <h3 className="text-gray-900 text-sm md:text-base">Layers</h3>
        </div>

        <div className="flex-1 overflow-y-auto">
          {objects.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-sm">No objects yet</p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {[...objects].reverse().map((obj, reverseIndex) => {
                const actualIndex = objects.length - 1 - reverseIndex;
                return (
                  <div
                    key={obj.id}
                    onClick={() => onSelectObject(obj.id)}
                    className={`group flex items-center gap-2 px-2 md:px-3 py-2 rounded cursor-pointer transition-colors ${
                      selectedId === obj.id
                        ? "bg-[#1C75BC] text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <GripVertical className="w-3 h-3 md:w-4 md:h-4 opacity-50 flex-shrink-0" />

                    {obj.locked && (
                      <Lock className="w-3 h-3 md:w-4 md:h-4 text-orange-500 flex-shrink-0" />
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="text-xs md:text-sm truncate">
                        {getObjectName(obj)}
                      </div>
                      <div className="text-xs opacity-60 hidden md:block">
                        {getObjectIcon(obj)}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleLock(obj.id);
                        }}
                        className={`p-1 hover:bg-gray-200 rounded ${
                          obj.locked ? "text-orange-500" : ""
                        }`}
                        title={obj.locked ? "Unlock" : "Lock"}
                      >
                        {obj.locked ? (
                          <Lock className="w-3 h-3 md:w-4 md:h-4" />
                        ) : (
                          <Unlock className="w-3 h-3 md:w-4 md:h-4" />
                        )}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDuplicateObject(obj.id);
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Duplicate"
                      >
                        <Copy className="w-3 h-3 md:w-4 md:h-4" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteObject(obj.id);
                        }}
                        className="p-1 hover:bg-gray-200 rounded text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
