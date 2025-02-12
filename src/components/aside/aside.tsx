import { Flex, Spacer } from '@chakra-ui/react';

import { AddRecipeBtn } from '../add-recipe-btn';
import { StatsBlock } from '../stats-block';

export const Aside = () => {
    return (
        <Flex height='100%' direction='column' alignItems='flex-end' justifyContent='flex-end'>
            <StatsBlock />
            <Spacer />
            <AddRecipeBtn />
        </Flex>
    );
};
