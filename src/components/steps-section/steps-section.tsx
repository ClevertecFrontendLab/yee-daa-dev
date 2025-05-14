import {
    Badge,
    Box,
    Button,
    FormControl,
    Grid,
    HStack,
    IconButton,
    Text,
    Textarea,
    useMediaQuery,
    VStack,
} from '@chakra-ui/react';
import { Control, FieldErrors, useFieldArray, UseFormRegister } from 'react-hook-form';

import { AddPlusIcon } from '~/components/icons/add-plus-icon';
import { ImageUpload } from '~/components/image-upload/image-upload';
import { theme } from '~/theme/theme';
import { RecipeFormValues } from '~/types/recipe-form';

import { BasketIcon } from '../icons/basket-icon';

interface StepsSectionProps {
    control: Control<RecipeFormValues>;
    register: UseFormRegister<RecipeFormValues>;
    errors: FieldErrors<RecipeFormValues>;
}

export const StepsSection = ({ control, register, errors }: StepsSectionProps) => {
    const {
        fields: steps,
        append: appendStep,
        remove: removeStep,
        update,
    } = useFieldArray({
        control,
        name: 'steps',
    });
    const [isSmallScreen] = useMediaQuery(`(width < ${theme.breakpoints.md})`);

    const handleRemoveStep = (index: number) => {
        steps.forEach((step, i) => {
            if (i > index) {
                update(i, { ...step, stepNumber: i });
            }
        });
        removeStep(index);
    };

    return (
        <VStack spacing={4} w='100%' alignItems='center'>
            <Text
                fontWeight={600}
                fontSize={isSmallScreen ? 'sm' : 'md'}
                lineHeight={isSmallScreen ? 'short' : 'normal'}
                textAlign='center'
                w='100%'
            >
                Добавьте шаги приготовления
            </Text>
            {steps.map((_field, index) => (
                <Grid
                    templateColumns={isSmallScreen ? '1fr' : '1fr 1fr'}
                    templateRows={isSmallScreen ? '1fr 1fr' : '1fr'}
                    key={index}
                    w='100%'
                    maxW='668px'
                    minHeight='168px'
                    borderRadius='lg'
                    border='1px solid'
                    borderColor='blackAlpha.200'
                    p={0}
                >
                    <ImageUpload
                        testId={`recipe-steps-image-block-${index}`}
                        name={`steps.${index}.image`}
                        control={control}
                    />
                    <VStack spacing={4} align='stretch' h='100%' p={5} minW={0}>
                        <HStack justify='space-between'>
                            <Badge
                                fontSize='md'
                                w='fit-content'
                                px={3}
                                py={1}
                                borderRadius='md'
                                colorScheme='gray'
                                textTransform='none'
                            >
                                Шаг {_field.stepNumber}
                            </Badge>
                            {index > 0 && (
                                <IconButton
                                    variant='unstyled'
                                    fontSize='14px'
                                    aria-label='Remove'
                                    icon={<BasketIcon />}
                                    data-test-id={`recipe-steps-remove-button-${index}`}
                                    h={2}
                                    onClick={() => handleRemoveStep(index)}
                                    sx={{
                                        display: 'grid',
                                        placeItems: 'center',
                                    }}
                                />
                            )}
                        </HStack>

                        <FormControl isInvalid={!!errors.steps?.[index]?.description} flex={1}>
                            <Textarea
                                placeholder='Шаг'
                                resize='vertical'
                                data-test-id={`recipe-steps-description-${index}`}
                                _focus={{ borderColor: 'lime.150', boxShadow: 'none' }}
                                {...register(`steps.${index}.description`, {
                                    required: 'Поле обязательно для заполнения',
                                    maxLength: 300,
                                })}
                            />
                        </FormControl>
                    </VStack>
                </Grid>
            ))}
            <Box w='100%' maxW='668px' display='flex' justifyContent='flex-end'>
                <Button
                    rightIcon={<AddPlusIcon />}
                    variant='outline'
                    onClick={() => {
                        appendStep({
                            description: null,
                            image: null,
                            stepNumber: steps.length + 1,
                        });
                    }}
                >
                    Новый шаг
                </Button>
            </Box>
        </VStack>
    );
};
