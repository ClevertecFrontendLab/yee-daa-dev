import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    Menu,
    MenuButton,
    MenuItem as ChakraMenuItem,
    MenuList,
} from '@chakra-ui/react';
import { FC, useState } from 'react';

import { FILTER_TITLES } from '../../constants/filters';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-react-redux-hooks';
import { selectSelectedAuthors, toggleAuthor } from '../../redux/features/authors-slice';
import { selectSelectedCategories, toggleCategory } from '../../redux/features/categories-slice';
import { selectSelectedCuisines, toggleCuisine } from '../../redux/features/cuisines-slice';
import { MenuItem } from '../../types/category';
import { FoodItem } from '../../types/food-item';
import { UserProps } from '../../types/user';
import { getSelectedItems } from './helpers/get-selected-items';

type MenuItemProps = {
    items: (FoodItem | MenuItem | UserProps)[];
    filterTitle: string;
};

const displayConfig = {
    [FILTER_TITLES.CATEGORY]: {
        key: 'category',
        displayName: 'title',
    },
    [FILTER_TITLES.CUISINE]: {
        key: 'id',
        displayName: 'label',
    },
    [FILTER_TITLES.AUTHOR_SEARCH]: {
        key: 'login',
        displayName: (item: UserProps) => `${item.firstName} ${item.lastName}`,
    },
};

export const DrawerMenu: FC<MenuItemProps> = ({ items, filterTitle }) => {
    const { key, displayName } = displayConfig[filterTitle] || {};
    const [isBtnOpen, setIsBtnOpen] = useState(false);
    const dispatch = useAppDispatch();
    const selectedCategories = useAppSelector(selectSelectedCategories);
    const selectedCuisines = useAppSelector(selectSelectedCuisines);
    const selectedAuthors = useAppSelector(selectSelectedAuthors);

    const selectedItems = getSelectedItems(filterTitle, {
        selectedCategories,
        selectedCuisines,
        selectedAuthors,
    });

    return (
        <Menu isLazy={true} matchWidth={true} closeOnSelect={false}>
            <MenuButton
                p={2}
                as={Button}
                color='blackAlpha.700'
                fontWeight={400}
                fontSize='md'
                outline='none'
                background={'--chakra-ring-offset-color'}
                border='1px solid var(--chakra-colors-blackAlpha-200)'
                textAlign='left'
                onClick={() => setIsBtnOpen(!isBtnOpen)}
                rightIcon={isBtnOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            >
                {filterTitle}
            </MenuButton>
            <MenuList>
                {items.map((item, index) => {
                    const displayNameValue =
                        typeof displayName === 'function'
                            ? displayName(item as UserProps)
                            : (item as Record<string, string>)[displayName];

                    const keyValue = (item as Record<string, string>)[key];

                    const itemKey =
                        filterTitle === FILTER_TITLES.AUTHOR_SEARCH
                            ? (item as UserProps).login
                            : filterTitle === FILTER_TITLES.CUISINE
                              ? (item as FoodItem).value
                              : (item as MenuItem).category;

                    const isChecked = selectedItems?.includes(itemKey);

                    const handleCheckboxChange = () => {
                        if (filterTitle === FILTER_TITLES.CATEGORY) {
                            dispatch(toggleCategory(itemKey));
                        }
                        if (filterTitle === FILTER_TITLES.CUISINE) {
                            dispatch(toggleCuisine(itemKey));
                        }
                        if (filterTitle === FILTER_TITLES.AUTHOR_SEARCH) {
                            dispatch(toggleAuthor(itemKey));
                        }
                    };

                    return (
                        <ChakraMenuItem
                            key={keyValue}
                            fontSize='lg'
                            bg={index % 2 === 0 ? 'gray.100' : 'white'}
                            _hover={{ bg: 'var(--chakra-colors-lime-200)' }}
                        >
                            <Checkbox
                                borderColor='var(--chakra-colors-lime-300)'
                                iconColor='black'
                                onChange={handleCheckboxChange}
                                isChecked={isChecked}
                                sx={{
                                    '&[data-checked] .chakra-checkbox__control': {
                                        backgroundColor: 'var(--chakra-colors-lime-300)',
                                        borderColor: 'var(--chakra-colors-lime-300)',
                                    },
                                }}
                            >
                                {displayNameValue}
                            </Checkbox>
                        </ChakraMenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
};
