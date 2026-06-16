import { getAccessToken } from '@/features/auth/store/useAuthStore';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiErrorPayload {
  code: string;
  message: string;
  timestamp?: string;
  errors?: Array<{ field: string; message: string; rejectedValue?: unknown }>;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly payload: ApiErrorPayload,
  ) {
    super(payload.message ?? `HTTP ${status}`);
    this.name = 'ApiError';
  }
}

interface RequestInitJson extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

interface RequestInitForm extends Omit<RequestInit, 'body'> {
  body: FormData;
}

const baseUrl = () => process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const authHeader = (): Record<string, string> => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const payload = (await res.json().catch(() => ({}))) as ApiErrorPayload;
    throw new ApiError(res.status, payload);
  }
  if (res.status === 204) return undefined as T;
  const contentType = res.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) return undefined as T;
  return (await res.json()) as T;
}

async function request<T>(method: Method, path: string, init?: RequestInitJson): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...authHeader(),
    ...((init?.headers as Record<string, string>) ?? {}),
  };
  const res = await fetch(`${baseUrl()}${path}`, {
    method,
    headers,
    body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
    cache: init?.cache ?? 'no-store',
    credentials: init?.credentials,
  });
  return handleResponse<T>(res);
}

async function requestForm<T>(method: Method, path: string, init: RequestInitForm): Promise<T> {
  const headers: Record<string, string> = {
    ...authHeader(),
    ...((init.headers as Record<string, string>) ?? {}),
  };
  const res = await fetch(`${baseUrl()}${path}`, {
    method,
    headers,
    body: init.body,
    cache: 'no-store',
  });
  return handleResponse<T>(res);
}

export const apiClient = {
  get: <T>(path: string, init?: RequestInitJson) => request<T>('GET', path, init),
  post: <T>(path: string, init?: RequestInitJson) => request<T>('POST', path, init),
  put: <T>(path: string, init?: RequestInitJson) => request<T>('PUT', path, init),
  patch: <T>(path: string, init?: RequestInitJson) => request<T>('PATCH', path, init),
  delete: <T>(path: string, init?: RequestInitJson) => request<T>('DELETE', path, init),
  postForm: <T>(path: string, formData: FormData, init?: Omit<RequestInitForm, 'body'>) =>
    requestForm<T>('POST', path, { ...init, body: formData }),
};
