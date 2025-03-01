import { Image, TagLabel } from '@chakra-ui/icons';
import { HStack, Tag } from '@chakra-ui/react';
import { FC } from 'react';

import { categoriesMap } from '~/constants/categories.ts';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { selectCategoriesMenu } from '~/redux/features/categories-slice.ts';

type Props = {
    color: string;
    category?: string[];
};

export const CategoryTag: FC<Props> = ({ category, color }) => {
    const categories = useAppSelector(selectCategoriesMenu);

    return (
        <HStack spacing={2} flexWrap='wrap'>
            {category &&
                category.map((cat) => {
                    const categoryTitle = categories.find((c) => c.category === cat)?.title ?? '';
                    return (
                        <Tag key={cat} bg={color}>
                            <Image src={categoriesMap[cat]} alt={cat} mr={2} />
                            <TagLabel noOfLines={1} fontWeight={400}>
                                {categoryTitle}
                            </TagLabel>
                        </Tag>
                    );
                })}
        </HStack>
    );
};
