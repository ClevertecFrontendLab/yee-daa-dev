import { Box } from '@chakra-ui/react';

import { SearchBlock } from '../search-block';
import { SectionInfo } from '../section-info';

export const SectionHeader = () => {
    return (
        <Box mb={6}>
            <SectionInfo />
            <SearchBlock />
        </Box>
    );
};
