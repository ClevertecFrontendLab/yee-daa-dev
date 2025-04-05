import { Center, type CenterProps, Spinner, type SpinnerProps } from '@chakra-ui/react';

import styles from './loader.module.css';

type LoaderProps = SpinnerProps & { boxSize: CenterProps['boxSize'] & (number | string) };

export const Loader = ({ boxSize, ...spinnerProps }: LoaderProps) => (
    <Center
        className={styles.wrapper}
        h={boxSize}
        w={boxSize}
        bgGradient='radial-gradient(circle, lime.300 0%, rgba(227, 255, 181, 0.3) 42%, rgba(255, 255, 255, 0) 67%);'
        borderRadius='50%'
        border='none'
        outline='none'
        shadow='none'
    >
        <Spinner {...spinnerProps} thickness='2px' background='transparent' />
    </Center>
);
