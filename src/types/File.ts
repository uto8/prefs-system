export interface FileInfo {
  id: number;
  companyId: number;
  officeId: number | null;
  issueId: number | null;
  saleId: number | null;
  receptionId: number | null;
  category: FileCategory;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileType: FileType;
  mimeType: string;
  s3Key: string;
  s3Bucket: string;
  uploadedByType: UserRole;
  uploadedById: number;
  isPublic: boolean;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  // JOIN情報
  officeName?: string | null;
  issueCode?: string | null;
  saleName?: string | null;
  receptionName?: string | null;
}

export type FileCategory = 'issue' | 'office' | 'sales' | 'reception' | 'company';

export type FileType = 'image' | 'pdf' | 'document' | 'spreadsheet' | 'archive' | 'other';

export type UserRole = 'admin' | 'office' | 'sales' | 'reception';

export interface FileUploadOptions {
  file: File;
  category: FileCategory;
  description?: string;
  officeId?: number;
  issueId?: number;
  saleId?: number;
  receptionId?: number;
  isPublic?: boolean;
}

export interface FileDownloadResponse {
  downloadUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

export interface FilePreviewResponse {
  previewUrl: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
}

export interface FileUploadResponse {
  message: string;
  file: {
    fileName: string;
    fileSize: number;
    fileType: string;
    mimeType: string;
    s3Key: string;
    s3Bucket: string;
    filePath: string;
  };
}

// ファイルアイコン用の型
export interface FileIcon {
  type: FileType;
  icon: string;
  color: string;
  bgColor: string;
}

// ファイルサイズフォーマット
export interface FormattedFileSize {
  size: number;
  unit: 'B' | 'KB' | 'MB' | 'GB';
  formatted: string;
}

// ファイルフィルター用の型
export interface FileFilters {
  category?: FileCategory;
  fileType?: FileType;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  officeId?: number;
  issueId?: number;
  saleId?: number;
  receptionId?: number;
}

// ドラッグ&ドロップ関連
export interface DragDropFile {
  file: File;
  id: string;
  preview?: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
}

// ファイル権限
export interface FilePermissions {
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
  canShare: boolean;
}

// API応答用の型
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface FileListResponse extends ApiResponse<FileInfo[]> {
  total?: number;
  page?: number;
  limit?: number;
}

// ファイル検索・フィルタリング
export interface FileSearchParams {
  page?: number;
  limit?: number;
  category?: FileCategory;
  fileType?: FileType;
  search?: string;
  sortBy?: 'name' | 'size' | 'date' | 'type';
  sortOrder?: 'asc' | 'desc';
}

// ファイル統計
export interface FileStats {
  totalFiles: number;
  totalSize: number;
  filesByCategory: Record<FileCategory, number>;
  filesByType: Record<FileType, number>;
  recentFiles: FileInfo[];
}
