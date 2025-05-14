import { Button, Flex } from '@chakra-ui/react';

import { PenIcon } from '~/components/icons/pen-icon';
import { useIsSmallScreen } from '~/hooks/media-query';

type FormButtonsProps = {
    isSubmitting: boolean;
    onSaveDraft: VoidFunction;
    isLoading: boolean;
};

export const FormButtons = ({ isSubmitting, onSaveDraft, isLoading }: FormButtonsProps) => {
    const isSmallScreen = useIsSmallScreen();

    return (
        <Flex gap={5} justifyContent='center' direction={isSmallScreen ? 'column' : 'row'} w='100%'>
            <Button
                leftIcon={<PenIcon w={4} h={4} />}
                colorScheme='black'
                isLoading={isLoading}
                variant='outline'
                onClick={onSaveDraft}
                type='button'
                data-test-id='recipe-save-draft-button'
            >
                Сохранить черновик
            </Button>
            <Button
                bg='black'
                color='white'
                isLoading={isSubmitting}
                type='submit'
                data-test-id='recipe-publish-recipe-button'
            >
                Опубликовать рецепт
            </Button>
        </Flex>
    );
};
