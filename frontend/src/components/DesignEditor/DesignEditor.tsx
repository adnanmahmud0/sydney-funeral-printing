/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { Toolbar } from "./Toolbar";
import { Sidebar } from "./Sidebar";
import { Canvas, CanvasHandle } from "./Canvas";
import { PropertiesPanel } from "./PropertiesPanel";
import { LayersPanel } from "./LayersPanel";
import { PagesPanel } from "./PagesPanel";
import { DesignObject, DesignPage, HistoryState } from "../types/design";
import { Menu, X } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function DesignEditor() {
  const canvasRef = useRef<CanvasHandle>(null);
  const [pages, setPages] = useState<DesignPage[]>([
    {
      id: "page-1",
      name: "Page 1",
      objects: [],
      canvasSize: { width: 1200, height: 800 },
    },
  ]);
  const [currentPageId, setCurrentPageId] = useState("page-1");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<
    "select" | "text" | "shape" | "image"
  >("select");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const [zoom, setZoom] = useState(1);

  // History for undo/redo
  const [history, setHistory] = useState<HistoryState[]>([
    { pages, currentPageId, selectedId },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const currentPage = pages.find((p) => p.id === currentPageId) || pages[0];
  const selectedObject = currentPage.objects.find(
    (obj: { id: string | null; }) => obj.id === selectedId
  );

  // Save to history
  const saveToHistory = (
    newPages: DesignPage[],
    newCurrentPageId: string,
    newSelectedId: string | null
  ) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({
      pages: newPages,
      currentPageId: newCurrentPageId,
      selectedId: newSelectedId,
    });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const state = history[newIndex];
      setPages(state.pages);
      setCurrentPageId(state.currentPageId);
      setSelectedId(state.selectedId);
      setHistoryIndex(newIndex);
    }
  };

  // Redo
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const state = history[newIndex];
      setPages(state.pages);
      setCurrentPageId(state.currentPageId);
      setSelectedId(state.selectedId);
      setHistoryIndex(newIndex);
    }
  };

  const addPage = () => {
    const newPage: DesignPage = {
      id: `page-${Date.now()}`,
      name: `Page ${pages.length + 1}`,
      objects: [],
      canvasSize: { width: 1200, height: 800 },
    };
    const newPages = [...pages, newPage];
    setPages(newPages);
    setCurrentPageId(newPage.id);
    setSelectedId(null);
    saveToHistory(newPages, newPage.id, null);
  };

  const deletePage = (pageId: string) => {
    if (pages.length === 1) return;
    const newPages = pages.filter((p) => p.id !== pageId);
    const newCurrentPageId =
      currentPageId === pageId ? newPages[0].id : currentPageId;
    setPages(newPages);
    setCurrentPageId(newCurrentPageId);
    setSelectedId(null);
    saveToHistory(newPages, newCurrentPageId, null);
  };

  const updatePageName = (pageId: string, name: string) => {
    const newPages = pages.map((p) => (p.id === pageId ? { ...p, name } : p));
    setPages(newPages);
    saveToHistory(newPages, currentPageId, selectedId);
  };

  const updatePageSize = (width: number, height: number) => {
    const newPages = pages.map((p) =>
      p.id === currentPageId ? { ...p, canvasSize: { width, height } } : p
    );
    setPages(newPages);
    saveToHistory(newPages, currentPageId, selectedId);
  };

  const addObject = (object: DesignObject) => {
    const newPages = pages.map((p) =>
      p.id === currentPageId ? { ...p, objects: [...p.objects, object] } : p
    );
    setPages(newPages);
    setSelectedId(object.id);
    saveToHistory(newPages, currentPageId, object.id);
  };

  const updateObject = (id: string, updates: Partial<DesignObject>) => {
    const newPages = pages.map((p) =>
      p.id === currentPageId
        ? {
            ...p,
            objects: p.objects.map((obj: { id: string; }) =>
              obj.id === id ? { ...obj, ...updates } : obj
            ),
          }
        : p
    );
    setPages(newPages);
    saveToHistory(newPages, currentPageId, selectedId);
  };

  const deleteObject = (id: string) => {
    const newPages = pages.map((p) =>
      p.id === currentPageId
        ? { ...p, objects: p.objects.filter((obj: { id: string; }) => obj.id !== id) }
        : p
    );
    setPages(newPages);
    const newSelectedId = selectedId === id ? null : selectedId;
    setSelectedId(newSelectedId);
    saveToHistory(newPages, currentPageId, newSelectedId);
  };

  const duplicateObject = (id: string) => {
    const obj = currentPage.objects.find((o: { id: string; }) => o.id === id);
    if (obj) {
      const newObj = {
        ...obj,
        id: `obj-${Date.now()}`,
        x: obj.x + 20,
        y: obj.y + 20,
      };
      addObject(newObj);
    }
  };

  const reorderObjects = (fromIndex: number, toIndex: number) => {
    const newPages = pages.map((p) => {
      if (p.id === currentPageId) {
        const newObjects = [...p.objects];
        const [removed] = newObjects.splice(fromIndex, 1);
        newObjects.splice(toIndex, 0, removed);
        return { ...p, objects: newObjects };
      }
      return p;
    });
    setPages(newPages);
    saveToHistory(newPages, currentPageId, selectedId);
  };

  const toggleLock = (id: string) => {
    const newPages = pages.map((p) =>
      p.id === currentPageId
        ? {
            ...p,
            objects: p.objects.map((obj: { id: string; locked: any; }) =>
              obj.id === id ? { ...obj, locked: !obj.locked } : obj
            ),
          }
        : p
    );
    setPages(newPages);
    saveToHistory(newPages, currentPageId, selectedId);
  };

  const handleEditImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Get the image's actual dimensions
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;

        // Create the image object that fills the canvas
        const imageObject: DesignObject = {
          id: `obj-${Date.now()}`,
          type: "image",
          x: 0,
          y: 0,
          width: imgWidth,
          height: imgHeight,
          rotation: 0,
          opacity: 1,
          imageUrl: e.target?.result as string,
        };

        // Replace the current page with a new page containing only this image
        // Update the canvas size to match the image dimensions
        const newPages = pages.map((p) =>
          p.id === currentPageId
            ? {
                ...p,
                objects: [imageObject],
                canvasSize: { width: imgWidth, height: imgHeight },
              }
            : p
        );

        setPages(newPages);
        setSelectedId(imageObject.id);
        saveToHistory(newPages, currentPageId, imageObject.id);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Zoom handlers
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 3)); // Max 300%
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.1)); // Min 10%
  };

  const handleZoomReset = () => {
    setZoom(1);
  };

  const handleCenterCanvas = () => {
    canvasRef.current?.centerCanvas();
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Zoom shortcuts: Cmd/Ctrl + Plus/Minus
      if ((e.metaKey || e.ctrlKey) && (e.key === "=" || e.key === "+")) {
        e.preventDefault();
        handleZoomIn();
      } else if ((e.metaKey || e.ctrlKey) && (e.key === "-" || e.key === "_")) {
        e.preventDefault();
        handleZoomOut();
      } else if ((e.metaKey || e.ctrlKey) && e.key === "0") {
        e.preventDefault();
        handleZoomReset();
      }
      // Undo/Redo shortcuts
      else if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (
        (e.metaKey || e.ctrlKey) &&
        (e.key === "y" || (e.key === "z" && e.shiftKey))
      ) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [historyIndex, history, zoom]);

  // Export to PDF
  const handleExportPDF = async () => {
    try {
      // Create a temporary container for rendering
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "fixed";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "0";
      tempContainer.style.pointerEvents = "none";
      document.body.appendChild(tempContainer);

      const pdf = new jsPDF({
        orientation:
          currentPage.canvasSize.width > currentPage.canvasSize.height
            ? "landscape"
            : "portrait",
        unit: "px",
        format: [currentPage.canvasSize.width, currentPage.canvasSize.height],
      });

      // Process all pages
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];

        // Create canvas element for this page
        const pageElement = document.createElement("div");
        pageElement.style.width = `${page.canvasSize.width}px`;
        pageElement.style.height = `${page.canvasSize.height}px`;
        pageElement.style.position = "relative";
        pageElement.style.backgroundColor = "#ffffff";
        pageElement.style.margin = "0";
        pageElement.style.padding = "0";

        // Render all objects on this page
        page.objects.forEach((obj: { x: any; y: any; width: any; height: any; rotation: any; opacity: any; blur: any; type: string; fontSize: any; fontFamily: string; fontWeight: any; textAlign: string; color: string; text: string; fill: string; strokeWidth: any; stroke: any; shape: string; cornerRadius: any; backgroundImage: any; backgroundPosition: { x: any; y: any; }; backgroundScale: any; imageUrl: string; }) => {
          const objElement = document.createElement("div");
          objElement.style.position = "absolute";
          objElement.style.left = `${obj.x}px`;
          objElement.style.top = `${obj.y}px`;
          objElement.style.width = `${obj.width}px`;
          objElement.style.height = `${obj.height}px`;
          objElement.style.transform = `rotate(${obj.rotation}deg)`;
          objElement.style.opacity = `${obj.opacity}`;
          objElement.style.transformOrigin = "center center";
          objElement.style.boxSizing = "border-box";
          if (obj.blur) objElement.style.filter = `blur(${obj.blur}px)`;

          if (obj.type === "text") {
            objElement.style.fontSize = `${obj.fontSize}px`;
            objElement.style.fontFamily = obj.fontFamily || "Arial, sans-serif";
            objElement.style.fontWeight = `${obj.fontWeight || 400}`;
            objElement.style.textAlign = obj.textAlign || "left";
            objElement.style.color = obj.color || "#000000";
            objElement.style.overflow = "hidden";
            objElement.style.wordWrap = "break-word";
            objElement.style.lineHeight = "1.2";
            objElement.style.whiteSpace = "pre-wrap";
            objElement.textContent = obj.text || "";
          } else if (obj.type === "shape") {
            objElement.style.backgroundColor = obj.fill || "#cccccc";
            objElement.style.border = `${obj.strokeWidth || 0}px solid ${
              obj.stroke || "#000000"
            }`;
            if (obj.shape === "rectangle") {
              objElement.style.borderRadius = `${obj.cornerRadius || 0}px`;
            } else if (obj.shape === "circle") {
              objElement.style.borderRadius = "50%";
            }
            if (obj.backgroundImage) {
              objElement.style.backgroundImage = `url(${obj.backgroundImage})`;
              objElement.style.backgroundPosition = `${
                obj.backgroundPosition?.x || 50
              }% ${obj.backgroundPosition?.y || 50}%`;
              objElement.style.backgroundSize = `${
                (obj.backgroundScale || 1) * 100
              }%`;
              objElement.style.backgroundRepeat = "no-repeat";
            }
          } else if (obj.type === "image" && obj.imageUrl) {
            const img = document.createElement("img");
            img.src = obj.imageUrl;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "contain";
            img.style.display = "block";
            objElement.appendChild(img);
          }

          pageElement.appendChild(objElement);
        });

        tempContainer.appendChild(pageElement);

        // Wait for images to load
        await new Promise((resolve) => {
          const images = pageElement.getElementsByTagName("img");
          if (images.length === 0) {
            resolve(null);
            return;
          }

          let loadedCount = 0;
          const checkAllLoaded = () => {
            loadedCount++;
            if (loadedCount === images.length) {
              resolve(null);
            }
          };

          Array.from(images).forEach((img) => {
            if (img.complete) {
              checkAllLoaded();
            } else {
              img.onload = checkAllLoaded;
              img.onerror = checkAllLoaded;
            }
          });
        });

        // Convert to canvas and add to PDF
        const canvas = await html2canvas(pageElement, {
          width: page.canvasSize.width,
          height: page.canvasSize.height,
          scale: 2, // Higher quality
          backgroundColor: "#ffffff",
          logging: false,
          useCORS: true,
          allowTaint: true,
          imageTimeout: 0,
          removeContainer: false,
        });

        const imgData = canvas.toDataURL("image/png");

        if (i > 0) {
          pdf.addPage(
            [page.canvasSize.width, page.canvasSize.height],
            page.canvasSize.width > page.canvasSize.height
              ? "landscape"
              : "portrait"
          );
        }

        pdf.addImage(
          imgData,
          "PNG",
          0,
          0,
          page.canvasSize.width,
          page.canvasSize.height
        );

        tempContainer.removeChild(pageElement);
      }

      // Clean up and download
      document.body.removeChild(tempContainer);
      pdf.save("design.pdf");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#E8F1F8]">
      <Toolbar
        canvasSize={currentPage.canvasSize}
        onExport={handleExportPDF}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
        onToggleProperties={() => setShowProperties(!showProperties)}
        onUndo={undo}
        onRedo={redo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUpdatePageSize={updatePageSize}
        onEditImage={handleEditImage}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
        onCenterCanvas={handleCenterCanvas}
        zoom={zoom}
        onClose={() => {
          if (
            confirm(
              "Are you sure you want to close? Any unsaved changes will be lost."
            )
          ) {
            // Reset to initial state
            setPages([
              {
                id: "page-1",
                name: "Page 1",
                objects: [],
                canvasSize: { width: 1200, height: 800 },
              },
            ]);
            setCurrentPageId("page-1");
            setSelectedId(null);
            setHistory([
              { pages: [], currentPageId: "page-1", selectedId: null },
            ]);
            setHistoryIndex(0);
          }
        }}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          fixed lg:relative z-50 lg:z-0
          w-64 h-full
          transform transition-transform duration-300 ease-in-out
          ${
            showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
        >
          <div className="lg:hidden absolute top-4 right-4">
            <button
              onClick={() => setShowSidebar(false)}
              className="p-2 text-gray-700 hover:bg-white/50 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <Sidebar
            activeTool={activeTool}
            onToolChange={setActiveTool}
            onAddObject={addObject}
          />
        </div>

        <Canvas
          ref={canvasRef}
          objects={currentPage.objects}
          selectedId={selectedId}
          activeTool={activeTool}
          canvasSize={currentPage.canvasSize}
          onSelectObject={setSelectedId}
          onUpdateObject={updateObject}
          onAddObject={addObject}
          zoom={zoom}
          onZoomChange={setZoom}
        />

        {/* Mobile Properties Overlay */}
        {showProperties && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setShowProperties(false)}
          />
        )}

        {/* Properties Panel */}
        <div
          className={`
          fixed lg:relative z-50 lg:z-0 right-0
          w-80 h-full
          transform transition-transform duration-300 ease-in-out
          ${
            showProperties
              ? "translate-x-0"
              : "translate-x-full lg:translate-x-0"
          }
        `}
        >
          <div className="lg:hidden absolute top-4 left-4">
            <button
              onClick={() => setShowProperties(false)}
              className="p-2 text-white hover:bg-[#3a3a3a] rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <PropertiesPanel
            selectedObject={selectedObject}
            onUpdate={(updates) =>
              selectedId && updateObject(selectedId, updates)
            }
            canvasSize={currentPage.canvasSize}
          />
        </div>
      </div>

      {/* Pages Panel - Hidden on mobile, shown on desktop */}
      <div className="hidden md:block">
        <PagesPanel
          pages={pages}
          currentPageId={currentPageId}
          onSelectPage={setCurrentPageId}
          onAddPage={addPage}
          onDeletePage={deletePage}
          onUpdatePageName={updatePageName}
        />
      </div>

      {/* Layers Panel */}
      <LayersPanel
        objects={currentPage.objects}
        selectedId={selectedId}
        onSelectObject={setSelectedId}
        onDeleteObject={deleteObject}
        onDuplicateObject={duplicateObject}
        onReorderObjects={reorderObjects}
        onToggleLock={toggleLock}
      />
    </div>
  );
}
