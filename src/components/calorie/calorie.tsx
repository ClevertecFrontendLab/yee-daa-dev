import { Box, Card, SimpleGrid, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { EnergyValue } from '~/redux/api/types/recipes';
import { Recipe } from '~/redux/api/types/recipes';

const calories: Record<keyof EnergyValue, string> = {
    calories: 'калорийность',
    fats: 'жиры',
    carbohydrates: 'углеводы',
    protein: 'белки',
};

const units: Record<keyof EnergyValue, string> = {
    calories: 'ккал',
    fats: 'грамм',
    carbohydrates: 'грамм',
    protein: 'грамм',
};

export const CalorieCard: FC<{ nutritionValue?: Recipe['nutritionValue'] }> = ({
    nutritionValue,
}) => (
    <Box p={0}>
        <Text mb={{ base: 3, xl: 5 }} color='blackAlpha.800'>
            * Калорийность на 1 порцию
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 4 }} spacing={3}>
            {Object.entries(nutritionValue ?? {}).map(([key, amount]) => (
                <Card
                    variant='outline'
                    key={key}
                    borderRadius='2xl'
                    p={4}
                    justifyContent={{ base: 'space-between', sm: 'center' }}
                    alignItems='center'
                    gap={3}
                    flexDirection={{ base: 'row', sm: 'column' }}
                >
                    <Text color='blackAlpha.600'>{calories[key as keyof EnergyValue]}</Text>
                    <Box
                        display='flex'
                        flexDirection={{ base: 'row', sm: 'column' }}
                        alignItems='center'
                        gap={{ base: 10, sm: 0 }}
                    >
                        <Text
                            color='var(--chakra-colors-lime-800)'
                            fontWeight={500}
                            fontSize={{ base: '2xl', sm: '40px' }}
                        >
                            {amount}
                        </Text>
                        <Text
                            textTransform='uppercase'
                            fontWeight={600}
                            fontSize={{ base: 'xs', sm: 'sm' }}
                        >
                            {units[key as keyof EnergyValue]}
                        </Text>
                    </Box>
                </Card>
            ))}
        </SimpleGrid>
    </Box>
);
