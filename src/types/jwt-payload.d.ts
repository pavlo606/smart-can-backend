export interface JwtPayload {
  jti: string
  userId: string;
  email: string;
  role: string;
}
