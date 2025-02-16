import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import { Button, MenuButton } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../hooks/typed-react-redux-hooks';
import { clearSelectedAllergens } from '../../../redux/features/allergens-slice';
import { selectChoosenCategory } from '../../../redux/features/choosen-category-slice';
import { SelectedAllergens } from './selected-allergens';

type SelectMenuButtonProps = {
    isSwitchOn: boolean;
    selectedAllergens: string[];
    handleMenuToggle: () => void;
    clearSelection: () => void;
    isOpen: boolean;
};

export const SelectMenuButton: FC<SelectMenuButtonProps> = ({
    isSwitchOn,
    selectedAllergens,
    handleMenuToggle,
    clearSelection,
    isOpen,
}) => {
    const dispatch = useDispatch();
    const selectedCategory = useAppSelector(selectChoosenCategory);
    useEffect(() => {
        dispatch(clearSelectedAllergens());
    }, [selectedCategory]);

    return (
        <MenuButton
            w='100%'
            h='100%'
            minHeight='40px'
            p={2}
            as={Button}
            color='blackAlpha.700'
            fontWeight={400}
            outline='none'
            background={'--chakra-ring-offset-color'}
            border='1px solid rgba(0, 0, 0, 0.64)'
            _active={{
                background: '--chakra-ring-offset-color',
                border: '1px solid #C4FF61',
                boxShadow: 'none',
            }}
            _hover={{
                background: '--chakra-ring-offset-color',
                boxShadow: 'none',
                border: '1px solid #C4FF61',
            }}
            isDisabled={!isSwitchOn}
            sx={{
                '.chakra-button__icon': {
                    alignSelf: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                },
            }}
            onClick={handleMenuToggle}
            rightIcon={
                <span>
                    {selectedAllergens.length > 0 && (
                        <CloseIcon
                            onClick={clearSelection}
                            w={2}
                            h={2}
                            cursor={'pointer'}
                            _hover={{ bg: 'none', color: 'var(--chakra-colors-lime-600)' }}
                        />
                    )}
                    {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </span>
            }
        >
            <SelectedAllergens selectedAllergens={selectedAllergens} />
        </MenuButton>
    );
};
