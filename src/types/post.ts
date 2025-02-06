import { UserProps } from './user.ts';

export type Post = UserProps & {
    text: string;
};
