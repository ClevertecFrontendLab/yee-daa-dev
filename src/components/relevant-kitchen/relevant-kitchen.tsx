import { Stack } from '@chakra-ui/icons';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { Recipe } from '../../types/recipe.ts';
import { RelevantKitchenCard } from '../relevant-kitchen-card';
import { ShortFoodCard } from '../short-food-card';
import styles from './relevant-kitchen.module.css';

type Props = {
    title: string;
    description: string;
    recipes: Recipe[];
};

export const RelevantKitchen: FC<Props> = ({ recipes, description, title }) => {
    const firstPart = recipes.slice(0, 2);
    const lastPart = recipes.slice(2, 5);

    return (
        <Box>
            <Grid
                gap={{ base: 3, md: 10 }}
                gridTemplateColumns={{
                    base: '1fr',
                    md: '1fr 2fr',
                    '2xl': '1fr 1fr',
                }}
                mb={{ base: 4, md: 6 }}
            >
                <Heading
                    fontSize={{ base: '2xl', xl: '4xl', '2xl': '5xl' }}
                    lineHeight='none'
                    fontWeight={500}
                    flexBasis='calc(50% - 12px)'
                >
                    {title}
                </Heading>
                <Text
                    fontSize={{ base: 'sm', md: 'md' }}
                    lineHeight={{ base: 5, md: 6 }}
                    fontWeight={500}
                    color='blackAlpha.600'
                    flexBasis='calc(50% - 12px)'
                >
                    {description}
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
};
