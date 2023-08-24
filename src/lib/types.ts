export interface UserInfo {
  username: string | null;
  token: string | null;
  roles: string[] | null;
}

export interface LoginResponse {
  token: string;
  expiration: Date;
  roles: string[];
}
