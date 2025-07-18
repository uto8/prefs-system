"use client"

import { FileGrid } from '@/components/files/file-grid';
import { FileUpload } from '@/components/files/file-upload';
import { toast } from '@/hooks/use-toast';
import ApiDelete from '@/lib/useApi/delete';
import ApiGet from '@/lib/useApi/get';
import { useAppDispatch } from '@/stores';
import { setValue } from '@/stores/reducers/issueDetailReducer';
import { FileInfo, FileUploadResponse } from '@/types/File';
import { Issue } from '@/types/Issue';
import React, { useEffect, useState } from 'react'

export default function FileUploadForm({
  issueData
}:{
  issueData: Issue
}) {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setValue(issueData));
    fetchIssueFiles();
  }, []);

  // 案件関連ファイルを取得
  const fetchIssueFiles = async () => {
    try {
      setFileLoading(true);
      const issueFiles = await ApiGet(`/files/issue/${issueData.id}`);
      setFiles(issueFiles);
    } catch (error) {
      console.error('案件ファイル取得エラー:', error);
      toast({
        title: "エラー",
        description: "案件ファイルの取得に失敗しました",
        variant: "destructive",
      });
    } finally {
      setFileLoading(false);
    }
  };

  // ファイルアップロード完了時の処理
  const handleFileUploadComplete = (response: FileUploadResponse) => {
    toast({
      title: "アップロード完了",
      description: response.message,
    });
    fetchIssueFiles(); // ファイル一覧を更新
    setShowFileUpload(false);
  };

  // ファイルアップロードエラー時の処理
  const handleFileUploadError = (error: string) => {
    toast({
      title: "アップロードエラー",
      description: error,
      variant: "destructive",
    });
  };

  // ファイルダウンロード
  const handleFileDownload = async (file: FileInfo) => {
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

    // ファイル削除
  const handleFileDelete = async (file: FileInfo) => {
    if (!confirm(`「${file.fileName}」を削除しますか？この操作は元に戻せません。`)) {
      return;
    }

    try {
      // セッション情報を取得して権限チェック
      const response = await fetch('/api/auth/session');
      const sessionData = await response.json();

      if (!sessionData?.user) {
        throw new Error('ログインが必要です');
      }

      const userRole = sessionData.user.role;
      const userOfficeId = sessionData.user.officeId;
      const userSaleId = sessionData.user.saleId;
      const userReceptionId = sessionData.user.receptionId;

      // 案件ファイルの削除権限チェック
      if (file.category === 'issue') {
        // ADMINは全ファイル削除可能
        if (userRole === 'ADMIN') {
          // 削除可能
        }
        // OFFICEは自店舗の案件ファイル削除可能
        else if (userRole === 'OFFICE') {
          if (!userOfficeId || file.officeId !== userOfficeId) {
            throw new Error('自店舗の案件ファイルのみ削除できます');
          }
        }
        // SALESは自分がアップロードした案件ファイルのみ削除可能
        else if (userRole === 'SALES') {
          if (!userSaleId || file.saleId !== userSaleId || file.uploadedByType !== 'sales') {
            throw new Error('自分がアップロードした案件ファイルのみ削除できます');
          }
        }
        // RECEPTIONは自分がアップロードした案件ファイルのみ削除可能
        else if (userRole === 'RECEPTION') {
          if (!userReceptionId || file.receptionId !== userReceptionId || file.uploadedByType !== 'reception') {
            throw new Error('自分がアップロードした案件ファイルのみ削除できます');
          }
        }
        else {
          throw new Error('ファイルの削除権限がありません');
        }
      }

      await ApiDelete(`/files/${file.id}`);

      // ローカル状態からも削除
      setFiles(prevFiles => prevFiles.filter(f => f.id !== file.id));

      toast({
        title: "削除完了",
        description: `${file.fileName}を削除しました`,
      });

      // ファイル一覧を再取得（念のため）
      fetchIssueFiles();
    } catch (error) {
      console.error('削除エラー:', error);
      toast({
        title: "削除エラー",
        description: error instanceof Error ? error.message : "ファイルの削除に失敗しました",
        variant: "destructive",
      });
    }
  };
  return (
    <>
    {/* ファイル管理セクション */}
    <div className="mt-8 border-t border-gray-100">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">案件ファイル</h3>
            <button
              onClick={() => setShowFileUpload(true)}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              ファイルアップロード
            </button>
          </div>

          {fileLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          ) : (
            <FileGrid
              files={files}
              loading={fileLoading}
              viewMode="grid"
              onDownload={handleFileDownload}
              onDelete={handleFileDelete}
              className="mt-4"
            />
          )}
        </div>
      </div>

      {/* ファイルアップロードモーダル */}
      {showFileUpload && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold leading-6 text-gray-900">案件ファイルアップロード</h3>
              <button
                onClick={() => setShowFileUpload(false)}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">閉じる</span>
                ✕
              </button>
            </div>
            <FileUpload
              onUploadComplete={handleFileUploadComplete}
              onUploadError={handleFileUploadError}
              defaultCategory="issue"
              issueId={issueData.id}
              officeId={issueData.officeId}
              saleId={issueData.saleId}
              receptionId={issueData.reception?.id ? Number(issueData.reception.id) : undefined}
            />
          </div>
        </div>
      )}
    </>
  )
}
