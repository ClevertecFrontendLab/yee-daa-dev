import { Box } from '@chakra-ui/react';

import { Loader } from '~/components/loader';

type MobileLoaderType = {
    isOpen: boolean;
};

export const MobileLoader = ({ isOpen }: MobileLoaderType) =>
    isOpen && (
        <Box position='absolute' width='100%' height='100%' top={0} left={0}>
            <Loader boxSize='100%' size='md' color='black' radius={14} />
        </Box>
    );
