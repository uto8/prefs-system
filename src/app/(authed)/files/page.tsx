"use client"

import React, { useState, useEffect } from 'react';
import { Plus, Search, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/files/file-upload';
import { FileGrid } from '@/components/files/file-grid';
import { useToast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
import ApiGet from '@/lib/useApi/get';
import ApiDelete from '@/lib/useApi/delete';
import type { FileInfo, FileCategory, FileUploadResponse } from '@/types/File';

export default function FilesPage() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<FileCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();
  const { data: session } = useSession();

  // ファイル一覧を取得
  const fetchFiles = async () => {
    if (!session?.user) return;

    try {
      setLoading(true);

      // デバッグ情報を出力
      console.log('セッション情報:', {
        companyId: session.user.companyId,
        role: session.user.role,
        userId: session.user.id
      });

      const data = await ApiGet('/files');
      setFiles(data);
    } catch (error) {
      console.error('ファイル取得エラー:', error);
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : "ファイルの取得に失敗しました",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchFiles();
    }
  }, [session]);

  // ファイルのフィルタリング
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || file.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // ファイルアップロード完了時の処理
  const handleUploadComplete = (response: FileUploadResponse) => {
    toast({
      title: "アップロード完了",
      description: response.message,
    });
    fetchFiles(); // リストを更新
    setShowUpload(false);
  };

  // ファイルアップロードエラー時の処理
  const handleUploadError = (error: string) => {
    toast({
      title: "アップロードエラー",
      description: error,
      variant: "destructive",
    });
  };

  // ファイルダウンロード
  const handleDownload = async (file: FileInfo) => {
    try {
      const data = await ApiGet(`/files/${file.id}/download`);

      // ダウンロードリンクを開く
      const link = document.createElement('a');
      link.href = data.downloadUrl;
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "ダウンロード開始",
        description: `${file.fileName}のダウンロードを開始しました`,
      });
    } catch (error) {
      console.error('ダウンロードエラー:', error);
      toast({
        title: "ダウンロードエラー",
        description: "ファイルのダウンロードに失敗しました",
        variant: "destructive",
      });
    }
  };

  // ファイルプレビュー
  const handlePreview = async (file: FileInfo) => {
    try {
      const data = await ApiGet(`/files/${file.id}/preview`);

      // 新しいタブでプレビューを開く
      window.open(data.previewUrl, '_blank');
    } catch (error) {
      console.error('プレビューエラー:', error);
      toast({
        title: "プレビューエラー",
        description: "ファイルのプレビューに失敗しました",
        variant: "destructive",
      });
    }
  };

  // ファイル削除
  const handleDelete = async (file: FileInfo) => {
    if (!confirm(`「${file.fileName}」を削除しますか？この操作は元に戻せません。`)) {
      return;
    }

    try {
      await ApiDelete(`/files/${file.id}`);

      toast({
        title: "削除完了",
        description: `${file.fileName}を削除しました`,
      });

      fetchFiles(); // リストを更新
    } catch (error) {
      console.error('削除エラー:', error);
      toast({
        title: "削除エラー",
        description: "ファイルの削除に失敗しました",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ファイル管理</h1>
          <p className="text-gray-600">ファイルのアップロード、管理、共有ができます</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>

          <Button onClick={() => setShowUpload(true)}>
            <Plus className="h-4 w-4 mr-2" />
            ファイルアップロード
          </Button>
        </div>
      </div>

      {/* アップロードモーダル */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">ファイルアップロード</h2>
              <Button
                variant="ghost"
                onClick={() => setShowUpload(false)}
              >
                ✕
              </Button>
            </div>

            <FileUpload
              onUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
              session={session}
            />
          </div>
        </div>
      )}

      {/* フィルター・検索 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="ファイル名や説明で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as FileCategory | 'all')}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="カテゴリで絞り込み" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="issue">案件ファイル</SelectItem>
            <SelectItem value="office">店舗管理ファイル</SelectItem>
            <SelectItem value="sales">営業資料ファイル</SelectItem>
            <SelectItem value="reception">受付業務ファイル</SelectItem>
            <SelectItem value="company">共通ファイル</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ファイル統計 */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{files.length}</div>
            <div className="text-sm text-gray-600">総ファイル数</div>
          </div>

          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(files.reduce((sum, file) => sum + file.fileSize, 0) / 1024 / 1024 * 100) / 100}MB
            </div>
            <div className="text-sm text-gray-600">総ファイルサイズ</div>
          </div>

          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {files.filter(f => f.fileType === 'image').length}
            </div>
            <div className="text-sm text-gray-600">画像ファイル</div>
          </div>

          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {files.filter(f => f.fileType === 'document' || f.fileType === 'pdf').length}
            </div>
            <div className="text-sm text-gray-600">文書ファイル</div>
          </div>
        </div>
      )}

      {/* ファイル一覧 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            ファイル一覧
            {searchQuery && ` (${filteredFiles.length}件の検索結果)`}
          </h2>

          {categoryFilter !== 'all' && (
            <div className="text-sm text-gray-600">
              カテゴリ: {categoryFilter === 'issue' ? '案件ファイル' :
                       categoryFilter === 'office' ? '店舗管理ファイル' :
                       categoryFilter === 'sales' ? '営業資料ファイル' :
                       categoryFilter === 'reception' ? '受付業務ファイル' :
                       categoryFilter === 'company' ? '共通ファイル' : categoryFilter}
            </div>
          )}
        </div>

        <FileGrid
          files={filteredFiles}
          loading={loading}
          viewMode={viewMode}
          onDownload={handleDownload}
          onPreview={handlePreview}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
