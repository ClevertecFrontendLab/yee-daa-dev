import { IconButton, InputGroup, InputRightElement, SearchIcon, Stack } from '@chakra-ui/icons';
import { Flex, Input } from '@chakra-ui/react';
import { ChangeEventHandler, FC, useState } from 'react';

import { useIsTablet } from '~/hooks/media-query.ts';
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { useLazyGetAllRecipesMergeQuery } from '~/redux/api/services/recipes-api/index.ts';
import { selectSelectedAllergens } from '~/redux/features/allergens-slice.ts';
import { selectSelectedSubCategoriesIds } from '~/redux/features/categories-slice.ts';
import { openDrawer, setIsFiltering } from '~/redux/features/filter-drawer-slice.js';
import { selectSelectedMeats } from '~/redux/features/meats-slice.ts';
import { selectFilteredRecipes, selectShowEmptyText } from '~/redux/features/recipes-slice.ts';
import { selectInputValue, setInputValue } from '~/redux/features/search-slice.ts';
import { selectSelectedSides } from '~/redux/features/sides-slice.ts';
import { isArrayWithItems } from '~/utils/is-array-with-items.ts';

import { getRequestParams } from '../drawer/helpers/get-request-params.ts';
import { FilterIcon } from '../icons/filter-icon.tsx';
import { Loader } from '../loader/loader.tsx';
import { AllergenSelect } from './allergen-select/allergen-select.tsx';
import { getBorderColor } from './allergen-select/helpers/get-border-color.ts';

type SearchBlockProps = {
    onInputFocus: () => void;
    onInputBlur: () => void;
    onSearchCb: () => void;
};

const MIN_SEARCH_LENGTH = 3;

export const SearchBlock: FC<SearchBlockProps> = ({ onInputFocus, onInputBlur, onSearchCb }) => {
    const dispatch = useAppDispatch();
    const inputValue = useAppSelector(selectInputValue);
    const recipes = useAppSelector(selectFilteredRecipes);

    const selectedMeats = useAppSelector(selectSelectedMeats);
    const selectedSides = useAppSelector(selectSelectedSides);
    const selectedAllergens = useAppSelector(selectSelectedAllergens);
    const selectedSubCategories = useAppSelector(selectSelectedSubCategoriesIds);
    const isEmptyTextShowed = useAppSelector(selectShowEmptyText);

    const [fetchRecipes, { isFetching }] = useLazyGetAllRecipesMergeQuery();

    const isTablet = useIsTablet();
    const [isFocused, setIsFocused] = useState(false);

    const isButtonDisabled = inputValue.length < MIN_SEARCH_LENGTH;

    const handleSearchClick = async () => {
        onSearchCb();
        dispatch(setIsFiltering(true));
        const requestParams = getRequestParams({
            allergens: selectedAllergens,
            meats: selectedMeats,
            searchInput: inputValue,
            sides: selectedSides,
            subCategories: selectedSubCategories,
        });
        await fetchRecipes(requestParams);
        setIsFocused(false);
    };

    const handleFocus = () => {
        onInputFocus();
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        onInputBlur();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isButtonDisabled) {
            handleSearchClick();
        }
    };

    const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        dispatch(setInputValue(e.target.value));
        dispatch(setIsFiltering(false));
    };

    const handleDrawerClick = () => dispatch(openDrawer());

    const isSearchEmpty = !isArrayWithItems(recipes) && isEmptyTextShowed;

    return isFetching ? (
        <Flex alignItems='center' justifyContent='center' w='100%'>
            <Loader boxSize='134px' m='auto' />
        </Flex>
    ) : (
        <Stack
            spacing={4}
            maxWidth={{ base: '100%', sm: '520px' }}
            ml='auto'
            mr='auto'
            pb={8}
            alignItems={isFetching ? 'center' : undefined}
        >
            <Stack direction='row' spacing={3}>
                <IconButton
                    data-test-id='filter-button'
                    aria-label='filter'
                    icon={<FilterIcon />}
                    size={{ base: 'sm', md: 'lg' }}
                    width={{ base: '32px', md: '48px' }}
                    variant='outline'
                    borderColor='blackAlpha.600'
                    onClick={handleDrawerClick}
                />
                <InputGroup>
                    <Input
                        type='search'
                        size={{ base: 'sm', md: 'lg' }}
                        placeholder={!isFocused ? 'Название или ингредиент...' : ''}
                        borderColor={getBorderColor(inputValue, isSearchEmpty)}
                        _placeholder={{ color: 'lime.800' }}
                        _focus={{
                            borderColor: 'blackAlpha.600',
                            boxShadow: 'none',
                        }}
                        color='var(--chakra-colors-lime-800)'
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        value={inputValue}
                        data-test-id='search-input'
                    />
                    <InputRightElement
                        height={{ base: '32px', md: '48px' }}
                        width={{ base: '32px', md: '48px' }}
                        sx={{
                            pointerEvents: isButtonDisabled ? 'none' : 'auto',
                            cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
                            opacity: isButtonDisabled ? 0.4 : 1,
                        }}
                        data-test-id='search-button'
                    >
                        <SearchIcon
                            width={{ base: '14px', md: '18px' }}
                            height={{ base: '14px', md: '18px' }}
                            cursor='pointer'
                            onClick={handleSearchClick}
                        />
                    </InputRightElement>
                </InputGroup>
            </Stack>
            {!isTablet && <AllergenSelect fromFilter={false} />}
        </Stack>
    );
};
