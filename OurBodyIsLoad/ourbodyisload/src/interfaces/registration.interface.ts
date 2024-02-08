export interface formData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface errorMessage {
  message: string[];
  statusCode?: number;
}
