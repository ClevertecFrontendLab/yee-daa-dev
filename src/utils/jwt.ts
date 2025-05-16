import { jwtDecode } from 'jwt-decode';

type JwtPayloadWithUserId = {
    userId: string;
    login: string;
};

export const decodeJwt = (token: string): JwtPayloadWithUserId | null => {
    try {
        return jwtDecode<JwtPayloadWithUserId>(token);
    } catch (_err) {
        return null;
    }
};
