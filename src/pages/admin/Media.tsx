import React, { useState } from 'react';
import { Image, Upload, Trash2, Check } from 'lucide-react';

interface MediaItem {
  id: string;
  url: string;
  name: string;
  uploadDate: string;
  size: number;
}

export default function MediaManager() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('http://localhost:3000/api/admin/media/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const newMedia = await response.json();
      setMediaItems(prev => [...prev, ...newMedia]);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch('http://localhost:3000/api/admin/media/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ids: selectedItems })
      });

      setMediaItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif italic">Gestionnaire de médias</h1>
        
        <div className="flex gap-4">
          {selectedItems.length > 0 && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              <Trash2 className="w-4 h-4" />
              Supprimer ({selectedItems.length})
            </button>
          )}
          
          <label className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition cursor-pointer">
            <Upload className="w-4 h-4" />
            Ajouter des images
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {uploading && (
        <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-md">
          Upload en cours...
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className={`relative group rounded-lg overflow-hidden border-2 ${
              selectedItems.includes(item.id) ? 'border-rose-500' : 'border-transparent'
            }`}
            onClick={() => toggleSelect(item.id)}
          >
            <img
              src={item.url}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            
            {selectedItems.includes(item.id) && (
              <div className="absolute top-2 right-2">
                <Check className="w-5 h-5 text-rose-500" />
              </div>
            )}

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
              <p className="text-white text-sm truncate">{item.name}</p>
              <p className="text-white/70 text-xs">{formatFileSize(item.size)}</p>
            </div>
          </div>
        ))}
      </div>

      {mediaItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Image className="w-16 h-16 mb-4" />
          <p>Aucune image téléchargée</p>
        </div>
      )}
    </div>
  );
}