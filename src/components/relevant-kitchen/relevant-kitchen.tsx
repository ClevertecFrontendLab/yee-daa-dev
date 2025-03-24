import { Stack } from '@chakra-ui/icons';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import { FC, memo } from 'react';

import { useSelectRelatedRecipes } from '~/hooks/use-select-related-recipes';
import { useGetRecipeByCategoryIdQuery } from '~/redux/api/recipes-api';

import { RelevantKitchenCard } from '../relevant-kitchen-card';
import { ShortFoodCard } from '../short-food-card';
import styles from './relevant-kitchen.module.css';

const RELEVANT_KITCHEN_LIMIT = 5;

export const RelevantKitchen: FC = memo(() => {
    const { title, description } = useSelectRelatedRecipes();

    const { data: relevantRecipesData } = useGetRecipeByCategoryIdQuery({
        id: '67c47208f51967aa8390bef9',
        limit: RELEVANT_KITCHEN_LIMIT,
        page: 1,
    });

    //TODO фейк данные - заменить после наполнения БД на данные с запроса от firstSubCategoryId из useSelectRelatedRecipes

    const tempArr = relevantRecipesData
        ? [
              ...relevantRecipesData,
              ...relevantRecipesData,
              ...relevantRecipesData,
              ...relevantRecipesData,
              ...relevantRecipesData,
          ]
        : [];

    const firstPart = tempArr?.slice(0, 2) ?? [];
    const lastPart = tempArr?.slice(2, RELEVANT_KITCHEN_LIMIT) ?? [];

    return (
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
    );
});
