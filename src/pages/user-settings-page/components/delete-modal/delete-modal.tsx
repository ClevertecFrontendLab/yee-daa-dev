import { Button, ModalBody, ModalFooter, Text, VStack } from '@chakra-ui/react';

import { ResultModal } from '~/components/result-modal/result-modal';
import { useDeleteUserMutation } from '~/redux/api/user-api';

type DeleteModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose }) => {
    const [deleteUser] = useDeleteUserMutation();
    const handleDeleteProfile = () => {
        deleteUser();
        onClose();
    };

    return (
        <ResultModal
            imageUrl='/images/breakfast.png'
            isOpen={isOpen}
            onClose={onClose}
            title='Действительно хотите удалить свой аккаунт?'
        >
            <ModalBody>
                <VStack spacing='16px' width='100%'>
                    <Text fontSize='md' lineHeight={6} textAlign='center' color='blackAlpha.700'>
                        Если вы удалите аккаунт, вы больше не сможете всеми функциями сервиса,
                        которые вы использовали.
                    </Text>
                    <Text fontSize='md' lineHeight={6} textAlign='center' color='blackAlpha.700'>
                        Мы удалим все ваши опубликованные рецепты и записи в блоге.
                    </Text>
                </VStack>
            </ModalBody>
            <ModalFooter>
                <VStack spacing='32px' width='100%'>
                    <Button variant='black' w='full' size='lg' mt={8} onClick={handleDeleteProfile}>
                        Удалить мой аккаунт
                    </Button>
                    <Text fontSize='xs' lineHeight={4} color='blackAlpha.600'>
                        Остались вопросы? Свяжитесь с поддержкой
                    </Text>
                </VStack>
            </ModalFooter>
        </ResultModal>
    );
};
