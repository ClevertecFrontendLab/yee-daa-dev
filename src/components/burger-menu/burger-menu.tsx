import { CloseIcon, HamburgerIcon, IconButton } from '@chakra-ui/icons';

import { useAppDispatch, useAppSelector } from '../../hooks/typed-react-redux-hooks';
import { selectMenu, setClicked, toggleMenu } from '../../redux/features/burger-slice';

export const BurgerMenu = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectMenu);

    const handleToggle = () => {
        dispatch(setClicked(true));
        dispatch(toggleMenu());
    };

    return (
        <IconButton
            display={{ base: 'block', xl: 'none' }}
            aria-label='burger'
            variant='ghost'
            colorScheme='blackAlpha'
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            isRound
            onClick={handleToggle}
        />
    );
};
