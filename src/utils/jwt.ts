import { jwtDecode } from 'jwt-decode';

interface JwtPayloadWithUserId {
    userId: string;
    login: string;
}

export const decodeJwt = (token: string): JwtPayloadWithUserId | null => {
    try {
        return jwtDecode<JwtPayloadWithUserId>(token);
    } catch (_err) {
        return null;
    }
};
