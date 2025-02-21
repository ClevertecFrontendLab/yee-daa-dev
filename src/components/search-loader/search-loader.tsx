import { Box, keyframes } from '@chakra-ui/react';
import { FC } from 'react';

import styles from './search-loader.module.css';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const SearchLoader: FC = () => {
    return (
        <Box className={styles.wrapper}>
            <Box className={styles.gradientBackground} />
            <Box
                className={styles.searchLoader}
                as='div'
                animation={`${spin} 1s linear infinite`}
            />
        </Box>
    );
};
