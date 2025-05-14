import {
    FormControl,
    HStack,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    Textarea,
    useMediaQuery,
    VStack,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';

import { MultiSelect } from '~/components/multi-select';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { selectSubCategories } from '~/redux/features/categories-slice';
import { theme } from '~/theme/theme';
import { RecipeFormValues } from '~/types/recipe-form';

interface RecipeInfoProps {
    control: Control<RecipeFormValues>;
    register: UseFormRegister<RecipeFormValues>;
    errors: FieldErrors<RecipeFormValues>;
}

export const RecipeInfo = ({ control, register, errors }: RecipeInfoProps) => {
    const [isSmallScreen] = useMediaQuery(`(width < ${theme.breakpoints.md})`);
    const subCategories = useAppSelector(selectSubCategories);

    const categoryOptions = useMemo(
        () =>
            subCategories.map((category) => ({
                id: category.id,
                label: category.title,
                value: category.id,
            })),
        [subCategories],
    );

    return (
        <VStack
            flex='1'
            alignItems='start'
            maxWidth={isSmallScreen ? undefined : '668px'}
            spacing={8}
            w='100%'
        >
            <HStack justify='space-between' width='100%'>
                <Text
                    fontWeight={600}
                    fontSize={isSmallScreen ? 'sm' : 'md'}
                    lineHeight={isSmallScreen ? 'short' : 'normal'}
                >
                    Выберите не менее 3-х тегов
                </Text>
                <MultiSelect
                    name='categoriesIds'
                    control={control}
                    options={categoryOptions}
                    placeholder='Выберите из списка...'
                    rules={{ required: true }}
                    data-test-id='recipe-categories'
                />
            </HStack>
            <FormControl isInvalid={!!errors.title}>
                <Input
                    id='title'
                    placeholder='Название рецепта'
                    data-test-id='recipe-title'
                    _focus={{ borderColor: 'lime.150', boxShadow: 'none' }}
                    {...register('title', {
                        required: true,
                        maxLength: 50,
                    })}
                />
            </FormControl>
            <FormControl isInvalid={!!errors.description}>
                <Textarea
                    id='description'
                    placeholder='Краткое описание рецепта'
                    data-test-id='recipe-description'
                    _focus={{ borderColor: 'lime.150', boxShadow: 'none' }}
                    {...register('description', {
                        required: true,
                        maxLength: 500,
                    })}
                />
            </FormControl>
            <HStack spacing={6} width='100%'>
                <Text
                    fontWeight={600}
                    fontSize={isSmallScreen ? 'sm' : 'md'}
                    lineHeight={isSmallScreen ? 'short' : 'normal'}
                >
                    На сколько человек ваш рецепт?
                </Text>
                <FormControl isInvalid={!!errors.portions} w={90}>
                    <Controller
                        name='portions'
                        control={control}
                        rules={{ required: true, min: 1 }}
                        render={({ field: { onChange, value } }) => (
                            <NumberInput
                                step={1}
                                value={value}
                                onChange={(value) => {
                                    let val;

                                    switch (value) {
                                        case '':
                                            val = '';
                                            break;
                                        case '-':
                                            val = '-';
                                            break;
                                        default:
                                            val = Number(value);
                                    }
                                    onChange(val);
                                }}
                            >
                                <NumberInputField
                                    data-test-id='recipe-portions'
                                    _focus={{ borderColor: 'lime.150', boxShadow: 'none' }}
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        )}
                    />
                </FormControl>
            </HStack>
            <HStack spacing={6} width='100%'>
                <Text
                    fontWeight={600}
                    fontSize={isSmallScreen ? 'sm' : 'md'}
                    lineHeight={isSmallScreen ? 'short' : 'normal'}
                >
                    Сколько времени готовить в минутах?
                </Text>
                <FormControl isInvalid={!!errors.time} w={90}>
                    <Controller
                        name='time'
                        control={control}
                        rules={{
                            required: true,
                            min: 1,
                            max: 10000,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <NumberInput
                                step={1}
                                value={value}
                                onChange={(value) => {
                                    let val;

                                    switch (value) {
                                        case '':
                                            val = '';
                                            break;
                                        case '-':
                                            val = '-';
                                            break;
                                        default:
                                            val = Number(value);
                                    }
                                    onChange(val);
                                }}
                            >
                                <NumberInputField
                                    id='time'
                                    data-test-id='recipe-time'
                                    _focus={{ borderColor: 'lime.150', boxShadow: 'none' }}
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        )}
                    />
                </FormControl>
            </HStack>
        </VStack>
    );
};
