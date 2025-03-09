import { FormControl, Menu, Stack } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import {
    clearSelectedAllergens,
    selectSelectedAllergens,
    setFromFilter,
} from '~/redux/features/allergens-slice';
import { setInputValue } from '~/redux/features/search-slice';

import { SelectMenuButton } from './menu-button';
import { SelectMenuList } from './menu-list';
import { Switcher } from './switcher';

export const AllergenSelect: FC<{ fromFilter: boolean }> = ({ fromFilter }) => {
    const dispatch = useAppDispatch();
    const selectedAllergens = useAppSelector(selectSelectedAllergens);

    const [isOpen, setIsOpen] = useState(false);
    const [newAllergen, setNewAllergen] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const handleMenuToggle = () => {
        dispatch(setFromFilter(fromFilter));

        if (isSwitchOn) {
            setIsOpen((prev) => !prev);
        }
    };

    const handleSwitchChange = () => {
        setIsSwitchOn((prev) => !prev);
        dispatch(clearSelectedAllergens());
        dispatch(setInputValue(''));

        if (!isSwitchOn) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setIsAdding(false);
                setNewAllergen('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    return (
        <Stack
            spacing={4}
            direction={{ md: 'column', xl: 'row' }}
            alignItems={fromFilter ? 'flex-start' : 'center'}
            display={{ base: 'none', md: 'flex', xl: 'flex' }}
            flexWrap='wrap'
        >
            <Switcher
                isSwitchOn={isSwitchOn}
                handleSwitchChange={handleSwitchChange}
                fromFilter={fromFilter}
            />
            <FormControl ref={menuRef} width='fit-content'>
                <Menu isLazy={true} matchWidth={true} closeOnSelect={false}>
                    <SelectMenuButton
                        isSwitchOn={isSwitchOn}
                        selectedAllergens={selectedAllergens}
                        handleMenuToggle={handleMenuToggle}
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                        fromFilter={fromFilter}
                    />

                    {isOpen && (
                        <SelectMenuList
                            isAdding={isAdding}
                            newAllergen={newAllergen}
                            setIsAdding={setIsAdding}
                            setNewAllergen={setNewAllergen}
                        />
                    )}
                </Menu>
            </FormControl>
        </Stack>
    );
};
