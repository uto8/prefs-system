"use client"

import React, { useState, useEffect } from 'react';
import { Search, Grid, List, X } from 'lucide-react';
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
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    file: FileInfo | null;
    previewUrl: string | null;
  }>({
    isOpen: false,
    file: null,
    previewUrl: null,
  });
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

  // ファイルプレビュー（モーダル表示）
  const handlePreview = async (file: FileInfo) => {
    try {
      const data = await ApiGet(`/files/${file.id}/preview`);

      setPreviewModal({
        isOpen: true,
        file: file,
        previewUrl: data.previewUrl,
      });
    } catch (error) {
      console.error('プレビューエラー:', error);
      toast({
        title: "プレビューエラー",
        description: "ファイルのプレビューに失敗しました",
        variant: "destructive",
      });
    }
  };

  // プレビューモーダルを閉じる
  const closePreviewModal = () => {
    setPreviewModal({
      isOpen: false,
      file: null,
      previewUrl: null,
    });
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
    <div className="px-4 sm:px-6 lg:px-8">
      {/* ヘッダー */}
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">ファイル管理</h1>
          <p className="mt-2 text-sm text-gray-700">ファイルのアップロード、管理、共有ができます</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setShowUpload(true)}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              ファイルアップロード
            </button>
          </div>
        </div>
      </div>

      {/* フィルター・検索 */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="ファイル名や説明で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as FileCategory | 'all')}
            className="block w-full sm:w-48 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="all">すべて</option>
            <option value="issue">案件ファイル</option>
            <option value="office">店舗管理ファイル</option>
            <option value="sales">営業資料ファイル</option>
            <option value="reception">受付業務ファイル</option>
            <option value="company">共通ファイル</option>
          </select>
        </div>
      </div>

      {/* ファイル統計 */}
      {!loading && (
        <div className="mb-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">統計情報</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">総ファイル数</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{files.length}</dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">総ファイルサイズ</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {Math.round(files.reduce((sum, file) => sum + file.fileSize, 0) / 1024 / 1024 * 100) / 100}MB
              </dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">画像ファイル</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {files.filter(f => f.fileType === 'image').length}
              </dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">文書ファイル</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {files.filter(f => f.fileType === 'document' || f.fileType === 'pdf').length}
              </dd>
            </div>
          </div>
        </div>
      )}

      {/* ファイル一覧 */}
      <div className="mt-8 flow-root">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            ファイル一覧
            {searchQuery && ` (${filteredFiles.length}件の検索結果)`}
          </h3>
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

        {loading ? (
          <div className="flex justify-center" aria-label="読み込み中">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <FileGrid
                files={filteredFiles}
                loading={loading}
                viewMode={viewMode}
                onDownload={handleDownload}
                onPreview={handlePreview}
                onDelete={handleDelete}
                onCardClick={handlePreview}
              />
            </div>
          </div>
        )}
      </div>

      {/* プレビューモーダル */}
      {previewModal.isOpen && previewModal.file && previewModal.previewUrl && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* モーダルヘッダー */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  {previewModal.file.fileName}
                </h3>
                <p className="text-sm text-gray-500">
                  {Math.round(previewModal.file.fileSize / 1024)} KB
                </p>
              </div>
              <button
                onClick={closePreviewModal}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">閉じる</span>
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* プレビューコンテンツ */}
            <div className="p-4 max-h-[calc(90vh-120px)] overflow-auto">
              {previewModal.file.fileType === 'image' ? (
                <img
                  src={previewModal.previewUrl}
                  alt={previewModal.file.fileName}
                  className="max-w-full h-auto mx-auto"
                />
              ) : previewModal.file.fileType === 'pdf' ? (
                <iframe
                  src={previewModal.previewUrl}
                  className="w-full h-[600px] border-0"
                  title={previewModal.file.fileName}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">このファイル形式はプレビューできません</p>
                  <button
                    onClick={() => handleDownload(previewModal.file!)}
                    className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    ダウンロード
                  </button>
                </div>
              )}
            </div>

            {/* モーダルフッター */}
            <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
              <button
                onClick={() => handleDownload(previewModal.file!)}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                ダウンロード
              </button>
              <button
                onClick={closePreviewModal}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* アップロードモーダル */}
      {showUpload && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold leading-6 text-gray-900">ファイルアップロード</h3>
              <button
                onClick={() => setShowUpload(false)}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">閉じる</span>
                ✕
              </button>
            </div>
            <FileUpload
              onUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
              session={session}
            />
          </div>
        </div>
      )}
    </div>
  );
}
