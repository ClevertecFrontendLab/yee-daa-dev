import { Heading } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

import { BlogSection } from '../../components/blog-section/blog-section.tsx';
import { Carousel } from '../../components/carousel/carousel.tsx';
import { FavouritesBlock } from '../../components/favourites-block/favourites-block.tsx';
import { KitchenTabs } from '../../components/kitchen-tabs/kitchen-tabs.tsx';
import { RecipeCardList } from '../../components/recipes-card-list/recipes-card-list.tsx';
import { RelevantKitchen } from '../../components/relevant-kitchen';
import { SectionBox } from '../../components/section-box/section-box.tsx';
import { SectionHeader } from '../../components/section-header';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-react-redux-hooks.ts';
import { selectCategoriesMenu } from '../../redux/features/categories-slice.ts';
import { selectChoosenCategory } from '../../redux/features/choosen-category-slice.ts';
import { selectRecipes } from '../../redux/features/recipies-slice.ts';
import {
    selectFilteredRecipes,
    selectInputValue,
    setFilteredRecipes,
    setInputValue,
} from '../../redux/features/search-slice.ts';
import { PageType } from '../../types/page.ts';
import { Recipe } from '../../types/recipe.ts';
import { getCategoryRecipes, getFavouritesRecipes } from './helpers/get-recipes.ts';

type KitchenPageProps = {
    pageType: PageType;
    relevantTitle?: string;
    relevantDesc?: string;
};

export const KitchenPage: FC<KitchenPageProps> = ({ pageType }) => {
    const dispatch = useAppDispatch();
    const recipes = useAppSelector(selectRecipes);
    const selectedCategory = useAppSelector(selectChoosenCategory);
    const categories = useAppSelector(selectCategoriesMenu);
    const filteredRecipes = useAppSelector(selectFilteredRecipes);

    const [relevantRecipes, setRelevantRecipes] = useState([] as Recipe[]);
    const [relevantTitle, setRelevantTitle] = useState('');
    const [relevantDesc, setRelevantDesc] = useState('');
    const [startSearch, setStartSearch] = useState(false);
    const searchValue = useAppSelector(selectInputValue);

    const isMainPage = pageType === PageType.Main;
    const isCategoryPage = pageType === PageType.Category;
    const isJuiciestPage = pageType === PageType.Juiciest;

    const favouritesRecipes = getFavouritesRecipes(recipes);
    const categoryRecipes = getCategoryRecipes(recipes, selectedCategory);

    const searchRecipes: Record<PageType, Recipe[]> = {
        main: recipes,
        juiciest: favouritesRecipes,
        category: categoryRecipes,
    };

    const handleSearch = (inputValue: string) => {
        setStartSearch(true);
        const nameFiltered = searchRecipes[pageType]?.filter((recipe) =>
            recipe.title.toLowerCase().includes(inputValue.toLowerCase()),
        );

        dispatch(setFilteredRecipes(nameFiltered));
    };

    useEffect(() => {
        dispatch(setInputValue(''));
    }, [selectedCategory]);

    useEffect(() => {
        if (!searchValue) {
            dispatch(setFilteredRecipes([]));
            setStartSearch(false);
        }
    }, [searchValue]);

    useEffect(() => {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];

        setRelevantTitle(randomCategory.title);
        setRelevantDesc(randomCategory.description ?? '');

        const relatedRecipes = recipes.filter((recipe) =>
            recipe.category.includes(randomCategory.category),
        );

        setRelevantRecipes(relatedRecipes);
    }, [categories, recipes]);

    return (
        <>
            <SectionHeader onSearch={handleSearch} pageType={pageType} />

            {filteredRecipes.length ? (
                <RecipeCardList recipeList={filteredRecipes} />
            ) : (
                startSearch &&
                !filteredRecipes.length && (
                    <SectionBox>
                        <Heading
                            fontSize={{ base: 'xl', xl: '2xl' }}
                            lineHeight='none'
                            textAlign='center'
                        >
                            По вашему запросу ничего не найдено...
                        </Heading>
                    </SectionBox>
                )
            )}

            {!startSearch && (
                <>
                    {isCategoryPage && <KitchenTabs recipeList={categoryRecipes} />}
                    {isJuiciestPage && (
                        <SectionBox>
                            <RecipeCardList recipeList={favouritesRecipes} />
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

            <RelevantKitchen
                recipes={relevantRecipes}
                title={relevantTitle}
                description={relevantDesc}
            />
        </>
    );
};
