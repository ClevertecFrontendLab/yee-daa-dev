import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../hooks/typed-react-redux-hooks';
import { selectCategoriesMenu } from '../../redux/features/categories-slice';
import {
    selectChoosenCategory,
    setChoosenCategory,
} from '../../redux/features/choosen-category-slice';
import { Recipe } from '../../types/recipe';
import { RecipeCardList } from '../recipes-card-list/recipes-card-list';

export const KitchenTabs: FC<{ recipeList: Recipe[] }> = ({ recipeList }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const selectedCategory = useAppSelector(selectChoosenCategory);
    const categories = useAppSelector(selectCategoriesMenu);

    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const subcategories = categories
        .filter((cat) => cat.category === selectedCategory.category)
        .flatMap((category) => category.subItems);

    const handleTabChange = (index: number) => {
        setSelectedTabIndex(index);
        const chosenSubCategory = subcategories[index];

        if (chosenSubCategory) {
            dispatch(
                setChoosenCategory({
                    ...selectedCategory,
                    choosenSubCategory: chosenSubCategory,
                }),
            );

            const subCategoryPath = `/${selectedCategory.category}/${chosenSubCategory.category}`;
            navigate(subCategoryPath);
        }
    };

    const currentSubcategory = subcategories[selectedTabIndex]?.category ?? '';

    const filteredRecipes = recipeList.filter((recipe) =>
        recipe.subcategory.includes(currentSubcategory),
    );

    useEffect(() => {
        const initialIndex = subcategories.findIndex(
            (subcat) => subcat?.category === selectedCategory.choosenSubCategory?.category,
        );
        setSelectedTabIndex(initialIndex >= 0 ? initialIndex : 0);
    }, [selectedCategory, subcategories]);

    useEffect(() => {
        const initialIndex = subcategories.findIndex(
            (subcat) => subcat?.category === selectedCategory.choosenSubCategory?.category,
        );
        if (initialIndex !== -1) {
            setSelectedTabIndex(initialIndex);
        }
    }, [selectedCategory.choosenSubCategory, subcategories]);

    return (
        <Tabs mb={{ base: 8, md: 10 }} index={selectedTabIndex} onChange={handleTabChange}>
            <Box
                ml='auto'
                mr='auto'
                overflow='auto'
                sx={{
                    scrollbarWidth: 'none',
                    '::-webkit-scrollbar': {
                        display: 'none',
                    },
                    WebkitOverflowScrolling: 'touch',
                }}
                display='flex'
                justifyContent='center'
            >
                <TabList
                    w='max-content'
                    justifyContent='center'
                    flexWrap={{ base: 'nowrap', md: 'wrap' }}
                >
                    {subcategories.map((subcategory) => (
                        <Tab
                            key={subcategory?.category}
                            flexShrink={0}
                            color='lime.800'
                            _selected={{
                                color: 'lime.600',
                                borderColor: 'lime.600',
                            }}
                        >
                            {subcategory?.title}
                        </Tab>
                    ))}
                </TabList>
            </Box>
            <TabPanels>
                {subcategories.map((subcategory) => (
                    <TabPanel p={0} key={subcategory?.category}>
                        <RecipeCardList recipeList={filteredRecipes} />
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};
