"use client"

import React, { useState, useCallback, useRef } from 'react';
import { Upload, X, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { FileCategory, DragDropFile, FileUploadResponse } from '@/types/File';

interface FileUploadProps {
  onUploadComplete?: (response: FileUploadResponse) => void;
  onUploadError?: (error: string) => void;
  maxFiles?: number;
  maxSizePerFile?: number; // MB
  acceptedFileTypes?: string[];
  defaultCategory?: FileCategory;
  officeId?: number;
  issueId?: number;
  saleId?: number;
  receptionId?: number;
  className?: string;
}

const ACCEPTED_FILE_TYPES = [
  // 画像
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  // 文書
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  // アーカイブファイル
  'application/zip',
  'application/x-rar-compressed',
  'application/x-zip-compressed'
];

const CATEGORY_OPTIONS = [
  { value: 'issue', label: '案件ファイル' },
  { value: 'office', label: '店舗管理ファイル' },
  { value: 'sales', label: '営業資料ファイル' },
  { value: 'reception', label: '受付業務ファイル' },
  { value: 'company', label: '共通ファイル' }
];

export function FileUpload({
  onUploadComplete,
  onUploadError,
  maxFiles = 10,
  maxSizePerFile = 100,
  acceptedFileTypes = ACCEPTED_FILE_TYPES,
  defaultCategory = 'company',
  officeId,
  issueId,
  saleId,
  receptionId,
  className
}: FileUploadProps) {
  const [files, setFiles] = useState<DragDropFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [category, setCategory] = useState<FileCategory>(defaultCategory);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    // ファイルタイプチェック
    if (!acceptedFileTypes.includes(file.type)) {
      return `対応していないファイル形式です: ${file.type}`;
    }

    // サイズチェック
    const maxSizeBytes = maxSizePerFile * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `ファイルサイズが制限を超えています（最大${maxSizePerFile}MB）`;
    }

    return null;
  }, [acceptedFileTypes, maxSizePerFile]);

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: DragDropFile[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const error = validateFile(file);

      if (files.length + newFiles.length >= maxFiles) {
        break;
      }

      const dragDropFile: DragDropFile = {
        file,
        id: `${Date.now()}-${i}`,
        status: error ? 'error' : 'pending',
        error: error || undefined
      };

      // 画像ファイルの場合はプレビューを生成
      if (file.type.startsWith('image/') && !error) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFiles(prev => prev.map(f =>
            f.id === dragDropFile.id
              ? { ...f, preview: e.target?.result as string }
              : f
          ));
        };
        reader.readAsDataURL(file);
      }

      newFiles.push(dragDropFile);
    }

    setFiles(prev => [...prev, ...newFiles]);
  }, [files, maxFiles, validateFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const uploadFile = async (dragDropFile: DragDropFile): Promise<void> => {
    try {
      // セッション情報を取得
      const response = await fetch('/api/auth/session');
      const sessionData = await response.json();

      if (!sessionData?.user) {
        throw new Error('ログインが必要です');
      }

      const formData = new FormData();
      formData.append('file', dragDropFile.file);
      formData.append('category', category);
      if (description) formData.append('description', description);
      if (officeId) formData.append('officeId', officeId.toString());
      if (issueId) formData.append('issueId', issueId.toString());
      if (saleId) formData.append('saleId', saleId.toString());
      if (receptionId) formData.append('receptionId', receptionId.toString());
      formData.append('isPublic', 'false');

      const uploadResponse = await fetch('http://localhost:8000/files/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'companyId': sessionData.user.companyId?.toString() || '',
          'officeId': sessionData.user.officeId?.toString() || '',
          'saleId': sessionData.user.saleId?.toString() || '',
          'receptionId': sessionData.user.receptionId?.toString() || '',
          'role': sessionData.user.role || '',
          'userId': sessionData.user.id || '',
        }
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.message || 'アップロードに失敗しました');
      }

      const result: FileUploadResponse = await uploadResponse.json();

      setFiles(prev => prev.map(f =>
        f.id === dragDropFile.id
          ? { ...f, status: 'success', progress: 100 }
          : f
      ));

      onUploadComplete?.(result);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'アップロードに失敗しました';

      setFiles(prev => prev.map(f =>
        f.id === dragDropFile.id
          ? { ...f, status: 'error', error: errorMessage }
          : f
      ));

      onUploadError?.(errorMessage);
    }
  };

  const handleUploadAll = async () => {
    const pendingFiles = files.filter(f => f.status === 'pending');
    if (pendingFiles.length === 0) return;

    setIsUploading(true);

    // ファイルを順番にアップロード
    for (const file of pendingFiles) {
      setFiles(prev => prev.map(f =>
        f.id === file.id
          ? { ...f, status: 'uploading', progress: 0 }
          : f
      ));

      await uploadFile(file);
    }

    setIsUploading(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return '🖼️';
    if (file.type === 'application/pdf') return '📄';
    if (file.type.includes('word')) return '📝';
    if (file.type.includes('excel') || file.type.includes('sheet')) return '📊';
    if (file.type.includes('zip') || file.type.includes('rar')) return '📦';
    return '📄';
  };

  const pendingFiles = files.filter(f => f.status === 'pending');
  const hasErrors = files.some(f => f.status === 'error');

  return (
    <div className={cn('space-y-4', className)}>
      {/* ドラッグ&ドロップエリア */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        )}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div className="text-lg font-medium text-gray-900 mb-2">
          ファイルをドラッグ&ドロップ
        </div>
        <div className="text-sm text-gray-500 mb-4">
          または<span className="text-blue-600 font-medium">クリックしてファイルを選択</span>
        </div>
        <div className="text-xs text-gray-400">
          最大{maxFiles}ファイル・{maxSizePerFile}MB以下・画像/PDF/文書/アーカイブファイル
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedFileTypes.join(',')}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* アップロード設定 */}
      <div>
        <Label htmlFor="category">カテゴリ</Label>
        <Select value={category} onValueChange={(value) => setCategory(value as FileCategory)}>
          <SelectTrigger>
            <SelectValue placeholder="カテゴリを選択" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORY_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">説明（任意）</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="ファイルの説明を入力..."
          rows={2}
        />
      </div>

      {/* ファイル一覧 */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">選択されたファイル</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
              >
                <div className="flex items-center space-x-3 flex-1">
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center text-xl">
                      {getFileIcon(file.file)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {file.file.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatFileSize(file.file.size)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {file.status === 'pending' && (
                      <div className="text-xs text-gray-500">待機中</div>
                    )}
                    {file.status === 'uploading' && (
                      <>
                        <div className="w-20 h-2 bg-gray-200 rounded">
                          <div
                            className="h-full bg-blue-600 rounded"
                            style={{ width: `${file.progress || 0}%` }}
                          />
                        </div>
                        <div className="text-xs text-blue-600">アップロード中</div>
                      </>
                    )}
                    {file.status === 'success' && (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-xs">完了</span>
                      </div>
                    )}
                    {file.status === 'error' && (
                      <div className="flex items-center text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-xs">エラー</span>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                  className="ml-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* エラー表示 */}
      {hasErrors && (
        <div className="border border-red-300 rounded-lg p-4 bg-red-50">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
            <p className="text-sm text-red-800">
              一部のファイルでエラーが発生しました。ファイル形式やサイズを確認してください。
            </p>
          </div>
        </div>
      )}

      {/* アップロードボタン */}
      {pendingFiles.length > 0 && (
        <Button
          onClick={handleUploadAll}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? 'アップロード中...' : `${pendingFiles.length}個のファイルをアップロード`}
        </Button>
      )}
    </div>
  );
}
