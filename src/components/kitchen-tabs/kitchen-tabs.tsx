import { TabList, TabPanel } from '@chakra-ui/icons';
import { Tab, TabPanels, Tabs } from '@chakra-ui/react';

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
        <Tabs maxW='1020px' ml='auto' mr='auto'>
            <TabList
                sx={{
                    scrollbarWidth: 'none',
                    '::-webkit-scrollbar': {
                        display: 'none',
                    },
                    '-webkit-overflow-scrolling': 'touch',
                }}
            >
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
            <TabPanels>
                {subcategories.map((subcategory) => (
                    <TabPanel key={subcategory} flexShrink={0}>
                        {subcategory}
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};
