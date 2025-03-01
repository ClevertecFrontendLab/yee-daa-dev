import { CloseIcon } from '@chakra-ui/icons';
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Stack,
    Tag,
    TagCloseButton,
    TagLabel,
} from '@chakra-ui/react';

import { FILTER_TITLES } from '~/constants/filters';
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { deselectAllergen, selectSelectedAllergens } from '~/redux/features/allergens-slice';
import { selectAuthors, selectSelectedAuthors, toggleAuthor } from '~/redux/features/authors-slice';
import {
    selectCategoriesMenu,
    selectSelectedCategories,
    toggleCategory,
} from '~/redux/features/categories-slice';
import {
    selectCuisines,
    selectSelectedCuisines,
    toggleCuisine,
} from '~/redux/features/cuisines-slice';
import { closeDrawer, selectDrawer } from '~/redux/features/drawer';
import { selectMeats, selectSelectedMeats, toggleMeat } from '~/redux/features/meats-slice';
import { selectSelectedSides, selectSides, toggleSide } from '~/redux/features/sides-slice';
import { TagType } from '~/types/type-tags';

import { AllergenSelect } from '../search-block/allergen-select';
import { DrawerCheckboxGroup } from './dawer-checkbox-group';
import styles from './drawer.module.css';
import { FilterDrawerFooter } from './drawer-footer';
import { DrawerMenu } from './drawer-menu';
import {
    getEnglishAuthor,
    getEnglishFoodItem,
    getEnglishMenuItem,
    getTranslatedAuthor,
    getTranslatedFoodItem,
    getTranslatedMenuItem,
} from './helpers/get-selected-items';

export const FilterDrawer = () => {
    const dispatch = useAppDispatch();
    const isOpenDrawer = useAppSelector(selectDrawer);
    const allCategories = useAppSelector(selectCategoriesMenu);
    const cuisines = useAppSelector(selectCuisines);
    const authors = useAppSelector(selectAuthors);
    const meats = useAppSelector(selectMeats);
    const sides = useAppSelector(selectSides);

    const selectedCategories = useAppSelector(selectSelectedCategories);
    const selectedCuisines = useAppSelector(selectSelectedCuisines);
    const selectedAuthors = useAppSelector(selectSelectedAuthors);
    const selectedMeats = useAppSelector(selectSelectedMeats);
    const selectedSides = useAppSelector(selectSelectedSides);
    const selectedAllergens = useAppSelector(selectSelectedAllergens);

    const onClose = () => {
        dispatch(closeDrawer());
    };

    const determineTagType = (tag: string): TagType | null => {
        if (selectedAllergens.includes(tag)) {
            return TagType.ALLERGEN;
        }

        const englishCategory = getEnglishMenuItem(tag, allCategories);
        if (englishCategory) return TagType.CATEGORY;

        const englishCuisine = getEnglishFoodItem(tag, cuisines);
        if (englishCuisine) return TagType.CUISINE;

        const englishAuthor = getEnglishAuthor(tag, authors);
        if (englishAuthor) return TagType.AUTHOR;

        const englishMeat = getEnglishFoodItem(tag, meats);
        if (englishMeat) return TagType.MEAT;

        const englishSide = getEnglishFoodItem(tag, sides);
        if (englishSide) return TagType.SIDE;

        return null;
    };

    const actionMapper = {
        [TagType.CATEGORY]: (tag: string) => {
            const englishValue = getEnglishMenuItem(tag, allCategories);
            if (englishValue) dispatch(toggleCategory(englishValue));
        },
        [TagType.CUISINE]: (tag: string) => {
            const englishValue = getEnglishFoodItem(tag, cuisines);
            if (englishValue) dispatch(toggleCuisine(englishValue));
        },
        [TagType.AUTHOR]: (tag: string) => {
            const englishValue = getEnglishAuthor(tag, authors);
            if (englishValue) dispatch(toggleAuthor(englishValue));
        },
        [TagType.MEAT]: (tag: string) => {
            const englishValue = getEnglishFoodItem(tag, meats);
            if (englishValue) dispatch(toggleMeat(englishValue));
        },
        [TagType.SIDE]: (tag: string) => {
            const englishValue = getEnglishFoodItem(tag, sides);
            if (englishValue) dispatch(toggleSide(englishValue));
        },
        [TagType.ALLERGEN]: (tag: string) => {
            dispatch(deselectAllergen(tag));
        },
    };

    const deleteFilter = (tag: string, type: TagType | null) => {
        if (type && actionMapper[type]) {
            actionMapper[type](tag);
        }
    };

    const tags = [
        ...getTranslatedMenuItem(selectedCategories, allCategories),
        ...getTranslatedFoodItem(selectedCuisines, cuisines),
        ...getTranslatedAuthor(selectedAuthors, authors),
        ...getTranslatedFoodItem(selectedMeats, meats),
        ...getTranslatedFoodItem(selectedSides, sides),
        ...selectedAllergens,
    ];

    return (
        <Drawer
            isOpen={isOpenDrawer}
            placement='right'
            onClose={onClose}
            size={{ base: '100%', sm: 'sm', lg: 'md' }}
        >
            <DrawerOverlay onClick={onClose} />
            <DrawerContent className={styles.drawer}>
                <DrawerHeader className={styles.drawerHeader}>
                    <span className={styles.drawerHeading}>Фильтр</span>
                    <CloseIcon
                        bg='black'
                        borderRadius='50%'
                        color='white'
                        p={1}
                        w={6}
                        h={6}
                        onClick={onClose}
                        cursor='pointer'
                    />
                </DrawerHeader>
                <DrawerBody className={styles.drawerBody}>
                    <Stack spacing={6}>
                        <DrawerMenu items={allCategories} filterTitle={FILTER_TITLES.CATEGORY} />
                        <DrawerMenu items={cuisines} filterTitle={FILTER_TITLES.CUISINE} />
                        <DrawerMenu items={authors} filterTitle={FILTER_TITLES.AUTHOR_SEARCH} />
                    </Stack>
                    <Stack spacing={6}>
                        <DrawerCheckboxGroup filterTitle={FILTER_TITLES.MEAT} items={meats} />
                        <DrawerCheckboxGroup filterTitle={FILTER_TITLES.SIDE} items={sides} />
                        <AllergenSelect isfromFilter={true} />
                    </Stack>

                    <HStack spacing={4} pt={8} pb={8} flexWrap='wrap'>
                        {tags.map((tag) => {
                            const type = determineTagType(tag);
                            return (
                                <Tag
                                    bg='var(--chakra-colors-lime-100)'
                                    border='1px solid var(--chakra-colors-lime-400)'
                                    size='md'
                                    key={tag}
                                    variant='solid'
                                    colorScheme='green'
                                    color='#207E00'
                                >
                                    <TagLabel>{tag}</TagLabel>
                                    <TagCloseButton onClick={() => deleteFilter(tag, type)} />
                                </Tag>
                            );
                        })}
                    </HStack>
                </DrawerBody>
                <FilterDrawerFooter />
            </DrawerContent>
        </Drawer>
    );
};
