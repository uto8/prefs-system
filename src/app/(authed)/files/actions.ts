"use server"

import { getCookieSession } from "@/lib/auth/get-cookie-session";
import { Session } from "@/types/Session";

export const uploadFile = async (formData: FormData) => {
  try {
    const cookie: Session = await getCookieSession()
    const request_url = process.env.NEXT_PUBLIC_API_BASE_URL + '/files/upload';

    const headers: HeadersInit = {
      ...(cookie.role && { "role": cookie.role }),
      ...(cookie.companyId && { "companyId": cookie.companyId }),
      ...(cookie.officeId && { "officeId": cookie.officeId }),
      ...(cookie.saleId && { "saleId": cookie.saleId }),
      "userId": "1" // 現在のセッション管理システムでは固定値
    };

    const response = await fetch(request_url, {
      method: 'POST',
      headers: headers,
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('アップロードエラーの詳細:', {
        status: response.status,
        statusText: response.statusText,
        data: data
      });
      const errorMessage = data.error ?? data.message ?? 'アップロードに失敗しました';
      throw new Error(errorMessage);
    }

    return data;
  } catch (e) {
    throw e;
  }
}

export const downloadFile = async (fileId: number) => {
  try {
    const cookie: Session = await getCookieSession()
    const request_url = process.env.NEXT_PUBLIC_API_BASE_URL + `/files/${fileId}/download`;

    const headers: HeadersInit = {
      ...(cookie.role && { "role": cookie.role }),
      ...(cookie.companyId && { "companyId": cookie.companyId }),
      ...(cookie.officeId && { "officeId": cookie.officeId }),
      ...(cookie.saleId && { "saleId": cookie.saleId }),
    };

    const response = await fetch(request_url, {
      method: 'GET',
      headers: headers
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error ?? data.message ?? 'ダウンロードに失敗しました';
      throw new Error(errorMessage);
    }

    return data;
  } catch (e) {
    throw e;
  }
}

export const previewFile = async (fileId: number) => {
  try {
    const cookie: Session = await getCookieSession()
    const request_url = process.env.NEXT_PUBLIC_API_BASE_URL + `/files/${fileId}/preview`;

    const headers: HeadersInit = {
      ...(cookie.role && { "role": cookie.role }),
      ...(cookie.companyId && { "companyId": cookie.companyId }),
      ...(cookie.officeId && { "officeId": cookie.officeId }),
      ...(cookie.saleId && { "saleId": cookie.saleId }),
    };

    const response = await fetch(request_url, {
      method: 'GET',
      headers: headers
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error ?? data.message ?? 'プレビューに失敗しました';
      throw new Error(errorMessage);
    }

    return data;
  } catch (e) {
    throw e;
  }
}

export const deleteFile = async (fileId: number) => {
  try {
    const cookie: Session = await getCookieSession()
    const request_url = process.env.NEXT_PUBLIC_API_BASE_URL + `/files/${fileId}`;

    const headers: HeadersInit = {
      ...(cookie.role && { "role": cookie.role }),
      ...(cookie.companyId && { "companyId": cookie.companyId }),
      ...(cookie.officeId && { "officeId": cookie.officeId }),
      ...(cookie.saleId && { "saleId": cookie.saleId }),
    };

    const response = await fetch(request_url, {
      method: 'DELETE',
      headers: headers
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error ?? data.message ?? '削除に失敗しました';
      throw new Error(errorMessage);
    }

    return data;
  } catch (e) {
    throw e;
  }
}
