import { Image, TagLabel } from '@chakra-ui/icons';
import { Tag } from '@chakra-ui/react';
import { FC } from 'react';

import { categoriesMap } from '../../constants/categories.ts';
import { useAppSelector } from '../../hooks/typed-react-redux-hooks.ts';
import { selectCategoriesMenu } from '../../redux/features/categories-slice.ts';

type Props = {
    category: string;
    color: string;
};

export const CategoryTag: FC<Props> = ({ category, color }) => {
    const categories = useAppSelector(selectCategoriesMenu);
    const categoryTitle = categories.find((cat) => cat.category === category)?.title ?? '';

    return (
        <Tag size='md' bg={color} maxWidth='175px' pl={{ base: 1, md: 2 }} pr={{ base: 1, md: 2 }}>
            <Image src={categoriesMap[category]} alt={category} />
            <TagLabel ml={{ base: '2px', md: 2 }} noOfLines={1} letterSpacing='-0.5px'>
                {categoryTitle}
            </TagLabel>
        </Tag>
    );
};
