export const getUserProfileHeaderData = (title: string, count: number) => ({ title, count });

export enum userProfileHeaderDataType {
    bookmarks = 'bookmarks',
    drafts = 'drafts',
    recipes = 'recipes',
}
