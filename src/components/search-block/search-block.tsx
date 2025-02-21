import { IconButton, InputGroup, InputRightElement, SearchIcon, Stack } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/typed-react-redux-hooks.ts';
import { clearSelectedAllergens } from '../../redux/features/allergens-slice.ts';
import { clearSelectedAuthors } from '../../redux/features/authors-slice.ts';
import { clearSelectedCategories } from '../../redux/features/categories-slice.ts';
import { clearSelectedCuisines } from '../../redux/features/cuisines-slice.ts';
import { openDrawer } from '../../redux/features/drawer.ts';
import { clearSelectedMeats } from '../../redux/features/meats-slice.ts';
import { clearFilteredRecipes } from '../../redux/features/recipies-slice.ts';
import { selectInputValue, setInputValue } from '../../redux/features/search-slice.ts';
import { clearSelectedSides } from '../../redux/features/sides-slice.ts';
import { FilterIcon } from '../icons/filter-icon.tsx';
import { AllergenSelect } from './allergen-select/allergen-select.tsx';

type SearchBlockProps = {
    onInputFocus: () => void;
    onInputBlur: () => void;
    onSearch: (inputValue: string) => void;
};

export const SearchBlock: FC<SearchBlockProps> = ({ onInputFocus, onInputBlur, onSearch }) => {
    const dispatch = useAppDispatch();
    const inputValue = useAppSelector(selectInputValue);
    const [isFocused, setIsFocused] = useState(false);

    const isButtonDisabled = inputValue.length < 3;

    const handleSearchClick = () => {
        onSearch(inputValue);
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

    const handleDrawerClick = () => {
        dispatch(setInputValue(''));
        dispatch(clearSelectedAllergens());
        dispatch(clearFilteredRecipes());
        dispatch(clearSelectedAuthors());
        dispatch(clearSelectedCategories());
        dispatch(clearSelectedCuisines());
        dispatch(clearSelectedMeats());
        dispatch(clearSelectedSides());

        dispatch(openDrawer());
    };

    return (
        <Stack spacing={4} maxWidth={{ base: '100%', sm: '520px' }} ml='auto' mr='auto' pb={8}>
            <Stack direction='row' spacing={3}>
                <IconButton
                    aria-label={'filter'}
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
                        _placeholder={{ color: 'lime.800' }}
                        borderColor={
                            inputValue ? 'var(--chakra-colors-lime-600)' : 'blackAlpha.600'
                        }
                        _focus={{
                            borderColor: 'var(--chakra-colors-lime-600)',
                            boxShadow: 'none',
                        }}
                        color={'var(--chakra-colors-lime-800)'}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => dispatch(setInputValue(e.target.value))}
                        onKeyDown={handleKeyDown}
                        value={inputValue}
                    />
                    <InputRightElement
                        height={{ base: '32px', md: '48px' }}
                        width={{ base: '32px', md: '48px' }}
                        sx={{
                            pointerEvents: isButtonDisabled ? 'none' : 'auto',
                            cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
                            opacity: isButtonDisabled ? 0.4 : 1,
                        }}
                    >
                        <SearchIcon
                            width={{ base: '14px', md: '18px' }}
                            height={{ base: '14px', md: '18px' }}
                            cursor={'pointer'}
                            onClick={handleSearchClick}
                        />
                    </InputRightElement>
                </InputGroup>
            </Stack>
            <AllergenSelect isfromFilter={false} />
        </Stack>
    );
};
