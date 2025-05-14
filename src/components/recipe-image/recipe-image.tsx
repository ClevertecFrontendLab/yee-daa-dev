import { FormControl, useMediaQuery } from '@chakra-ui/react';
import { Control, FieldErrors } from 'react-hook-form';

import { ImageUpload } from '~/components/image-upload/image-upload';
import { theme } from '~/theme/theme';
import { RecipeFormValues } from '~/types/recipe-form';

interface RecipeImageProps {
    control: Control<RecipeFormValues>;
    errors: FieldErrors<RecipeFormValues>;
}

export const RecipeImage = ({ control, errors }: RecipeImageProps) => {
    const [isLargeScreen] = useMediaQuery(`(width > ${theme.breakpoints.xl})`);
    const [isSmallScreen] = useMediaQuery(`(width < ${theme.breakpoints.md})`);

    return (
        <FormControl
            isInvalid={!!errors.image}
            mb={4}
            maxWidth={isSmallScreen ? 'none' : isLargeScreen ? '553px' : '232px'}
            width='100%'
            h={isLargeScreen ? 410 : 224}
        >
            <ImageUpload
                testId='recipe-image-block'
                name='image'
                control={control}
                rules={{ required: true }}
            />
        </FormControl>
    );
};
