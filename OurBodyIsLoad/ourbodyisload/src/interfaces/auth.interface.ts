export interface authState {
  username: string;
  isLoggedIn: boolean;
  accessToken: string;
  email: string;
  roles: string[];
  avatarImageUrl: string;
  error: string | null;
}
