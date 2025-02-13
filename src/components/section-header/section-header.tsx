import { Box } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { SearchBlock } from '../search-block';
import { SearchLoader } from '../search-loader';
import { SectionInfo } from '../section-info';
import styles from './section-header.module.css';

type SectionHeaderProps = {
    onSearch: (inputValue: string) => void;
};
export const SectionHeader: FC<SectionHeaderProps> = ({ onSearch }) => {
    const [isInputFocused, setInputFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleSearch = (value: string) => {
        setInputValue(value);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setInputFocused(false);
            onSearch(value);
        }, 2000);
    };

    return (
        <Box mb={6} className={isInputFocused ? styles.sectionHeader : ''}>
            <SectionInfo />
            {isLoading ? (
                <SearchLoader />
            ) : (
                <SearchBlock
                    onInputFocus={() => setInputFocused(true)}
                    onInputBlur={() => setInputFocused(false)}
                    onSearch={handleSearch}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
            )}
        </Box>
    );
};
