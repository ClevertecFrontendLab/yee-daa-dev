import { Box } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/typed-react-redux-hooks';
import { selectSearchLoading, setLoading } from '../../redux/features/search-slice';
import { PageType } from '../../types/page';
import { SearchBlock } from '../search-block';
import { SearchLoader } from '../search-loader';
import { SectionInfo } from '../section-info';
import styles from './section-header.module.css';

type SectionHeaderProps = {
    onSearch: (inputValue: string) => void;
    pageType: PageType;
};
export const SectionHeader: FC<SectionHeaderProps> = ({ onSearch, pageType }) => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectSearchLoading);

    const [isInputFocused, setInputFocused] = useState(false);

    const handleSearch = (value: string) => {
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
            setInputFocused(false);
            onSearch(value);
        }, 2000);
    };

    return (
        <Box
            className={isInputFocused ? styles.sectionHeader : ''}
            maxWidth='898px'
            margin={'0 auto'}
            mb={6}
        >
            <SectionInfo pageType={pageType} />
            {isLoading ? (
                <SearchLoader />
            ) : (
                <SearchBlock
                    onInputFocus={() => setInputFocused(true)}
                    onInputBlur={() => setInputFocused(false)}
                    onSearch={handleSearch}
                />
            )}
        </Box>
    );
};
