import { Flex, Spacer } from '@chakra-ui/react';

import { users } from '../../mocks/users';
import { AddRecipeBtn } from '../add-recipe-btn';
import { StatsBlock } from '../stats-block';

export const Aside = () => {
    return (
        <Flex height='100%' direction='column' alignItems='flex-end' justifyContent='space-between'>
            <StatsBlock {...users[2]} />
            <Spacer />
            <AddRecipeBtn />
        </Flex>
    );
};
