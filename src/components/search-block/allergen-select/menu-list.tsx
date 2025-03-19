import { Box, Button, Checkbox, Input, InputGroup, MenuItem, MenuList } from '@chakra-ui/react';
import { FC, useEffect, useRef } from 'react';

import { BUTTON_ADD_OTHER_ALLERGEN, PLACEHOLDER_ALLERGEN } from '../../../constants/select';
import { useAppDispatch, useAppSelector } from '../../../hooks/typed-react-redux-hooks';
import {
    deselectAllergen,
    selectAllergen,
    selectAllergens,
    selectSelectedAllergens,
} from '../../../redux/features/allergens-slice';
import { PlusCircleIcon } from '../../icons/plus-circle-icon';

type SelectMenuListProps = {
    isAdding: boolean;
    newAllergen: string;
    setIsAdding: (value: boolean) => void;
    setNewAllergen: (value: string) => void;
};

export const SelectMenuList: FC<SelectMenuListProps> = ({
    isAdding,
    newAllergen,
    setIsAdding,
    setNewAllergen,
}) => {
    const dispatch = useAppDispatch();
    const allergens = useAppSelector(selectAllergens);
    const selectedAllergens = useAppSelector(selectSelectedAllergens);
    const inputRef = useRef<HTMLInputElement>(null);

    const toggleAllergen = (value: string) => {
        if (selectedAllergens.includes(value)) {
            dispatch(deselectAllergen(value));
        } else {
            dispatch(selectAllergen(value));
        }
    };

    const handleAddAllergen = () => {
        if (newAllergen.trim()) {
            dispatch(selectAllergen(newAllergen.trim()));
            setNewAllergen('');
            setIsAdding(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleAddAllergen();
        }
    };

    const handleAddClick = () => {
        setIsAdding(true);
    };

    useEffect(() => {
        if (isAdding && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isAdding]);

    return (
        <Box position='absolute' top='40px' zIndex={3}>
            <MenuList pt={3} pb={3} data-test-id='allergens-menu'>
                {allergens.map((allergen, index) => (
                    <MenuItem
                        key={allergen.value}
                        pl={4}
                        pr={4}
                        bg={index % 2 === 0 ? 'gray.100' : 'white'}
                    >
                        <Checkbox
                            data-test-id={`allergen-${index}`}
                            borderColor='var(--chakra-colors-lime-300)'
                            iconColor='black'
                            isChecked={selectedAllergens.includes(allergen.label)}
                            onChange={() => toggleAllergen(allergen.label)}
                            _hidden={{ display: 'none' }}
                            sx={{
                                '&[data-checked] .chakra-checkbox__control': {
                                    backgroundColor: 'var(--chakra-colors-lime-300)',
                                    borderColor: 'var(--chakra-colors-lime-300)',
                                },
                            }}
                        >
                            {allergen.label}
                        </Checkbox>
                    </MenuItem>
                ))}
                <InputGroup
                    alignItems='center'
                    padding='0 12px'
                    margin='8px auto'
                    justifyContent='space-between'
                >
                    {isAdding ? (
                        <Input
                            display='block'
                            w='205px'
                            ref={inputRef}
                            color={'var(--chakra-colors-lime-800)'}
                            value={newAllergen}
                            onChange={(e) => setNewAllergen(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={PLACEHOLDER_ALLERGEN}
                            _placeholder={{ color: 'lime.800' }}
                            borderColor='var(--chakra-colors-lime-600)'
                            _focus={{
                                borderColor: 'var(--chakra-colors-lime-600)',
                                boxShadow: 'none',
                            }}
                        />
                    ) : (
                        <Button
                            data-test-id='add-other-allergen'
                            display={'block'}
                            textAlign='start'
                            w='205px'
                            fontWeight={400}
                            color={'var(--chakra-colors-lime-800)'}
                            background={'--chakra-ring-offset-color'}
                            border='1px solid var(--chakra-colors-blackAlpha-200)'
                            onClick={handleAddClick}
                        >
                            {BUTTON_ADD_OTHER_ALLERGEN}
                        </Button>
                    )}
                    <PlusCircleIcon
                        cursor={'pointer'}
                        onClick={handleAddAllergen}
                        data-test-id='add-allergen-button'
                    />
                </InputGroup>
            </MenuList>
        </Box>
    );
};
