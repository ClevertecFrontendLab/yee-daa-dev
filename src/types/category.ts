export type MenuItem = {
    category: string;
    title: string;
    description?: string;
    subItems?: MenuItem[];
};
