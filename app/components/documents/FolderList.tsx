import React from 'react';
import { Folder } from 'lucide-react';

interface Folder {
  id: string;
  name: string;
  count: number;
}

interface FolderListProps {
  folders: Folder[];
  selectedFolder: string;
  setSelectedFolder: (id: string) => void;
}

const FolderList: React.FC<FolderListProps> = ({ folders, selectedFolder, setSelectedFolder }) => {
  return (
    <div className="w-64 border-r">
      <div className="p-4">
        <h2 className="font-medium mb-4">Folders</h2>
        <div className="space-y-1">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
              className={`w-full px-3 py-2 rounded-lg text-left flex items-center justify-between ${
                selectedFolder === folder.id
                  ? 'bg-gray-100'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Folder className="w-4 h-4 text-gray-400" />
                <span>{folder.name}</span>
              </div>
              <span className="text-sm text-gray-500">{folder.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FolderList;

