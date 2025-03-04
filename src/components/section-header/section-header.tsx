import { Box } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { PageType } from '~/types/page';

import { SearchBlock } from '../search-block';
import { SectionInfo } from '../section-info';
import styles from './section-header.module.css';

type SectionHeaderProps = {
    onSearch: (inputValue: string) => void;
    pageType: PageType;
    startSearch?: boolean;
};
export const SectionHeader: FC<SectionHeaderProps> = ({ onSearch, pageType, startSearch }) => {
    const [isInputFocused, setInputFocused] = useState(false);

    const handleSearch = (value: string) => {
        setInputFocused(false);
        onSearch(value);
    };

    return (
        <Box
            className={isInputFocused ? styles.sectionHeader : ''}
            maxWidth={{ base: '100%', xl: '898px' }}
            margin='0 auto'
            pr={{ base: 4, xl: 16 }}
            pl={{ base: 4, xl: 16 }}
        >
            <SectionInfo pageType={pageType} />
            <SearchBlock
                onInputFocus={() => setInputFocused(true)}
                onInputBlur={() => setInputFocused(false)}
                onSearch={handleSearch}
                startSearch={startSearch}
            />
        </Box>
    );
};
