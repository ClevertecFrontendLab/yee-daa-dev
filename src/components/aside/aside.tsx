import { Flex, Spacer } from '@chakra-ui/react';

import { AddRecipeBtn } from '../add-recipe-btn';
import { StatsBlock } from '../stats-block';

export const Aside = () => {
    return (
        <Flex
            height='100%'
            mr={14}
            pb='52px'
            direction='column'
            alignItems='flex-end'
            position={'relative'}
        >
            <StatsBlock />
            <Spacer />
            <AddRecipeBtn />
        </Flex>
    );
};
