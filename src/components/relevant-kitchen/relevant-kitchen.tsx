import { Stack } from '@chakra-ui/icons';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { shallowEqual } from 'react-redux';

import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useDetectParams } from '~/hooks/use-detect-params';
import { useGetRecipeByCategoryIdQuery } from '~/redux/api/recipes-api';
import { selectCategoriesMenu } from '~/redux/features/categories-slice';
import { isArrayWithItems } from '~/utils/is-array-with-items';

import { RelevantKitchenCard } from '../relevant-kitchen-card';
import { ShortFoodCard } from '../short-food-card';
import { getRelevantInfo } from './helpers/get-relevant-info';
import styles from './relevant-kitchen.module.css';

const RELEVANT_KITCHEN_LIMIT = 5;
const FIRST_PART_LIMIT = 2;

export const RelevantKitchen: FC = memo(({ isMainPage = false }: { isMainPage?: boolean }) => {
    const { selectedCategory } = useDetectParams();
    const categories = useAppSelector(selectCategoriesMenu, shallowEqual);
    const [relevantInfo, setRelevantInfo] = useState(getRelevantInfo(categories));
    const prevCategory = useRef(selectedCategory?.id);
    const { title, description, firstSubCategoryId } = relevantInfo;

    useEffect(() => {
        const needUpdate =
            !isMainPage && selectedCategory?.id && selectedCategory.id !== prevCategory.current;

        if (!needUpdate) return;

        setRelevantInfo(getRelevantInfo(categories));
        prevCategory.current = selectedCategory?.id;
    }, [selectedCategory?.id, isMainPage, categories]);

    const { data: relevantRecipesData } = useGetRecipeByCategoryIdQuery(
        {
            id: firstSubCategoryId,
            limit: RELEVANT_KITCHEN_LIMIT,
            page: 1,
        },
        {
            skip: !isArrayWithItems(categories),
        },
    );

    const recipes = relevantRecipesData ?? [];

    const firstPart = recipes?.slice(0, FIRST_PART_LIMIT);
    const lastPart = recipes?.slice(FIRST_PART_LIMIT, RELEVANT_KITCHEN_LIMIT);

    return (
        isArrayWithItems(categories) && (
            <Box>
                <Grid
                    gap={{ base: 3, md: 10 }}
                    gridTemplateColumns={{
                        base: '1fr',
                        md: '1fr 2fr',
                        '2xl': '1fr 1fr',
                    }}
                    mb={{ base: 4, xl: 6 }}
                >
                    <Heading
                        fontSize={{ base: '2xl', xl: '4xl', '2xl': '5xl' }}
                        lineHeight='none'
                        fontWeight={500}
                        flexBasis='calc(50% - 12px)'
                    >
                        {title ?? 'Веганская кухня'}
                    </Heading>
                    <Text
                        fontSize={{ base: 'sm', md: 'md' }}
                        lineHeight={{ base: 5, md: 6 }}
                        fontWeight={500}
                        color='blackAlpha.600'
                        flexBasis='calc(50% - 12px)'
                    >
                        {description ??
                            'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'}
                    </Text>
                </Grid>
                <div className={styles.block}>
                    {firstPart.map((item) => (
                        <RelevantKitchenCard {...item} key={item.id} />
                    ))}
                    <Stack>
                        {lastPart.map((el) => (
                            <ShortFoodCard {...el} key={el.id} />
                        ))}
                    </Stack>
                </div>
            </Box>
        )
    );
});
