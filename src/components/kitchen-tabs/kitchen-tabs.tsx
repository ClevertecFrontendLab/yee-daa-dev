import { TabList, TabPanel } from '@chakra-ui/icons';
import { Box, Tab, TabPanels, Tabs } from '@chakra-ui/react';
import { FC } from 'react';

import { Recipe } from '../../types/recipe';
import { RecipeCardList } from '../recipes-card-list/recipes-card-list';

const subcategories = [
    'Закуски',
    'Первые блюда',
    'Вторые блюда',
    'Гарниры',
    'Десерты',
    'Выпечка',
    'Сыроедческие блюда',
    'Напитки',
];

// !НЕАДАПТИВНЫЕ ТАБЫ :harold-pain:

export const KitchenTabs: FC<{ recipeList: Recipe[] }> = ({ recipeList }) => {
    return (
        <Tabs mb={{ base: 8, md: 10 }}>
            <Box
                maxW='1020px'
                ml='auto'
                mr='auto'
                overflow='auto'
                sx={{
                    scrollbarWidth: 'none',
                    '::-webkit-scrollbar': {
                        display: 'none',
                    },
                    '-webkit-overflow-scrolling': 'touch',
                }}
            >
                <TabList w='max-content'>
                    {subcategories.map((subcategory) => (
                        <Tab
                            key={subcategory}
                            flexShrink={0}
                            color='lime.800'
                            _selected={{
                                color: 'lime.600',
                                borderColor: 'lime.600',
                            }}
                        >
                            {subcategory}
                        </Tab>
                    ))}
                </TabList>
            </Box>
            <TabPanels>
                {subcategories.map((subcategory) => (
                    <TabPanel key={subcategory} flexShrink={0}>
                        <RecipeCardList recipeList={recipeList} />
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};
