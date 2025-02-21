import { Box } from '@chakra-ui/react';
import { FC } from 'react';

export const SectionBox: FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Box mb={{ base: 8, md: 10 }}>{children}</Box>;
};
