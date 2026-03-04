export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  dni: string;
  number: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}