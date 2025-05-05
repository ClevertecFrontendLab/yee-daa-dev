import { jwtDecode, JwtPayload } from 'jwt-decode';

type TokenDataType = {
    userId: string;
    login: string;
};

export const getUserIdFromToken = (token: string) =>
    jwtDecode<JwtPayload & TokenDataType>(token).userId;
