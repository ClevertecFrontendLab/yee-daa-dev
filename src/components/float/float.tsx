import { FC, PropsWithChildren } from 'react';

type FloatProps = {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
};

export const Float: FC<PropsWithChildren & FloatProps> = ({
    children,
    top,
    left,
    right,
    bottom,
}) => (
    <div
        style={{
            position: 'absolute',
            top,
            right,
            left,
            bottom,
        }}
    >
        {children}
    </div>
);
