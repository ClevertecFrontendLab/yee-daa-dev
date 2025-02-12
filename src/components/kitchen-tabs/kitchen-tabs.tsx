import { Button, SimpleGrid, TabList, TabPanel } from '@chakra-ui/icons';
import { Box, Center, Tab, TabPanels, Tabs } from '@chakra-ui/react';

import { veganRecipes } from '../../mocks/vegan-recipes.ts';
import { FoodCard } from '../food-card';

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

export const KitchenTabs = () => {
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
                        <SimpleGrid
                            columns={2}
                            gap={{ base: 3, md: 4 }}
                            maxWidth='100%'
                            minChildWidth={{ base: '300px', md: '450px' }}
                        >
                            {veganRecipes.map((el) => (
                                <FoodCard {...el} key={el.id} />
                            ))}
                        </SimpleGrid>
                        <Center mt={4}>
                            <Button bg={'lime.400'}>Загрузить ещё</Button>
                        </Center>
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};
