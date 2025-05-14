import {
    FormControl,
    Grid,
    HStack,
    IconButton,
    Input,
    NumberInput,
    NumberInputField,
    Select,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Control, Controller, FieldErrors, useFieldArray, UseFormRegister } from 'react-hook-form';

import { AddPlusIcon } from '~/components/icons/add-plus-icon';
import { PlusIcon } from '~/components/icons/plus-icon';
import { MAX_SECTION_LENGTH } from '~/containers/validations';
import { useIsSmallScreen } from '~/hooks/media-query';
import { useGetMeasureUnitsQuery } from '~/redux/api/measure-api';
import { RecipeFormValues } from '~/types/recipe-form';

import { BasketIcon } from '../icons/basket-icon';

type IngredientsSectionProps = {
    control: Control<RecipeFormValues>;
    register: UseFormRegister<RecipeFormValues>;
    errors: FieldErrors<RecipeFormValues>;
};

export const IngredientsSection = ({ control, register, errors }: IngredientsSectionProps) => {
    const { data: measureUnits = [] } = useGetMeasureUnitsQuery();

    const isSmallScreen = useIsSmallScreen();

    const {
        fields: ingredients,
        append: appendIngredient,
        remove: removeIngredient,
    } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const handleAddIngredient = () => {
        if (ingredients.length <= MAX_SECTION_LENGTH) {
            appendIngredient({
                measureUnit: null,
                title: null,
                count: 0,
            });
        }
    };

    return (
        <VStack spacing={4} w='100%' alignItems='center'>
            <HStack spacing={2} w='100%' justifyContent='center'>
                <Text
                    fontWeight={600}
                    fontSize={isSmallScreen ? 'sm' : 'md'}
                    lineHeight={isSmallScreen ? 'short' : 'normal'}
                >
                    Добавьте ингредиенты рецепта, нажав на
                </Text>
                <PlusIcon />
            </HStack>
            {isSmallScreen || (
                <Grid
                    templateColumns='minmax(150px, 2.5fr) minmax(80px, 1fr) minmax(150px, 2fr)'
                    gap={2}
                    w='100%'
                    maxW='668px'
                >
                    <Text fontWeight={600} fontSize='md' color='lime.600' textAlign='left'>
                        Ингредиент
                    </Text>
                    <Text fontWeight={600} fontSize='md' color='lime.600'>
                        Количество
                    </Text>
                    <Text fontWeight={600} fontSize='md' color='lime.600' textAlign='left'>
                        Единица измерения
                    </Text>
                </Grid>
            )}
            {ingredients.map((_field, index) => (
                <Grid
                    gap={4}
                    templateColumns={isSmallScreen ? '1fr' : 'minmax(150px, 293px) 1fr'}
                    key={index}
                    templateRows={isSmallScreen ? '1fr 1fr' : '1fr'}
                    w='100%'
                    maxW='668px'
                    minWidth={0}
                >
                    <FormControl isInvalid={!!errors.ingredients?.[index]?.title} minW={0} w='100%'>
                        <Input
                            data-test-id={`recipe-ingredients-title-${index}`}
                            id='title'
                            placeholder='Ингредиент'
                            _focus={{ borderColor: 'lime.150', boxShadow: 'none' }}
                            {...register(`ingredients.${index}.title`, {
                                required: true,
                            })}
                        />
                    </FormControl>
                    <Grid
                        gap={3}
                        templateColumns={
                            isSmallScreen
                                ? 'minmax(60px, 80px) minmax(120px, auto) 32px'
                                : 'minmax(60px, 80px) minmax(120px, 215px) 32px'
                        }
                    >
                        <FormControl
                            isInvalid={!!errors.ingredients?.[index]?.count}
                            minW={0}
                            w='100%'
                        >
                            <Controller
                                name={`ingredients.${index}.count`}
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
                                            placeholder='100'
                                            data-test-id={`recipe-ingredients-count-${index}`}
                                            _focus={{ borderColor: 'lime.150', boxShadow: 'none' }}
                                        />
                                    </NumberInput>
                                )}
                            />
                        </FormControl>
                        <Select
                            placeholder='Единица измерен...'
                            size='md'
                            id='categories'
                            minW={0}
                            w='100%'
                            isInvalid={!!errors.ingredients?.[index]?.measureUnit}
                            _focus={{ borderColor: 'lime.150', boxShadow: 'none' }}
                            data-test-id={`recipe-ingredients-measureUnit-${index}`}
                            {...register(`ingredients.${index}.measureUnit`, {
                                required: true,
                            })}
                        >
                            {measureUnits?.map((unit) => (
                                <option key={unit.id} value={unit.name}>
                                    {unit.name}
                                </option>
                            ))}
                        </Select>
                        {index === ingredients.length - 1 && ingredients.length < 50 ? (
                            <IconButton
                                isRound={true}
                                variant='unstyled'
                                fontSize='32px'
                                aria-label='Done'
                                data-test-id='recipe-ingredients-add-ingredients'
                                icon={<AddPlusIcon />}
                                onClick={handleAddIngredient}
                                sx={{
                                    display: 'grid',
                                    placeItems: 'center',
                                }}
                            />
                        ) : (
                            <IconButton
                                variant='unstyled'
                                fontSize='14px'
                                aria-label='Remove'
                                data-test-id={`recipe-ingredients-remove-ingredients-${index}`}
                                icon={<BasketIcon />}
                                onClick={() => removeIngredient(index)}
                                sx={{
                                    display: 'grid',
                                    placeItems: 'center',
                                }}
                            />
                        )}
                    </Grid>
                </Grid>
            ))}
        </VStack>
    );
};
