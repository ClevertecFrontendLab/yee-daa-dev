import { CloseIcon, HamburgerIcon, IconButton } from '@chakra-ui/icons';

import { useAppDispatch, useAppSelector } from '../../hooks/typed-react-redux-hooks';
import { closeMenu, openMenu, selectMenu, setClicked } from '../../redux/features/burger-slice';

export const BurgerMenu = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectMenu);

    const handleOpen = () => {
        dispatch(setClicked(true));
        dispatch(openMenu());
    };

    const handleClose = () => {
        dispatch(setClicked(true));
        dispatch(closeMenu());
    };

    return (
        <IconButton
            display={{ base: 'block', xl: 'none' }}
            aria-label='burger'
            variant='ghost'
            colorScheme='blackAlpha'
            icon={
                isOpen ? (
                    <CloseIcon data-test-id='close-icon' onClick={handleClose} />
                ) : (
                    <HamburgerIcon data-test-id='hamburger-icon' onClick={handleOpen} />
                )
            }
            isRound
        />
    );
};
