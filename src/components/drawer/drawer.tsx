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
import { authors as mockAuthors } from '~/mocks/filters';
import { deselectAllergen, selectSelectedAllergens } from '~/redux/features/allergens-slice';
import { selectSelectedAuthors, toggleAuthor } from '~/redux/features/authors-slice';
import {
    selectCategoriesMenu,
    selectSelectedCategories,
    toggleCategory,
} from '~/redux/features/categories-slice';
import { closeDrawer, selectDrawer } from '~/redux/features/filter-drawer-slice';
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

    //TODO заменить на данные из запроса для авторов когда будет коллекция с авторами
    const authors = mockAuthors;
    const meats = useAppSelector(selectMeats);
    const sides = useAppSelector(selectSides);

    const selectedCategories = useAppSelector(selectSelectedCategories);
    const selectedAuthors = useAppSelector(selectSelectedAuthors);
    const selectedMeats = useAppSelector(selectSelectedMeats);
    const selectedSides = useAppSelector(selectSelectedSides);
    const selectedAllergens = useAppSelector(selectSelectedAllergens);

    const onClose = () => dispatch(closeDrawer());

    const determineTagType = (tag: string | null): TagType | null => {
        if (tag && selectedAllergens.includes(tag)) {
            return TagType.ALLERGEN;
        }

        const englishCategory = getEnglishMenuItem(tag, allCategories);
        if (englishCategory) return TagType.CATEGORY;

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

    const deleteFilter = (tag: string | null, type: TagType | null) => {
        if (type && actionMapper[type] && tag) {
            actionMapper[type](tag);
        }
    };

    const tags = [
        ...getTranslatedMenuItem(selectedCategories, allCategories),
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
            <DrawerContent className={styles.drawer} data-test-id='filter-drawer'>
                <DrawerHeader className={styles.drawerHeader}>
                    <span className={styles.drawerHeading}>Фильтр</span>
                    <CloseIcon
                        data-test-id='close-filter-drawer'
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
                        <DrawerMenu items={authors} filterTitle={FILTER_TITLES.AUTHOR_SEARCH} />
                    </Stack>
                    <Stack spacing={6}>
                        <DrawerCheckboxGroup filterTitle={FILTER_TITLES.MEAT} items={meats} />
                        <DrawerCheckboxGroup filterTitle={FILTER_TITLES.SIDE} items={sides} />
                        <AllergenSelect fromFilter={true} />
                    </Stack>

                    <HStack spacing={4} pt={8} pb={8} flexWrap='wrap'>
                        {tags.map((tag) => {
                            const type = determineTagType(tag ?? '');
                            return (
                                <Tag
                                    data-test-id='filter-tag'
                                    bg='var(--chakra-colors-lime-100)'
                                    border='1px solid var(--chakra-colors-lime-400)'
                                    size='md'
                                    key={tag}
                                    variant='solid'
                                    colorScheme='green'
                                    color='#207E00'
                                >
                                    <TagLabel>{tag}</TagLabel>
                                    <TagCloseButton onClick={() => deleteFilter(tag ?? '', type)} />
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
