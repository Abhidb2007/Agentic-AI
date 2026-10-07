const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export type QueryRequest = {
  query: string;
};

export type QueryResponse = {
  query: string;
  answer: string;
  trace: Array<{
    step_id: number;
    description: string;
    tool: string;
    query: string;
    status: string;
    result?: string | null;
  }>;
};

export type HealthResponse = {
  status: string;
  version: string;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = 'Request failed.';
    try {
      const data = await response.json();
      message = data?.detail || data?.message || message;
    } catch {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
}

export const api = {
  health: () => request<HealthResponse>('/health'),
  query: (payload: QueryRequest) => request<QueryResponse>('/query', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
};
