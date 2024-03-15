export interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface ErrorMessage {
  message: string[];
  statusCode?: number;
}
