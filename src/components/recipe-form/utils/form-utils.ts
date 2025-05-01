import { UseFormReset } from 'react-hook-form';

import { Recipe } from '~/redux/api/types/recipes';
import { RecipeFormValues } from '~/types/recipe-form';

type ArrayItem = Record<string, string | number | undefined | null>;

export const hasAnyFieldsChanged = (
    values: RecipeFormValues,
    initialRecipe?: Recipe,
    isSuccessfullySubmitted?: boolean,
): boolean => {
    if (isSuccessfullySubmitted) {
        return false;
    }

    if (!initialRecipe) {
        return Boolean(
            values.title?.trim() ||
                values.description?.trim() ||
                values.time ||
                values.portions ||
                values.categoriesIds?.length > 0 ||
                values.image ||
                values.ingredients?.some(
                    (ing) => ing.title?.trim() || ing.measureUnit?.trim() || ing.count,
                ) ||
                values.steps?.some((step) => step.description?.trim() || step.image),
        );
    }

    const simpleFields = ['title', 'description', 'time', 'portions', 'image'] as const;
    const hasSimpleFieldsChanged = simpleFields.some(
        (field) => values[field]?.toString().trim() !== initialRecipe[field]?.toString().trim(),
    );

    const hasCategoriesChanged =
        !values.categoriesIds?.every((id) => initialRecipe.categoriesIds.includes(id)) ||
        values.categoriesIds?.length !== initialRecipe.categoriesIds.length;

    const hasArrayItemsChanged = (current: ArrayItem[], initial: ArrayItem[], fields: string[]) =>
        current?.some((item, index) => {
            const initialItem = initial[index];
            if (!initialItem) return true;
            return fields.some(
                (field) => item[field]?.toString().trim() !== initialItem[field]?.toString().trim(),
            );
        }) || current?.length !== initial.length;

    return (
        hasSimpleFieldsChanged ||
        hasCategoriesChanged ||
        hasArrayItemsChanged(values.ingredients, initialRecipe.ingredients, [
            'title',
            'measureUnit',
            'count',
        ]) ||
        hasArrayItemsChanged(values.steps, initialRecipe.steps, ['description', 'image'])
    );
};

export const initializeRecipeForm = (reset: UseFormReset<RecipeFormValues>, recipe: Recipe) => {
    reset({
        title: recipe.title,
        description: recipe.description,
        time: recipe.time,
        portions: recipe.portions,
        categoriesIds: recipe.categoriesIds,
        image: recipe.image || '',
        ingredients: recipe.ingredients.map((ing) => ({
            ...ing,
        })),
        steps: recipe.steps.map((step) => ({
            ...step,
            image: step.image || null,
        })),
    });
};
