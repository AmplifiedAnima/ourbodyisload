export interface AuthState {
  username: string;
  isLoggedIn: boolean;
  accessToken: string;
  email: string;
  roles: string[];
  avatarImageUrl: string;
  error: string | null;
}
