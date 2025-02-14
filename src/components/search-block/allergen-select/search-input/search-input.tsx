import { Input } from '@chakra-ui/react';
import { FC, memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PLACEHOLDER_ALLERGEN } from '../../../../constants/select';
import { selectSearchTerm, setSearchTerm } from '../../../../redux/features/allergens';

type SearchInputProps = {
    isOpen: boolean;
};

export const SearchInput: FC<SearchInputProps> = memo(({ isOpen }) => {
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && ref.current) {
            ref.current.focus();
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(e.target.value));
    };

    return (
        <Input
            position={'absolute'}
            top={0}
            placeholder={PLACEHOLDER_ALLERGEN}
            _placeholder={{ color: 'lime.800' }}
            borderColor='#C4FF61'
            _focus={{
                borderColor: '#C4FF61',
                boxShadow: 'none',
            }}
            value={searchTerm}
            onChange={handleChange}
            ref={ref}
        />
    );
});
