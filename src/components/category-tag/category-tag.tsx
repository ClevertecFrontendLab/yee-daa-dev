import { Image, TagLabel } from '@chakra-ui/icons';
import { HStack, Tag } from '@chakra-ui/react';
import { FC } from 'react';

import { useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { selectCategoriesMenu, selectSubCategories } from '~/redux/features/categories-slice.ts';
import { getAbsoluteImagePath } from '~/utils/get-absolute-image-path';
import { isArrayWithItems } from '~/utils/is-array-with-items';

type Props = {
    color: string;
    categoriesIds?: string[];
};

export const CategoryTag: FC<Props> = ({ categoriesIds, color }) => {
    const subCategories = useAppSelector(selectSubCategories) ?? [];
    const rootCategoryIds = subCategories.reduce<string[]>((acc, curr) => {
        if (!categoriesIds?.includes(curr.id)) return acc;

        acc.push(curr.rootCategoryId);
        return acc;
    }, []);

    const categories = useAppSelector(selectCategoriesMenu);
    const filteredByRootCategories = categories.filter((elem) => rootCategoryIds.includes(elem.id));

    return (
        <HStack spacing={2} flexWrap='wrap'>
            {isArrayWithItems(filteredByRootCategories) &&
                filteredByRootCategories.map(({ title, icon, id }) => (
                    <Tag key={id} bg={color}>
                        <Image src={getAbsoluteImagePath(icon)} alt={id} mr={2} />
                        <TagLabel noOfLines={1} fontWeight={400}>
                            {title}
                        </TagLabel>
                    </Tag>
                ))}
        </HStack>
    );
};
