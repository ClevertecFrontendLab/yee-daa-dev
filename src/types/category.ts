export type MenuItem = {
    id: string;
    category: string;
    title: string;
    description?: string;
    subCategories?: MenuItem[];
    icon?: string;
};
