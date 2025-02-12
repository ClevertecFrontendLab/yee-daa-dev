import { Box } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

export const SectionBox: FC<PropsWithChildren> = ({ children }) => {
    return <Box mb={{ base: 8, md: 10 }}>{children}</Box>;
};
