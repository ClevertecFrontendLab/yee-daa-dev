import { Image, TagLabel } from '@chakra-ui/icons';
import { HStack, Tag } from '@chakra-ui/react';
import { FC } from 'react';

import { categoriesMap } from '~/constants/categories.ts';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { selectCategoriesMenu } from '~/redux/features/categories-slice.ts';
import { isArrayWithItems } from '~/utils/is-array-with-items';

type Props = {
    color: string;
    categoriesIds?: string[];
};

export const CategoryTag: FC<Props> = ({ categoriesIds, color }) => {
    const categories = useAppSelector(selectCategoriesMenu);

    return (
        <HStack spacing={2} flexWrap='wrap'>
            {isArrayWithItems(categoriesIds) &&
                categoriesIds.map((id) => {
                    const selectedCategory = categories.find((cat) => cat.id === id);
                    const categoryTitle = selectedCategory?.category;
                    return categoryTitle ? (
                        <Tag key={id} bg={color}>
                            <Image src={categoriesMap[categoryTitle]} alt={id} mr={2} />
                            <TagLabel noOfLines={1} fontWeight={400}>
                                {selectedCategory.title}
                            </TagLabel>
                        </Tag>
                    ) : null;
                })}
        </HStack>
    );
};
