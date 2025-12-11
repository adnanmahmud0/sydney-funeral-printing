/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { DesignObject } from "@/types/design";
import { CanvasObject } from "./CanvasObject";

interface CanvasProps {
  objects: DesignObject[];
  selectedId: string | null;
  activeTool: string;
  canvasSize: { width: number; height: number };
  onSelectObject: (id: string | null) => void;
  onUpdateObject: (id: string, updates: Partial<DesignObject>) => void;
  onAddObject: (object: DesignObject) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export interface CanvasHandle {
  centerCanvas: () => void;
}

export const Canvas = forwardRef<CanvasHandle, CanvasProps>(
  (
    {
      objects,
      selectedId,
      activeTool,
      canvasSize,
      onSelectObject,
      onUpdateObject,
      onAddObject,
      zoom,
      onZoomChange,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [dragPreview, setDragPreview] = useState<{
      x: number;
      y: number;
    } | null>(null);

    // Mouse wheel zoom
    useEffect(() => {
      const handleWheel = (e: WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          const delta = -e.deltaY;
          const zoomFactor = delta > 0 ? 0.1 : -0.1;
          const newZoom = Math.min(Math.max(zoom + zoomFactor, 0.1), 3);
          onZoomChange(newZoom);
        }
      };

      const container = containerRef.current;
      if (container) {
        container.addEventListener("wheel", handleWheel, {
          passive: false,
        });
        return () => container.removeEventListener("wheel", handleWheel);
      }
    }, [zoom, onZoomChange]);

    const handleMouseDown = (e: React.MouseEvent) => {
      if (activeTool === "text" && e.target === canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / zoom;
        const y = (e.clientY - rect.top) / zoom;
        setDragStart({ x, y });
        setDragPreview({ x, y });
        setIsDragging(true);
      }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (isDragging && activeTool === "text" && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / zoom;
        const y = (e.clientY - rect.top) / zoom;
        setDragPreview({ x, y });
      }
    };

    const handleMouseUp = (e: React.MouseEvent) => {
      if (
        isDragging &&
        activeTool === "text" &&
        dragPreview &&
        canvasRef.current
      ) {
        const width = Math.abs(dragPreview.x - dragStart.x);
        const height = Math.abs(dragPreview.y - dragStart.y);

        // Only create text box if drag is significant (at least 50x30 pixels)
        if (width > 50 && height > 30) {
          const x = Math.min(dragStart.x, dragPreview.x);
          const y = Math.min(dragStart.y, dragPreview.y);

          const newText: DesignObject = {
            id: `text-${Date.now()}`,
            type: "text",
            x,
            y,
            width,
            height,
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
        }

        setIsDragging(false);
        setDragPreview(null);
      }
    };

    const handleCanvasClick = (e: React.MouseEvent) => {
      if (e.target === canvasRef.current) {
        onSelectObject(null);
      }
    };

    // Cutout marks (bleed marks)
    const renderCutoutMarks = () => {
      const markLength = 20;
      const inset = 10; // Distance from the edge inside the page

      return (
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{
            width: `${canvasSize.width}px`,
            height: `${canvasSize.height}px`,
            overflow: "visible",
          }}
        >
          {/* Top-left corner */}
          <line
            x1={inset}
            y1={inset}
            x2={inset + markLength}
            y2={inset}
            stroke="#ff0000"
            strokeWidth="1"
          />
          <line
            x1={inset}
            y1={inset}
            x2={inset}
            y2={inset + markLength}
            stroke="#ff0000"
            strokeWidth="1"
          />

          {/* Top-right corner */}
          <line
            x1={canvasSize.width - inset}
            y1={inset}
            x2={canvasSize.width - inset - markLength}
            y2={inset}
            stroke="#ff0000"
            strokeWidth="1"
          />
          <line
            x1={canvasSize.width - inset}
            y1={inset}
            x2={canvasSize.width - inset}
            y2={inset + markLength}
            stroke="#ff0000"
            strokeWidth="1"
          />

          {/* Bottom-left corner */}
          <line
            x1={inset}
            y1={canvasSize.height - inset}
            x2={inset + markLength}
            y2={canvasSize.height - inset}
            stroke="#ff0000"
            strokeWidth="1"
          />
          <line
            x1={inset}
            y1={canvasSize.height - inset}
            x2={inset}
            y2={canvasSize.height - inset - markLength}
            stroke="#ff0000"
            strokeWidth="1"
          />

          {/* Bottom-right corner */}
          <line
            x1={canvasSize.width - inset}
            y1={canvasSize.height - inset}
            x2={canvasSize.width - inset - markLength}
            y2={canvasSize.height - inset}
            stroke="#ff0000"
            strokeWidth="1"
          />
          <line
            x1={canvasSize.width - inset}
            y1={canvasSize.height - inset}
            x2={canvasSize.width - inset}
            y2={canvasSize.height - inset - markLength}
            stroke="#ff0000"
            strokeWidth="1"
          />

          {/* Corner dots */}
          <circle cx={inset} cy={inset} r="2" fill="#ff0000" />
          <circle
            cx={canvasSize.width - inset}
            cy={inset}
            r="2"
            fill="#ff0000"
          />
          <circle
            cx={inset}
            cy={canvasSize.height - inset}
            r="2"
            fill="#ff0000"
          />
          <circle
            cx={canvasSize.width - inset}
            cy={canvasSize.height - inset}
            r="2"
            fill="#ff0000"
          />
        </svg>
      );
    };

    // Calculate the total size needed for the scaled canvas plus padding
    const paddingSize = 1000; // Extra padding around canvas to ensure content is scrollable
    const scaledWidth = canvasSize.width * zoom;
    const scaledHeight = canvasSize.height * zoom;
    const totalWidth = scaledWidth + paddingSize * 2;
    const totalHeight = scaledHeight + paddingSize * 2;

    // Center the canvas
    const centerCanvas = () => {
      const container = containerRef.current;
      if (container) {
        // Recalculate scaled dimensions to ensure we use current zoom
        const currentScaledWidth = canvasSize.width * zoom;
        const currentScaledHeight = canvasSize.height * zoom;

        // Calculate the center position of the canvas in the scroll area
        const canvasCenterX = paddingSize + currentScaledWidth / 2;
        const canvasCenterY = paddingSize + currentScaledHeight / 2;

        // Calculate scroll position to center the canvas in viewport
        const scrollLeft = canvasCenterX - container.clientWidth / 2;
        const scrollTop = canvasCenterY - container.clientHeight / 2;

        container.scrollTo({
          left: scrollLeft,
          top: scrollTop,
          behavior: "smooth",
        });
      }
    };

    useImperativeHandle(ref, () => ({
      centerCanvas,
    }));

    // Auto-center canvas on mount and when canvas size changes (but not on zoom)
    useEffect(() => {
      // Use a small timeout to ensure the container has rendered
      const timer = setTimeout(() => {
        centerCanvas();
      }, 100);

      return () => clearTimeout(timer);
    }, [canvasSize.width, canvasSize.height]);

    return (
      <div ref={containerRef} className="flex-1 bg-[#1a1a1a] overflow-auto">
        <div
          className="relative"
          style={{
            width: `${totalWidth}px`,
            height: `${totalHeight}px`,
            minWidth: "100%",
            minHeight: "100%",
          }}
        >
          <div
            className="relative"
            style={{
              width: `${scaledWidth}px`,
              height: `${scaledHeight}px`,
              marginLeft: `${paddingSize}px`,
              marginTop: `${paddingSize}px`,
            }}
          >
            <div
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="bg-white relative shadow-2xl"
              style={{
                width: `${canvasSize.width}px`,
                height: `${canvasSize.height}px`,
                transform: `scale(${zoom})`,
                transformOrigin: "center center",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {objects.map((obj) => (
                <CanvasObject
                  key={obj.id}
                  object={obj}
                  isSelected={obj.id === selectedId}
                  onSelect={() => onSelectObject(obj.id)}
                  onUpdate={(updates) => onUpdateObject(obj.id, updates)}
                  zoom={zoom}
                />
              ))}

              {/* Drag preview for text tool */}
              {isDragging && dragPreview && activeTool === "text" && (
                <div
                  className="absolute border-2 border-[#1C75BC] border-dashed bg-[#1C75BC]/10 pointer-events-none"
                  style={{
                    left: `${Math.min(dragStart.x, dragPreview.x)}px`,
                    top: `${Math.min(dragStart.y, dragPreview.y)}px`,
                    width: `${Math.abs(dragPreview.x - dragStart.x)}px`,
                    height: `${Math.abs(dragPreview.y - dragStart.y)}px`,
                  }}
                />
              )}

              {renderCutoutMarks()}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Canvas.displayName = "Canvas";
