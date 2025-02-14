import { PlusSquareIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    Input,
    InputGroup,
    InputRightElement,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BUTTON_ADD_OTHER_ALLERGEN, PLACEHOLDER_ALLERGEN } from '../../../../constants/select';
import {
    addAllergen,
    deselectAllergen,
    selectAllergen,
    selectAllergens,
    selectSearchTerm,
    selectSelectedAllergens,
} from '../../../../redux/features/allergens';

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
    const dispatch = useDispatch();
    const allergens = useSelector(selectAllergens);
    const selectedAllergens = useSelector(selectSelectedAllergens);
    const inputRef = useRef<HTMLInputElement>(null);
    const searchTerm = useSelector(selectSearchTerm);

    const filteredAllergens = allergens.filter((allergen) =>
        allergen.label.toLowerCase().includes(searchTerm?.toLowerCase()),
    );

    const toggleAllergen = (value: string) => {
        if (selectedAllergens.includes(value)) {
            dispatch(deselectAllergen(value));
        } else {
            dispatch(selectAllergen(value));
        }
    };

    const handleAddAllergen = () => {
        if (newAllergen.trim() !== '') {
            dispatch(addAllergen(newAllergen));
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
        <Box position='absolute' top='40px'>
            <MenuList pt={3} pb={3} w='234px'>
                {filteredAllergens.map((allergen, index) => (
                    <MenuItem
                        key={allergen.value}
                        pl={4}
                        pr={4}
                        bg={index % 2 === 0 ? 'gray.100' : 'white'}
                    >
                        <Checkbox
                            borderColor='#C4FF61'
                            colorScheme='green'
                            iconColor='black'
                            isChecked={selectedAllergens.includes(allergen.label)}
                            onChange={() => toggleAllergen(allergen.label)}
                            _hidden={{ display: 'none' }}
                            sx={{
                                '&[data-checked] .chakra-checkbox__control': {
                                    backgroundColor: '#C4FF61',
                                    borderColor: '#C4FF61',
                                },
                            }}
                        >
                            {allergen.label}
                        </Checkbox>
                    </MenuItem>
                ))}
                {isAdding ? (
                    <InputGroup>
                        <Input
                            display='block'
                            margin='8px auto'
                            width='200px'
                            ref={inputRef}
                            value={newAllergen}
                            onChange={(e) => setNewAllergen(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={PLACEHOLDER_ALLERGEN}
                            _placeholder={{ color: 'lime.800' }}
                            borderColor='#2DB100'
                            _focus={{
                                borderColor: '#2DB100',
                                boxShadow: 'none',
                            }}
                        />
                        <InputRightElement>
                            <PlusSquareIcon cursor={'pointer'} onClick={handleAddAllergen} />
                        </InputRightElement>
                    </InputGroup>
                ) : (
                    <Button
                        display={'block'}
                        width={'160px'}
                        margin='8px auto'
                        fontWeight={400}
                        color={'#134B00'}
                        background={'--chakra-ring-offset-color'}
                        border='1px solid rgba(0, 0, 0, 0.64)'
                        onClick={handleAddClick}
                    >
                        {BUTTON_ADD_OTHER_ALLERGEN}
                    </Button>
                )}
            </MenuList>
        </Box>
    );
};
