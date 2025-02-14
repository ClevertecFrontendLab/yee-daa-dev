import { IconButton, InputGroup, InputRightElement, SearchIcon, Stack } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/typed-react-redux-hooks.ts';
import { selectInputValue, setInputValue } from '../../redux/features/search-slice.ts';
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
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <Stack spacing={4} maxWidth='520px' ml='auto' mr='auto' pb={8}>
            <Stack direction='row' spacing={3}>
                <IconButton
                    aria-label={'filter'}
                    icon={<FilterIcon />}
                    size={{ base: 'sm', md: 'lg' }}
                    width={{ base: '32px', md: '48px' }}
                    variant='outline'
                    borderColor='blackAlpha.600'
                />
                <InputGroup>
                    <Input
                        type='search'
                        size={{ base: 'sm', md: 'lg' }}
                        placeholder={!isFocused ? 'Название или ингредиент...' : ''}
                        _placeholder={{ color: 'lime.800' }}
                        borderColor={inputValue ? '#2DB100' : 'blackAlpha.600'}
                        _focus={{
                            borderColor: '#2DB100',
                            boxShadow: 'none',
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => dispatch(setInputValue(e.target.value))}
                        onKeyDown={handleKeyDown}
                        value={inputValue}
                    />
                    <InputRightElement
                        height={{ base: '32px', md: '48px' }}
                        width={{ base: '32px', md: '48px' }}
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
            <AllergenSelect />
        </Stack>
    );
};
