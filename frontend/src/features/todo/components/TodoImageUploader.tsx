'use client';

import { Trash2, Upload } from 'lucide-react';
import { useRef, type ChangeEvent } from 'react';

import { Button } from '@/components/ui/Button';

import { useTodoImageDeleteMutation } from '../hooks/useTodoImageDeleteMutation';
import { useTodoImageUploadMutation } from '../hooks/useTodoImageUploadMutation';
import type { TodoImageResponse } from '../types/Todo';

interface Props {
  todoId: number;
  images: TodoImageResponse[];
}

export const TodoImageUploader = ({ todoId, images }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useTodoImageUploadMutation(todoId);
  const deleteMutation = useTodoImageDeleteMutation(todoId);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    uploadMutation.mutate(files, {
      onSettled: () => {
        if (fileRef.current) fileRef.current.value = '';
      },
    });
  };

  const handleDelete = (imageId: number) => {
    deleteMutation.mutate(imageId);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">첨부 이미지</h3>
        <Button
          intent="outline"
          size="sm"
          onClick={() => fileRef.current?.click()}
          disabled={uploadMutation.isPending}
        >
          <Upload className="h-4 w-4" />
          {uploadMutation.isPending ? '업로드 중...' : '이미지 추가'}
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleChange}
        />
      </div>
      {images.length === 0 ? (
        <p className="text-sm text-slate-400">첨부된 이미지가 없습니다.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((img) => (
            <li key={img.id} className="group relative overflow-hidden rounded-input border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.originalName} className="h-40 w-full object-cover" />
              <button
                type="button"
                onClick={() => handleDelete(img.id)}
                disabled={deleteMutation.isPending}
                className="absolute right-2 top-2 hidden rounded-full bg-white/90 p-1.5 text-danger-500 group-hover:block"
                aria-label="삭제"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
