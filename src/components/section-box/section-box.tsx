import { Box, ResponsiveValue } from '@chakra-ui/react';
import { FC } from 'react';

type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

type BoxProps = {
    children?: React.ReactNode;
    maxWidth?: string;
    position?: ResponsiveValue<Position>;
};

export const SectionBox: FC<BoxProps> = ({ children, maxWidth, position }: BoxProps) => {
    return (
        <Box mb={{ base: 8, md: 10 }} maxWidth={maxWidth} position={position}>
            {children}
        </Box>
    );
};
