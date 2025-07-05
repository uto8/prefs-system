"use client"

import React, { useState } from 'react';
import {
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  FileText,
  FileImage,
  Archive,
  FileSpreadsheet,
  Folder,
  Clock,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { FileInfo, FileType } from '@/types/File';

interface FileGridProps {
  files: FileInfo[];
  onDownload?: (file: FileInfo) => void;
  onPreview?: (file: FileInfo) => void;
  onEdit?: (file: FileInfo) => void;
  onDelete?: (file: FileInfo) => void;
  loading?: boolean;
  className?: string;
}

interface FileIconProps {
  fileType: FileType;
  className?: string;
}

function FileTypeIcon({ fileType, className }: FileIconProps) {
  const iconClassName = cn('w-12 h-12', className);

  switch (fileType) {
    case 'image':
      return <FileImage className={cn(iconClassName, 'text-green-600')} />;
    case 'pdf':
      return <FileText className={cn(iconClassName, 'text-red-600')} />;
    case 'document':
      return <FileText className={cn(iconClassName, 'text-blue-600')} />;
    case 'spreadsheet':
      return <FileSpreadsheet className={cn(iconClassName, 'text-green-700')} />;
    case 'archive':
      return <Archive className={cn(iconClassName, 'text-orange-600')} />;
    default:
      return <FileText className={cn(iconClassName, 'text-gray-600')} />;
  }
}

function FileThumbnail({ file }: { file: FileInfo }) {
  const [imageError, setImageError] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 画像ファイルの場合、プレビューURLを取得
  React.useEffect(() => {
    if (file.fileType === 'image' && !imageError) {
      // 実際の実装では、ここでS3のpresigned URLを取得する
      // 今回は仮のURLとして使用
      setPreviewUrl(file.filePath);
    }
  }, [file, imageError]);

  if (file.fileType === 'image' && previewUrl && !imageError) {
    return (
      <img
        src={previewUrl}
        alt={file.fileName}
        className="w-full h-32 object-cover rounded-lg"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    );
  }

  return (
    <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded-lg">
            <FileTypeIcon
        fileType={file.fileType}
        className="w-16 h-16"
      />
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getCategoryLabel(category: string): string {
  switch (category) {
    case 'issue':
      return '案件';
    case 'office':
      return '店舗';
    case 'sales':
      return '営業';
    case 'reception':
      return '受付';
    case 'company':
      return '共通';
    default:
      return category;
  }
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'issue':
      return 'bg-blue-100 text-blue-800';
    case 'office':
      return 'bg-green-100 text-green-800';
    case 'sales':
      return 'bg-purple-100 text-purple-800';
    case 'reception':
      return 'bg-orange-100 text-orange-800';
    case 'company':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function FileGrid({
  files,
  onDownload,
  onPreview,
  onEdit,
  onDelete,
  loading = false,
  className
}: FileGridProps) {
  if (loading) {
    return (
      <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', className)}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="w-full h-32 bg-gray-200 rounded-lg mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <Folder className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">ファイルがありません</h3>
        <p className="text-gray-500">ファイルをアップロードして開始しましょう</p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', className)}>
      {files.map((file) => (
        <div
          key={file.id}
          className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {/* サムネイル/アイコン */}
          <div className="p-4 pb-3">
            <FileThumbnail file={file} />
          </div>

          {/* ファイル情報 */}
          <div className="px-4 pb-4">
            {/* ファイル名 */}
            <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
              {file.fileName}
            </h3>

            {/* カテゴリバッジ */}
            <div className="flex items-center justify-between mb-2">
              <span className={cn(
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                getCategoryColor(file.category)
              )}>
                {getCategoryLabel(file.category)}
              </span>

              {/* アクションメニュー */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onPreview && (
                    <DropdownMenuItem onClick={() => onPreview(file)}>
                      <Eye className="h-4 w-4 mr-2" />
                      プレビュー
                    </DropdownMenuItem>
                  )}
                  {onDownload && (
                    <DropdownMenuItem onClick={() => onDownload(file)}>
                      <Download className="h-4 w-4 mr-2" />
                      ダウンロード
                    </DropdownMenuItem>
                  )}
                  {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(file)}>
                      <Edit className="h-4 w-4 mr-2" />
                      編集
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <DropdownMenuItem
                      onClick={() => onDelete(file)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      削除
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* ファイル詳細 */}
            <div className="space-y-1 text-xs text-gray-500">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {formatDate(file.createdAt)}
              </div>
              <div className="flex items-center justify-between">
                <span>{formatFileSize(file.fileSize)}</span>
                {file.uploadedByType && (
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    <span className="capitalize">{file.uploadedByType}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 説明文 */}
            {file.description && (
              <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                {file.description}
              </p>
            )}

            {/* 関連情報 */}
            {(file.issueCode || file.officeName || file.saleName || file.receptionName) && (
              <div className="text-xs text-gray-500 mt-2 space-y-0.5">
                {file.issueCode && (
                  <div>案件: {file.issueCode}</div>
                )}
                {file.officeName && (
                  <div>店舗: {file.officeName}</div>
                )}
                {file.saleName && (
                  <div>営業: {file.saleName}</div>
                )}
                {file.receptionName && (
                  <div>受付: {file.receptionName}</div>
                )}
              </div>
            )}

            {/* 公開/非公開表示 */}
            {file.isPublic && (
              <div className="flex items-center mt-2">
                <div className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  公開
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
