import { FormControl, Menu, Stack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/typed-react-redux-hooks';
import {
    clearSelectedAllergens,
    selectSelectedAllergens,
} from '../../../redux/features/allergens-slice';
import { SelectMenuButton } from './menu-button';
import { SelectMenuList } from './menu-list';
import { Switcher } from './switcher';

export const AllergenSelect = () => {
    const dispatch = useAppDispatch();
    const selectedAllergens = useAppSelector(selectSelectedAllergens);

    const [isOpen, setIsOpen] = useState(false);
    const [newAllergen, setNewAllergen] = useState<string>('');
    const [isAdding, setIsAdding] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const handleMenuToggle = () => {
        if (isSwitchOn) {
            setIsOpen((prev) => !prev);
        }
    };

    const handleSwitchChange = () => {
        setIsSwitchOn((prev) => !prev);
        dispatch(clearSelectedAllergens());
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
            alignItems='center'
            display={{ base: 'none', md: 'flex', xl: 'flex' }}
            flexWrap='wrap'
        >
            <Switcher isSwitchOn={isSwitchOn} handleSwitchChange={handleSwitchChange} />
            <FormControl ref={menuRef} width='234px'>
                <Menu isOpen={isOpen} isLazy={true} matchWidth={true}>
                    <SelectMenuButton
                        isSwitchOn={isSwitchOn}
                        selectedAllergens={selectedAllergens}
                        handleMenuToggle={handleMenuToggle}
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
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
