import {
    Box,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { FC, useState } from 'react';

import { Recipe } from '~/redux/api/types/recipes';

export const IngredientsBlock: FC<{
    ingredients?: Recipe['ingredients'];
    portions?: Recipe['portions'];
}> = ({ ingredients, portions }) => {
    const [adjustedIngredients, setAdjustedIngredients] = useState(ingredients);
    const [value, setValue] = useState(portions);

    const handleChange = (value: string) => {
        const multiply = Number(value);
        const updatedIngredients = ingredients?.map((ingredient) => ({
            ...ingredient,
            count: (ingredient.count / (portions ?? 1)) * multiply,
        }));
        setAdjustedIngredients(updatedIngredients);
        setValue(multiply);
    };

    return (
        <Table
            variant='striped'
            colorScheme='gray'
            __css={{ 'table-layout': 'fixed', width: '100%' }}
        >
            <Thead>
                <Tr display='flex' alignItems='center' flex={1}>
                    <Th
                        borderBottom='none'
                        fontSize='sm'
                        textTransform='uppercase'
                        fontWeight={700}
                        color='var(--chakra-colors-lime-600)'
                    >
                        ингредиенты
                    </Th>
                    <Th
                        borderBottom='none'
                        display='flex'
                        justifyContent='flex-end'
                        gap={4}
                        alignItems='center'
                        pr={0}
                        maxWidth='100%'
                    >
                        <Box
                            p={0}
                            fontSize='sm'
                            textTransform='uppercase'
                            fontWeight={700}
                            color='var(--chakra-colors-lime-600)'
                        >
                            порций
                        </Box>
                        <NumberInput
                            w={{ base: '73px', md: '90px' }}
                            value={value}
                            onChange={handleChange}
                            min={1}
                            max={100}
                            step={1}
                        >
                            <NumberInputField w={{ base: '73px', md: '90px' }} />
                            <NumberInputStepper>
                                <NumberIncrementStepper data-test-id='increment-stepper' />
                                <NumberDecrementStepper data-test-id='decrement-stepper' />
                            </NumberInputStepper>
                        </NumberInput>
                    </Th>
                </Tr>
            </Thead>
            <Tbody w='100%'>
                {adjustedIngredients?.map((ingredient, index) => (
                    <Tr
                        key={ingredient.title}
                        bg={index % 2 === 0 ? 'blackAlfa.100' : 'white'}
                        fontWeight={500}
                        _hover={{ bg: 'blackAlfa.100' }}
                    >
                        <Td fontSize='sm' color='blackAlfa.900'>
                            {ingredient.title}
                        </Td>
                        <Td
                            fontSize='sm'
                            color='blackAlfa.900'
                            textAlign='end'
                            data-test-id={`ingredient-quantity-${index}`}
                        >
                            {ingredient.count && ingredient.count} {ingredient.measureUnit}
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
