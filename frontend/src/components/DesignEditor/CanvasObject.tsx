import { useRef, useState, useEffect } from 'react';
import { DesignObject } from "@/types/design";
import { Lock } from 'lucide-react';

interface CanvasObjectProps {
  object: DesignObject;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<DesignObject>) => void;
}

export function CanvasObject({ object, isSelected, onSelect, onUpdate }: CanvasObjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>('');
  const [isRotating, setIsRotating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(object.text || '');
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, objX: 0, objY: 0, objWidth: 0, objHeight: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        onUpdate({
          x: dragStart.objX + dx,
          y: dragStart.objY + dy
        });
      } else if (isResizing) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        const aspectRatio = dragStart.objWidth / dragStart.objHeight;
        
        switch (resizeDirection) {
          case 'nw': {
            // For top-left: dragging left/up increases size, right/down decreases size
            const delta = Math.max(Math.abs(dx), Math.abs(dy)) * (dx > 0 || dy > 0 ? -1 : 1);
            const newWidth = Math.max(20, dragStart.objWidth + delta);
            const newHeight = newWidth / aspectRatio;
            onUpdate({
              x: dragStart.objX - (newWidth - dragStart.objWidth),
              y: dragStart.objY - (newHeight - dragStart.objHeight),
              width: newWidth,
              height: newHeight
            });
            break;
          }
          case 'ne': {
            // For top-right: dragging right/up increases size, left/down decreases size
            const delta = Math.max(Math.abs(dx), Math.abs(dy)) * (dx > 0 || dy < 0 ? 1 : -1);
            const newWidth = Math.max(20, dragStart.objWidth + delta);
            const newHeight = newWidth / aspectRatio;
            onUpdate({
              y: dragStart.objY - (newHeight - dragStart.objHeight),
              width: newWidth,
              height: newHeight
            });
            break;
          }
          case 'sw': {
            // For bottom-left: dragging left/down increases size, right/up decreases size
            const delta = Math.max(Math.abs(dx), Math.abs(dy)) * (dx > 0 || dy < 0 ? -1 : 1);
            const newWidth = Math.max(20, dragStart.objWidth + delta);
            const newHeight = newWidth / aspectRatio;
            onUpdate({
              x: dragStart.objX - (newWidth - dragStart.objWidth),
              width: newWidth,
              height: newHeight
            });
            break;
          }
          case 'se': {
            // For bottom-right: dragging right/down increases size, left/up decreases size
            const delta = Math.max(Math.abs(dx), Math.abs(dy)) * (dx > 0 || dy > 0 ? 1 : -1);
            const newWidth = Math.max(20, dragStart.objWidth + delta);
            const newHeight = newWidth / aspectRatio;
            onUpdate({
              width: newWidth,
              height: newHeight
            });
            break;
          }
          case 'n':
            onUpdate({
              y: dragStart.objY + dy,
              height: Math.max(20, dragStart.objHeight - dy)
            });
            break;
          case 's':
            onUpdate({
              height: Math.max(20, dragStart.objHeight + dy)
            });
            break;
          case 'e':
            onUpdate({
              width: Math.max(20, dragStart.objWidth + dx)
            });
            break;
          case 'w':
            onUpdate({
              x: dragStart.objX + dx,
              width: Math.max(20, dragStart.objWidth - dx)
            });
            break;
        }
      } else if (isRotating) {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
          onUpdate({ rotation: (angle * 180 / Math.PI) + 90 });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setIsRotating(false);
    };

    if (isDragging || isResizing || isRotating) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, isRotating, dragStart, object]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    if (object.locked) return; // Prevent dragging if locked
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      objX: object.x,
      objY: object.y
    });
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    if (object.locked) return; // Prevent resizing if locked
    setIsResizing(true);
    setResizeDirection(direction);
    setDragStart({ x: e.clientX, y: e.clientY, objX: object.x, objY: object.y, objWidth: object.width, objHeight: object.height });
  };

  const handleRotateStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (object.locked) return; // Prevent rotating if locked
    setIsRotating(true);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (object.locked) return; // Prevent editing if locked
    if (object.type === 'text') {
      setIsEditing(true);
      setEditText(object.text || '');
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value);
  };

  const handleTextBlur = () => {
    setIsEditing(false);
    onUpdate({ text: editText });
  };

  const renderShape = () => {
    const style: React.CSSProperties = {
      width: '100%',
      height: '100%',
      fill: object.fill,
      stroke: object.stroke,
      strokeWidth: object.strokeWidth
    };

    const hasBackgroundImage = object.backgroundImage;

    switch (object.shape) {
      case 'rectangle':
        return (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {hasBackgroundImage && (
              <defs>
                <pattern id={`pattern-${object.id}`} patternUnits="objectBoundingBox" width="1" height="1">
                  <image
                    href={object.backgroundImage}
                    x={((object.backgroundPosition?.x || 50) - 50) * 2 + '%'}
                    y={((object.backgroundPosition?.y || 50) - 50) * 2 + '%'}
                    width={100 * (object.backgroundScale || 1) + '%'}
                    height={100 * (object.backgroundScale || 1) + '%'}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>
              </defs>
            )}
            <rect
              x={object.strokeWidth || 0}
              y={object.strokeWidth || 0}
              width={object.width - (object.strokeWidth || 0) * 2}
              height={object.height - (object.strokeWidth || 0) * 2}
              rx={object.cornerRadius || 0}
              fill={hasBackgroundImage ? `url(#pattern-${object.id})` : object.fill}
              stroke={object.stroke}
              strokeWidth={object.strokeWidth}
            />
          </svg>
        );
      case 'circle':
        return (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {hasBackgroundImage && (
              <defs>
                <pattern id={`pattern-${object.id}`} patternUnits="objectBoundingBox" width="1" height="1">
                  <image
                    href={object.backgroundImage}
                    x={((object.backgroundPosition?.x || 50) - 50) * 2 + '%'}
                    y={((object.backgroundPosition?.y || 50) - 50) * 2 + '%'}
                    width={100 * (object.backgroundScale || 1) + '%'}
                    height={100 * (object.backgroundScale || 1) + '%'}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>
              </defs>
            )}
            <ellipse
              cx={object.width / 2}
              cy={object.height / 2}
              rx={object.width / 2 - (object.strokeWidth || 0)}
              ry={object.height / 2 - (object.strokeWidth || 0)}
              fill={hasBackgroundImage ? `url(#pattern-${object.id})` : object.fill}
              stroke={object.stroke}
              strokeWidth={object.strokeWidth}
            />
          </svg>
        );
      case 'triangle':
        return (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {hasBackgroundImage && (
              <defs>
                <pattern id={`pattern-${object.id}`} patternUnits="objectBoundingBox" width="1" height="1">
                  <image
                    href={object.backgroundImage}
                    x={((object.backgroundPosition?.x || 50) - 50) * 2 + '%'}
                    y={((object.backgroundPosition?.y || 50) - 50) * 2 + '%'}
                    width={100 * (object.backgroundScale || 1) + '%'}
                    height={100 * (object.backgroundScale || 1) + '%'}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>
              </defs>
            )}
            <polygon
              points={`${object.width / 2},${object.strokeWidth || 0} ${object.width - (object.strokeWidth || 0)},${object.height - (object.strokeWidth || 0)} ${object.strokeWidth || 0},${object.height - (object.strokeWidth || 0)}`}
              fill={hasBackgroundImage ? `url(#pattern-${object.id})` : object.fill}
              stroke={object.stroke}
              strokeWidth={object.strokeWidth}
            />
          </svg>
        );
      case 'star':
        const cx = object.width / 2;
        const cy = object.height / 2;
        const outerRadius = Math.min(object.width, object.height) / 2 - (object.strokeWidth || 0);
        const innerRadius = outerRadius * 0.4;
        const points = [];
        for (let i = 0; i < 10; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / 5 - Math.PI / 2;
          points.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`);
        }
        return (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {hasBackgroundImage && (
              <defs>
                <pattern id={`pattern-${object.id}`} patternUnits="objectBoundingBox" width="1" height="1">
                  <image
                    href={object.backgroundImage}
                    x={((object.backgroundPosition?.x || 50) - 50) * 2 + '%'}
                    y={((object.backgroundPosition?.y || 50) - 50) * 2 + '%'}
                    width={100 * (object.backgroundScale || 1) + '%'}
                    height={100 * (object.backgroundScale || 1) + '%'}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>
              </defs>
            )}
            <polygon 
              points={points.join(' ')} 
              fill={hasBackgroundImage ? `url(#pattern-${object.id})` : object.fill}
              stroke={object.stroke}
              strokeWidth={object.strokeWidth}
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const objectStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${object.x}px`,
    top: `${object.y}px`,
    width: `${object.width}px`,
    height: `${object.height}px`,
    transform: `rotate(${object.rotation}deg)`,
    opacity: object.opacity,
    cursor: object.locked ? 'not-allowed' : (isDragging ? 'grabbing' : 'grab'),
    filter: object.blur ? `blur(${object.blur}px)` : undefined
  };

  return (
    <div
      ref={ref}
      style={objectStyle}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      className="select-none"
    >
      {object.type === 'text' && (
        isEditing ? (
          <textarea
            value={editText}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            autoFocus
            className="w-full h-full resize-none border-2 border-blue-500 bg-transparent outline-none p-1"
            style={{
              fontSize: `${object.fontSize}px`,
              fontFamily: object.fontFamily,
              fontWeight: object.fontWeight,
              textAlign: object.textAlign,
              color: object.color
            }}
          />
        ) : (
          <div
            className="w-full h-full break-words"
            style={{
              fontSize: `${object.fontSize}px`,
              fontFamily: object.fontFamily,
              fontWeight: object.fontWeight,
              textAlign: object.textAlign,
              color: object.color
            }}
          >
            {object.text}
          </div>
        )
      )}

      {object.type === 'shape' && renderShape()}

      {object.type === 'image' && object.imageUrl && (
        <img
          src={object.imageUrl}
          alt="Uploaded"
          className="w-full h-full object-cover"
          draggable={false}
        />
      )}

      {isSelected && !isEditing && (
        <>
          <div className={`absolute inset-0 border-2 pointer-events-none ${object.locked ? 'border-orange-500' : 'border-[#1C75BC]'}`} />
          
          {!object.locked && (
            <>
              {/* Corner handles */}
              <div
                onMouseDown={(e) => handleResizeStart(e, 'nw')}
                className="absolute -left-1 -top-1 w-3 h-3 bg-[#1C75BC] border-2 border-white rounded-full cursor-nwse-resize"
                style={{ pointerEvents: 'auto' }}
              />
              
              <div
                onMouseDown={(e) => handleResizeStart(e, 'ne')}
                className="absolute -right-1 -top-1 w-3 h-3 bg-[#1C75BC] border-2 border-white rounded-full cursor-nesw-resize"
                style={{ pointerEvents: 'auto' }}
              />
              
              <div
                onMouseDown={(e) => handleResizeStart(e, 'sw')}
                className="absolute -left-1 -bottom-1 w-3 h-3 bg-[#1C75BC] border-2 border-white rounded-full cursor-nesw-resize"
                style={{ pointerEvents: 'auto' }}
              />
              
              <div
                onMouseDown={(e) => handleResizeStart(e, 'se')}
                className="absolute -right-1 -bottom-1 w-3 h-3 bg-[#1C75BC] border-2 border-white rounded-full cursor-nwse-resize"
                style={{ pointerEvents: 'auto' }}
              />
              
              {/* Edge handles */}
              <div
                onMouseDown={(e) => handleResizeStart(e, 'n')}
                className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 bg-[#1C75BC] border-2 border-white rounded-full cursor-ns-resize"
                style={{ pointerEvents: 'auto' }}
              />
              
              <div
                onMouseDown={(e) => handleResizeStart(e, 's')}
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-3 h-3 bg-[#1C75BC] border-2 border-white rounded-full cursor-ns-resize"
                style={{ pointerEvents: 'auto' }}
              />
              
              <div
                onMouseDown={(e) => handleResizeStart(e, 'e')}
                className="absolute top-1/2 -translate-y-1/2 -right-1 w-3 h-3 bg-[#1C75BC] border-2 border-white rounded-full cursor-ew-resize"
                style={{ pointerEvents: 'auto' }}
              />
              
              <div
                onMouseDown={(e) => handleResizeStart(e, 'w')}
                className="absolute top-1/2 -translate-y-1/2 -left-1 w-3 h-3 bg-[#1C75BC] border-2 border-white rounded-full cursor-ew-resize"
                style={{ pointerEvents: 'auto' }}
              />
              
              {/* Rotate handle */}
              <div
                onMouseDown={handleRotateStart}
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-3 h-3 bg-green-500 border-2 border-white rounded-full cursor-grab"
                style={{ pointerEvents: 'auto' }}
              />
            </>
          )}

          {object.locked && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1 pointer-events-none">
              <Lock className="w-3 h-3" />
              <span>Locked</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}