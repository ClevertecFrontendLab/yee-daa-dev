import { Button, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { PenIcon } from '../icons/pen-icon';
import { ResultModal } from '../result-modal/result-modal';

interface ExitWithoutSavingModalProps {
    isOpen: boolean;
    handleContinueNavigation: () => void;
    handleCancelNavigation: () => void;
    isLoading: boolean;
    onSaveDraft: () => void;
}

export const ExitWithoutSavingModal: FC<ExitWithoutSavingModalProps> = ({
    isOpen,
    handleCancelNavigation,
    handleContinueNavigation,
    isLoading,
    onSaveDraft,
}) => (
    <ResultModal
        title='Выйти без сохранения?'
        isCentered
        isOpen={isOpen}
        onClose={handleCancelNavigation}
        imageUrl='/images/breakfast.png'
    >
        <ModalBody>
            <Text
                color='blackAlpha.700'
                textAlign='center'
                fontSize='md'
                paddingX={{ bage: 0, md: 8 }}
            >
                Чтобы сохранить, нажмите кнопку сохранить черновик
            </Text>
        </ModalBody>
        <ModalFooter mt={8} flexDirection='column' gap={4}>
            <Button
                leftIcon={<PenIcon w={4} h={4} />}
                colorScheme='black'
                isLoading={isLoading}
                variant='outline'
                onClick={onSaveDraft}
                type='button'
            >
                Сохранить черновик
            </Button>
            <Button
                colorScheme='black'
                isLoading={isLoading}
                variant='ghost'
                onClick={handleContinueNavigation}
                type='button'
            >
                Выйти без сохранения
            </Button>
        </ModalFooter>
    </ResultModal>
);
