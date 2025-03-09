import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { FC, useEffect, useMemo, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router';

import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useDetectParams } from '~/hooks/use-detect-params';
import { useGetRecipeByCategoryIdInfiniteInfiniteQuery } from '~/redux/api/services/recipes-api';
import { selectCategoriesMenu } from '~/redux/features/categories-slice';

import { AppLoader } from '../app-loader';
import { RecipeCardList } from '../recipes-card-list/recipes-card-list';

const KITCHEN_TABS_RECIPE_LIMIT = 8;

export const KitchenTabs: FC = () => {
    const navigate = useNavigate();
    const { selectedCategory, selectedSubCategory } = useDetectParams();

    const {
        data: recipesData,
        fetchNextPage,
        isFetching,
    } = useGetRecipeByCategoryIdInfiniteInfiniteQuery(
        { id: selectedSubCategory?.id as string, limit: KITCHEN_TABS_RECIPE_LIMIT },
        { skip: !selectedSubCategory?.id },
    );

    const loadMore = () => fetchNextPage();

    const totalPages = recipesData?.pages[0]?.meta?.totalPages ?? 1;
    const currentPage = recipesData?.pages.at(-1)?.meta?.page ?? 1;
    const recipesForRender = recipesData?.pages?.flatMap((elem) => elem.data) ?? [];

    const categories = useAppSelector(selectCategoriesMenu, shallowEqual);
    const currSubCategories = useMemo(
        () => categories?.find((elem) => elem.id === selectedCategory?.id)?.subCategories ?? [],
        [categories, selectedCategory?.id],
    );

    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const handleTabChange = (index: number) => {
        setSelectedTabIndex(index);
        const chosenSubCategory = currSubCategories[index];

        if (chosenSubCategory && selectedCategory) {
            const subCategoryPath = `/${selectedCategory.category}/${chosenSubCategory.category}`;
            navigate(subCategoryPath);
        }
    };

    useEffect(() => {
        if (!selectedSubCategory) return;

        const foundActiveIndex = currSubCategories.findIndex(
            (subCat) => subCat.id === selectedSubCategory.id,
        );
        if (foundActiveIndex === -1) return;

        setSelectedTabIndex(foundActiveIndex);
    }, [currSubCategories, selectedSubCategory]);

    return (
        <>
            {isFetching && <AppLoader isOpen={true} />}
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
                        {currSubCategories.map((subcategory) => (
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
                    {currSubCategories.map((subcategory) => (
                        <TabPanel p={0} key={subcategory?.category}>
                            <RecipeCardList
                                recipeList={recipesForRender}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                loadMoreCallback={loadMore}
                            />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </>
    );
};
