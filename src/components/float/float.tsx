import { chakra, ResponsiveValue } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

type FloatProps = {
    top?: ResponsiveValue<number>;
    left?: ResponsiveValue<number>;
    right?: ResponsiveValue<number>;
    bottom?: ResponsiveValue<number>;
};

export const Float: FC<PropsWithChildren & FloatProps> = ({
    children,
    top,
    left,
    right,
    bottom,
}) => (
    <chakra.div position='absolute' top={top} right={right} bottom={bottom} left={left}>
        {children}
    </chakra.div>
);
