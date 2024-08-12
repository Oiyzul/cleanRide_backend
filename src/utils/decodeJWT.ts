import jwt, { JwtPayload } from 'jsonwebtoken'
export function decodeJWT(token: string) {
    try {
      const decoded = jwt.decode(token) as JwtPayload;
      return decoded;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  }