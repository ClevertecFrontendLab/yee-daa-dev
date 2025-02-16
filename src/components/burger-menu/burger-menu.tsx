import { IconButton } from '@chakra-ui/icons';

import { BurgerIcon } from '../icons/burger-icon.tsx';

export const BurgerMenu = () => {
    return (
        <IconButton
            display={{ base: 'block', xl: 'none' }}
            aria-label='burger'
            variant='ghost'
            colorScheme='blackAlpha'
            icon={<BurgerIcon />}
            isRound
        />
    );
};
