export type MenuItem = {
    category: string;
    title: string;
    description?: string;
    subCategories?: MenuItem[];
    icon?: string;
};
