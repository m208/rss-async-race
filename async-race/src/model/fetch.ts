export async function getJsonWithTotal<TResponse>(url: string, method: string): Promise<JsonResponse<TResponse>> {
  const response = await fetch(url, { method });

  if (response.status === 200) {
    const json = await response.json();

    return {
      status: response.status,
      total: response.headers.get('X-Total-Count'),
      data: json,
    };

  }

  throw new Error(response.status.toString());
}

interface JsonResponse<T> {
  status: number;
  total: string | null;
  data?: T;
}

export async function getJson<TResponse>(url: string, method: string): Promise<TResponse> {
  const response = await fetch(url, { method });

  if (response.status === 200) {
    return response.json();
  }

  throw new Error(response.status.toString());
}

interface PostJsonResponse<T> {
  status: number;
  message: string;
  data?: T;
}

export async function postJson<TResponse, TData = object>(url: string, method: string, data: TData): Promise<PostJsonResponse<TResponse>> {
  const response = await fetch(
    url,
    {
      method,
      headers:
            {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
            },
      body: JSON.stringify(data),
    },
  );

  if (response.status === 200) {
    const json = await response.json();

    return {
      status: response.status,
      message: response.statusText,
      data: json,
    };
  }

  return {
    status: response.status,
    message: response.statusText,
  };
}