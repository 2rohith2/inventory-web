const API_BASE_URL = "http://localhost:8080/api/v1";

export async function apiRequest<TBody = unknown, TResult = unknown>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: TBody,
  options: RequestInit = {}
): Promise<TResult | null> {
  const isBodyAllowed = method !== "GET" && method !== "DELETE";

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...(isBodyAllowed && body ? { body: JSON.stringify(body) } : {}),
    ...options,
  });

  if (!response.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      errorMessage = response.statusText;
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
