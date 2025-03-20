declare global {
  interface ResponseDto<T> {
    success: boolean;
    data: T;
    message: string | null;
  }
}

export {};