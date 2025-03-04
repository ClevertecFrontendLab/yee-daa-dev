import { FC, useEffect, useState } from 'react';

import { BlogSection } from '~/components/blog-section/blog-section.tsx';
import { Carousel } from '~/components/carousel/carousel.tsx';
import { FavouritesBlock } from '~/components/favourites-block/favourites-block.tsx';
import { KitchenTabs } from '~/components/kitchen-tabs/kitchen-tabs.tsx';
import { RecipeCardList } from '~/components/recipes-card-list/recipes-card-list.tsx';
import { RelevantKitchen } from '~/components/relevant-kitchen';
import { SectionBox } from '~/components/section-box/section-box.tsx';
import { SectionHeader } from '~/components/section-header';
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { useDetectParams } from '~/hooks/use-detect-params.ts';
import { Recipe } from '~/redux/api/types/recipes.ts';
import {
    selectFilteredByAllergens,
    selectisfromFilter,
    selectSelectedAllergens,
    setFilteredByAllergens,
} from '~/redux/features/allergens-slice.ts';
import { selectCategoriesMenu } from '~/redux/features/categories-slice.ts';
import { selectFilteredRecipes, selectRecipes } from '~/redux/features/recipies-slice.ts';
import {
    selectInputValue,
    selectMatchedRecipes,
    setInputValue,
    setMatchedRecipes,
} from '~/redux/features/search-slice.ts';
import { PageType } from '~/types/page.ts';
import { filterRecipes } from '~/utils/filter-recipes.ts';

import { filterRecipesByTitle } from './helpers/filter-by-title.ts';
import { getCategoryRecipes, getFavoritesRecipes } from './helpers/get-recipes.ts';

type KitchenPageProps = {
    pageType: PageType;
    relevantTitle?: string;
    relevantDesc?: string;
};

export const KitchenPage: FC<KitchenPageProps> = ({ pageType }) => {
    const { selectedCategory, selectedSubCategory } = useDetectParams();
    const dispatch = useAppDispatch();
    const recipes = useAppSelector(selectRecipes);

    const categories = useAppSelector(selectCategoriesMenu);
    const matchedRecipes = useAppSelector(selectMatchedRecipes);
    const selectedAllergens = useAppSelector(selectSelectedAllergens);
    const filteredByAllergens = useAppSelector(selectFilteredByAllergens);
    const filteredRecipes = useAppSelector(selectFilteredRecipes);
    const isfromFilter = useAppSelector(selectisfromFilter);

    const [relevantRecipes, setRelevantRecipes] = useState([] as Recipe[]);
    const [relevantTitle, setRelevantTitle] = useState('');
    const [relevantDesc, setRelevantDesc] = useState('');
    const [startSearch, setStartSearch] = useState(false);
    const searchValue = useAppSelector(selectInputValue);

    const isMainPage = pageType === PageType.Main;
    const isCategoryPage = pageType === PageType.Category;
    const isJuiciestPage = pageType === PageType.Juiciest;

    const favoritesRecipes = getFavoritesRecipes(recipes);
    const categoryRecipes = getCategoryRecipes(recipes, selectedCategory, selectedSubCategory);

    const searchRecipes: Record<PageType, Recipe[]> = {
        main: recipes,
        juiciest: favoritesRecipes,
        category: categoryRecipes,
    };

    const handleSearch = (inputValue: string) => {
        setStartSearch(true);

        let nameFiltered: Recipe[] | undefined;

        if (filteredRecipes.length) {
            nameFiltered = filterRecipesByTitle(filteredRecipes, inputValue);
        } else if (filteredByAllergens.length) {
            nameFiltered = filterRecipesByTitle(filteredByAllergens, inputValue);
        } else {
            nameFiltered = filterRecipesByTitle(searchRecipes[pageType] || [], inputValue);
        }

        dispatch(setMatchedRecipes(nameFiltered));
    };

    useEffect(() => {
        dispatch(setInputValue(''));
        setStartSearch(false);
    }, [dispatch, selectedCategory]);

    useEffect(() => {
        if (!searchValue) {
            dispatch(setMatchedRecipes([]));
            setStartSearch(false);
        }
    }, [dispatch, searchValue]);

    useEffect(() => {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];

        setRelevantTitle(randomCategory.title);
        setRelevantDesc(randomCategory.description ?? '');

        const relatedRecipes = recipes.filter((recipe) =>
            recipe.categoryIds.includes(randomCategory.category),
        );

        setRelevantRecipes(relatedRecipes);
    }, [categories, recipes]);

    useEffect(() => {
        const recipesToFilter =
            (filteredRecipes.length && filteredRecipes) ||
            (categoryRecipes.length && categoryRecipes) ||
            (recipes.length && recipes) ||
            [];

        if (selectedAllergens.length && !isfromFilter) {
            const getAllergensRecipes = () => filterRecipes(recipesToFilter, selectedAllergens);

            const allergensRecipes = getAllergensRecipes();

            dispatch(setFilteredByAllergens(allergensRecipes));
        } else {
            dispatch(setFilteredByAllergens([]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAllergens]);

    return (
        <>
            <SectionHeader onSearch={handleSearch} pageType={pageType} startSearch={startSearch} />

            {startSearch && matchedRecipes.length > 0 && (
                <RecipeCardList recipeList={matchedRecipes} />
            )}
            {!startSearch && (
                <>
                    {isfromFilter && filteredRecipes.length > 0 && (
                        <RecipeCardList recipeList={filteredRecipes} />
                    )}
                    {!isfromFilter && filteredByAllergens.length > 0 && (
                        <RecipeCardList recipeList={filteredByAllergens} />
                    )}
                    {!isfromFilter && !filteredByAllergens.length && filteredRecipes.length > 0 && (
                        <RecipeCardList recipeList={filteredRecipes} />
                    )}
                    {!filteredRecipes.length && !filteredByAllergens.length && (
                        <>
                            {isCategoryPage && <KitchenTabs recipeList={categoryRecipes} />}
                            {isJuiciestPage && (
                                <SectionBox>
                                    <RecipeCardList recipeList={favoritesRecipes} />
                                </SectionBox>
                            )}
                            {(isMainPage || !selectedCategory) && (
                                <>
                                    <Carousel />
                                    <FavouritesBlock />
                                    <BlogSection />
                                </>
                            )}
                        </>
                    )}
                </>
            )}

            <RelevantKitchen
                recipes={relevantRecipes}
                title={relevantTitle}
                description={relevantDesc}
            />
        </>
    );
};
