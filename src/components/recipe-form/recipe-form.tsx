import { Flex, useMediaQuery, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { matchPath, useLocation, useNavigate } from 'react-router';

import { Paths } from '~/constants/path';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useBlockerControl } from '~/hooks/use-blocker-control';
import { useDetectParams } from '~/hooks/use-detect-params';
import { useGetMeasureUnitsQuery } from '~/redux/api/measure-api';
import {
    useCreateRecipeDraftMutation,
    useCreateRecipeMutation,
    useGetRecipeByIdQuery,
    useUpdateRecipeMutation,
} from '~/redux/api/recipes-api';
import { selectCategoriesMenu, selectSubCategories } from '~/redux/features/categories-slice';
import { selectUserDraft } from '~/redux/features/user-slice';
import { theme } from '~/theme/theme';
import { RecipeFormValues } from '~/types/recipe-form';

import { ExitWithoutSavingModal } from '../exit-without-saving-modal';
import { FormButtons } from '../form-buttons';
import { IngredientsSection } from '../ingredients-section';
import { RecipeImage } from '../recipe-image';
import { RecipeInfo } from '../recipe-info';
import { StepsSection } from '../steps-section';
import { getRecipePath } from './utils/category-utils';
import { hasAnyFieldsChanged, initializeRecipeForm } from './utils/form-utils';

export const RecipeForm = () => {
    const navigate = useNavigate();
    const [submittedPath, setSubmittedPath] = useState<string | null>(null);

    const { pathname } = useLocation();
    const { recipeId } = useDetectParams();
    const isEditDraftPage = Boolean(matchPath(Paths.EDIT_DRAFT, pathname));

    const { data: recipeFromApi } = useGetRecipeByIdQuery(recipeId as string, {
        skip: !recipeId || isEditDraftPage,
    });
    const { data: measureUnits } = useGetMeasureUnitsQuery();

    const recipeFromState = useAppSelector((state) => selectUserDraft(state, recipeId));
    const recipe = isEditDraftPage ? recipeFromState : recipeFromApi;

    const [createRecipe, { isLoading: isLoadingCreateRecipe }] = useCreateRecipeMutation();
    const [updateRecipe, { isLoading: isLoadingUpdateRecipe }] = useUpdateRecipeMutation();
    const [
        createRecipeDraft,
        { isLoading: isLoadingCreateDraft, isSuccess: isSuccessCreateRecipeDraft },
    ] = useCreateRecipeDraftMutation();

    const subCategories = useAppSelector(selectSubCategories);
    const categories = useAppSelector(selectCategoriesMenu);

    const [isSmallScreen] = useMediaQuery(`(width < ${theme.breakpoints.md})`);

    const isLoading = isLoadingCreateRecipe || isLoadingUpdateRecipe || isLoadingCreateDraft;

    const {
        handleSubmit: formHandleSubmit,
        register,
        control,
        getValues,
        trigger,
        watch,
        reset,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<RecipeFormValues>({
        defaultValues: {
            ingredients: [{ measureUnit: null, title: null, count: undefined }],
            steps: [{ stepNumber: 1, description: null, image: null }],
            description: null,
        },
        shouldFocusError: false,
    });

    const formValues = watch();

    const { handleCancelNavigation, handleContinueNavigation, isOpen, onClose } = useBlockerControl(
        hasAnyFieldsChanged(formValues, recipe, isSubmitSuccessful || isSuccessCreateRecipeDraft),
    );

    const onSubmit = async (values: RecipeFormValues) => {
        const path = getRecipePath({
            categoriesIds: values.categoriesIds,
            categories,
            subCategories,
        });

        try {
            if (recipeId) {
                const response = await updateRecipe({
                    id: recipeId,
                    data: values,
                }).unwrap();
                setSubmittedPath(`/${path}/${response.id}`);
            } else {
                const response = await createRecipe(values).unwrap();
                setSubmittedPath(`/${path}/${response.id}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onSaveDraft = async (place: 'modal' | 'form') => {
        const isValid = await trigger(['title']);

        if (!isValid) {
            onClose();
            return;
        }

        const values = getValues();

        try {
            await createRecipeDraft(values).unwrap();

            if (place === 'modal') {
                handleContinueNavigation();
            } else {
                setSubmittedPath(Paths.R_SWITCHER);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (recipe && measureUnits) {
            initializeRecipeForm(reset, recipe);
        }
    }, [recipe, measureUnits, reset]);

    useEffect(() => {
        if ((isSuccessCreateRecipeDraft || isSubmitSuccessful) && submittedPath) {
            navigate(submittedPath);
        }
    }, [isSubmitSuccessful, submittedPath, navigate, isSuccessCreateRecipeDraft]);

    return (
        <>
            <form
                onSubmit={formHandleSubmit(onSubmit)}
                style={{ width: '100%' }}
                data-test-id='recipe-form'
            >
                <VStack spacing={10}>
                    <Flex
                        alignItems='start'
                        gap={6}
                        w='100%'
                        flexDirection={isSmallScreen ? 'column' : 'row'}
                    >
                        <RecipeImage control={control} errors={errors} />
                        <RecipeInfo control={control} register={register} errors={errors} />
                    </Flex>
                    <IngredientsSection control={control} register={register} errors={errors} />
                    <StepsSection control={control} register={register} errors={errors} />
                    <FormButtons
                        isSubmitting={isSubmitting}
                        onSaveDraft={() => onSaveDraft('form')}
                        isLoading={isLoading}
                    />
                </VStack>
            </form>

            <ExitWithoutSavingModal
                onSaveDraft={() => onSaveDraft('modal')}
                handleCancelNavigation={handleCancelNavigation}
                handleContinueNavigation={handleContinueNavigation}
                isLoading={isLoading}
                isOpen={isOpen}
            />
        </>
    );
};
