import { Box } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { PageType } from '~/types/page';

import { SearchBlock } from '../search-block';
import { SectionInfo } from '../section-info';
import styles from './section-header.module.css';

type SectionHeaderProps = {
    pageType: PageType;
};
export const SectionHeader: FC<SectionHeaderProps> = ({ pageType }) => {
    const [isInputFocused, setInputFocused] = useState(false);

    const handleSearch = () => setInputFocused(false);

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
                onSearchCb={handleSearch}
            />
        </Box>
    );
};
