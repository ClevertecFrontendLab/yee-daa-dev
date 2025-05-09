import { Center, type CenterProps, Spinner, type SpinnerProps } from '@chakra-ui/react';

import styles from './loader.module.css';

type LoaderProps = SpinnerProps & { boxSize: CenterProps['boxSize'] & (number | string) };

export const Loader = ({ boxSize, ...spinnerProps }: LoaderProps) => (
    <Center
        className={styles.wrapper}
        h={boxSize}
        w={boxSize}
        bgGradient='radial(50% 50% at 50% 50%, lime.300 0%, transparent 95%)'
        borderRadius='50%'
        border='none'
        outline='none'
        shadow='none'
    >
        <Spinner {...spinnerProps} thickness='2px' speed='0.6s' background='transparent' />
    </Center>
);
