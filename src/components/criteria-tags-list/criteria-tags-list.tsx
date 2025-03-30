import { HStack, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { authors, meats, sides } from '~/mocks/filters';
import { deselectAllergen, selectSelectedAllergens } from '~/redux/features/allergens-slice';
import { selectSelectedAuthors, toggleAuthor } from '~/redux/features/authors-slice';
import {
    selectCategoriesMenu,
    selectSelectedCategories,
    toggleCategory,
    updateSelectedSubCategoriesIds,
} from '~/redux/features/categories-slice';
import { selectSelectedMeats, toggleMeat } from '~/redux/features/meats-slice';
import { setShowedEmptyText } from '~/redux/features/recipes-slice';
import { setSelectedPage } from '~/redux/features/search-slice';
import { selectSelectedSides, toggleSide } from '~/redux/features/sides-slice';
import { Nullable, StrOrNull } from '~/types/common';
import { TagType } from '~/types/type-tags';
import { isArrayWithItems } from '~/utils/is-array-with-items';

import {
    getEnglishAuthor,
    getEnglishFoodItem,
    getEnglishMenuItem,
    getTranslatedAuthor,
    getTranslatedMenuItem,
} from '../drawer/helpers/get-selected-items';

//TODO заменить моки для авторов когда будет коллекция авторов

type CriteriaTagsListProps = Partial<{
    forDrawer: boolean;
    withAllergens: boolean;
}>;

export const CriteriaTagsList = ({
    withAllergens = true,
    forDrawer = false,
}: CriteriaTagsListProps) => {
    const dispatch = useAppDispatch();
    const selectedCategories = useAppSelector(selectSelectedCategories);
    const categories = useAppSelector(selectCategoriesMenu);
    const selectedSides = useAppSelector(selectSelectedSides);
    const selectedAuthors = useAppSelector(selectSelectedAuthors);
    const selectedMeats = useAppSelector(selectSelectedMeats);
    const selectedAllergens = useAppSelector(selectSelectedAllergens);

    const determineTagType = (tag: StrOrNull): Nullable<TagType> => {
        if (tag && selectedAllergens.includes(tag)) {
            return TagType.ALLERGEN;
        }

        const englishCategory = getEnglishMenuItem(tag, categories);
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
            const englishValue = getEnglishMenuItem(tag, categories);
            if (englishValue) {
                dispatch(toggleCategory(englishValue));
                dispatch(updateSelectedSubCategoriesIds());
            }
        },
        [TagType.AUTHOR]: (tag: string) => {
            const englishValue = getEnglishAuthor(tag, authors);
            if (englishValue) dispatch(toggleAuthor(englishValue));
        },
        [TagType.MEAT]: (tag: string) => {
            dispatch(toggleMeat(tag));
        },
        [TagType.SIDE]: (tag: string) => {
            dispatch(toggleSide(tag));
        },
        [TagType.ALLERGEN]: (tag: string) => {
            dispatch(deselectAllergen(tag));
        },
    };

    const deleteFilter = (tag: StrOrNull, type: Nullable<TagType>) => {
        if (type && actionMapper[type] && tag) {
            actionMapper[type](tag);
            dispatch(setSelectedPage(1));
        }
        if (!forDrawer) {
            dispatch(setShowedEmptyText(false));
            dispatch(setSelectedPage(1));
        }
    };

    const tags = [
        ...getTranslatedMenuItem(selectedCategories, categories),
        ...getTranslatedAuthor(selectedAuthors, authors),
        ...selectedMeats,
        ...selectedSides,
    ];

    const tagsForRender = withAllergens ? tags.concat(selectedAllergens) : tags;

    return isArrayWithItems(tagsForRender) ? (
        <HStack spacing={4} pt={8} pb={8} flexWrap='wrap'>
            {tagsForRender.map((tag) => {
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
    ) : null;
};
