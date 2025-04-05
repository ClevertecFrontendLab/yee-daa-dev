import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import { Button, MenuButton } from '@chakra-ui/react';
import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { clearSelectedAllergens, selectSwitcherState } from '~/redux/features/allergens-slice';

import { SelectedItems } from './selected-allergens';

type SelectMenuButtonProps = {
    selectedAllergens: string[];
    handleMenuToggle: () => void;
    setIsOpen: (value: boolean) => void;
    isOpen: boolean;
    fromFilter: boolean;
};

export const SelectMenuButton: FC<SelectMenuButtonProps> = ({
    selectedAllergens,
    handleMenuToggle,
    setIsOpen,
    isOpen,
    fromFilter,
}) => {
    const dispatch = useAppDispatch();
    const isSwitchOn = useAppSelector(selectSwitcherState);

    const clearSelection = (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(clearSelectedAllergens());
        setIsOpen(false);
    };

    return (
        <MenuButton
            data-test-id={fromFilter ? 'allergens-menu-button-filter' : 'allergens-menu-button'}
            w={fromFilter ? '370px' : '270px'}
            h='100%'
            minHeight='40px'
            p={2}
            as={Button}
            color='blackAlpha.700'
            fontWeight={400}
            outline='none'
            background='--chakra-ring-offset-color'
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
                            cursor='pointer'
                            _hover={{ bg: 'none', color: 'var(--chakra-colors-lime-600)' }}
                        />
                    )}
                    {isOpen ? (
                        <ChevronUpIcon />
                    ) : (
                        <ChevronDownIcon data-test-id='allergens-menu-icon' />
                    )}
                </span>
            }
        >
            <SelectedItems selectedItems={selectedAllergens} fromFilter={fromFilter} />
        </MenuButton>
    );
};
