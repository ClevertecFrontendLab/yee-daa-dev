import { FC, useState } from 'react';

import { BlogSection } from '../../components/blog-section/blog-section.tsx';
import { Carousel } from '../../components/carousel/carousel.tsx';
import { FavouritesBlock } from '../../components/favourites-block/favourites-block.tsx';
import { KitchenTabs } from '../../components/kitchen-tabs/kitchen-tabs.tsx';
import { RecipeCardList } from '../../components/recipes-card-list/recipes-card-list.tsx';
import { RelevantKitchen } from '../../components/relevant-kitchen';
import { SectionBox } from '../../components/section-box/section-box.tsx';
import { SectionHeader } from '../../components/section-header';
import { favouritesRecipes, recipes } from '../../mocks/recipes';
import { Recipe } from '../../types/recipe.ts';

type KitchenPageProps = {
    pageType: string;
    relevantTitle?: string;
    relevantDesc?: string;
};

export const KitchenPage: FC<KitchenPageProps> = ({ pageType, relevantTitle, relevantDesc }) => {
    const [filteredRecipes, setFilteredRecipes] = useState([] as Recipe[]);
    const [inputValue, setInputValue] = useState('');

    const categoryRecipes = relevantTitle
        ? recipes.filter((recipe) => recipe.category === relevantTitle)
        : recipes;

    const getNextCategoryTitle = (recipes: Recipe[], relevantTitle?: string) => {
        const index = recipes.findIndex((recipe) => recipe.category === relevantTitle);
        return recipes[index + 1].category;
    };

    const nextCategoryTitle = getNextCategoryTitle(recipes, relevantTitle);

    const nextCategoryRecipes = nextCategoryTitle
        ? recipes.filter((recipe) => recipe.category === nextCategoryTitle)
        : [];

    const handleSearch = (inputValue: string) => {
        setInputValue(inputValue);
        const nameFiltered = categoryRecipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(inputValue.toLowerCase()),
        );

        setFilteredRecipes(nameFiltered);
    };

    return (
        <>
            <SectionHeader onSearch={handleSearch} />

            {filteredRecipes.length ? (
                <RecipeCardList recipeList={filteredRecipes} inputValue={inputValue} />
            ) : (
                <>
                    {pageType === 'category' && <KitchenTabs recipeList={categoryRecipes} />}
                    {pageType === 'juiciest' && (
                        <SectionBox>
                            <RecipeCardList recipeList={favouritesRecipes} />
                        </SectionBox>
                    )}
                    {pageType === 'main' && (
                        <>
                            <Carousel />
                            <FavouritesBlock />
                            <BlogSection />
                        </>
                    )}
                </>
            )}

            <RelevantKitchen
                recipes={nextCategoryRecipes}
                title={nextCategoryTitle}
                description={relevantDesc}
            />
        </>
    );
};
