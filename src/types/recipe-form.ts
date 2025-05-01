import { Ingredient, Recipe, Step } from '~/redux/api/types/recipes';

export type RecipeFormValues = {
    description: Recipe['description'] | null;
    steps: {
        stepNumber: Step['stepNumber'];
        description: Step['description'] | null;
        image: Step['image'] | null;
    }[];
    ingredients: {
        title: Ingredient['title'] | null;
        count: Ingredient['count'] | null;
        measureUnit: Ingredient['measureUnit'] | null;
    }[];
} & Pick<Recipe, 'title' | 'categoriesIds' | 'image' | 'portions' | 'time'>;
