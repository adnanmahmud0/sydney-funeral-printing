import { useState } from 'react';
import { DesignPage } from "@/types/design";
import { Plus, Trash2, FileText, MoreVertical } from 'lucide-react';

interface PagesPanelProps {
  pages: DesignPage[];
  currentPageId: string;
  onSelectPage: (pageId: string) => void;
  onAddPage: () => void;
  onDeletePage: (pageId: string) => void;
  onUpdatePageName: (pageId: string, name: string) => void;
}

export function PagesPanel({
  pages,
  currentPageId,
  onSelectPage,
  onAddPage,
  onDeletePage,
  onUpdatePageName
}: PagesPanelProps) {
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleStartEdit = (page: DesignPage) => {
    setEditingPageId(page.id);
    setEditName(page.name);
  };

  const handleFinishEdit = () => {
    if (editingPageId && editName.trim()) {
      onUpdatePageName(editingPageId, editName.trim());
    }
    setEditingPageId(null);
  };

  return (
    <div className="h-20 bg-white border-t border-gray-200">
      <div className="h-full flex items-center gap-3 px-4 overflow-x-auto">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm whitespace-nowrap">Pages:</span>
          <button
            onClick={onAddPage}
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded transition-colors flex items-center gap-2"
            title="Add Page"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 flex-1 overflow-x-auto">
          {pages.map((page, index) => (
            <div
              key={page.id}
              className={`group relative flex items-center gap-2 px-4 py-2 rounded cursor-pointer transition-colors min-w-[120px] ${
                currentPageId === page.id
                  ? 'bg-[#1C75BC] text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              onClick={() => onSelectPage(page.id)}
            >
              <FileText className="w-4 h-4 flex-shrink-0" />
              
              {editingPageId === page.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={handleFinishEdit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleFinishEdit();
                    if (e.key === 'Escape') setEditingPageId(null);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                  className="flex-1 bg-white border border-gray-200 px-2 py-1 rounded text-sm outline-none text-gray-900"
                />
              ) : (
                <span 
                  className="text-sm truncate flex-1"
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    handleStartEdit(page);
                  }}
                >
                  {page.name}
                </span>
              )}

              {pages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePage(page.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-opacity"
                  title="Delete Page"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}

              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#1C75BC]" 
                style={{ opacity: currentPageId === page.id ? 1 : 0 }} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}