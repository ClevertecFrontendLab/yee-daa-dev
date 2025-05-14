import {
    Box,
    Button,
    Center,
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
} from '@chakra-ui/react';
import { FC } from 'react';

import { ImgIcon } from '../icons/img-icon';

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentImage?: string;
    isExistingImage: boolean;
    onImageSelect: () => void;
    onSave: () => void;
    onDelete: () => void;
    isLoading?: boolean;
}

export const ImageModal: FC<ImageModalProps> = ({
    isOpen,
    onClose,
    currentImage,
    isExistingImage,
    onImageSelect,
    onSave,
    onDelete,
    isLoading = false,
}) => (
    <Modal isOpen={isOpen} onClose={isLoading ? () => {} : onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW='400px'>
            <ModalHeader>Изображение</ModalHeader>
            <ModalCloseButton isDisabled={isLoading} />
            <ModalBody data-test-id='recipe-image-modal'>
                <VStack spacing={4} pb={4}>
                    {currentImage ? (
                        <Image
                            src={currentImage}
                            alt='Preview'
                            fallbackSrc='/placeholder.png'
                            objectFit='cover'
                            w='100%'
                            h='300px'
                            border='1px solid'
                            borderColor='gray.300'
                            borderRadius='lg'
                            cursor={isLoading ? 'not-allowed' : 'pointer'}
                            onClick={isLoading ? undefined : onImageSelect}
                            data-test-id='recipe-image-modal-preview-image'
                            _hover={{
                                borderColor: isLoading ? 'gray.300' : 'gray.400',
                            }}
                        />
                    ) : (
                        <Box
                            border='1px solid'
                            borderColor='gray.300'
                            borderRadius='lg'
                            p={4}
                            bg='blackAlpha.200'
                            width='100%'
                            height='300px'
                            onClick={isLoading ? undefined : onImageSelect}
                            _hover='gray.300'
                            data-test-id='recipe-image-modal-image-block'
                        >
                            <Center height='100%' flexDirection='column'>
                                <ImgIcon w={8} h={7} />
                            </Center>
                        </Box>
                    )}
                    {currentImage && (
                        <HStack spacing={4} w='100%'>
                            {!isExistingImage && (
                                <Button
                                    colorScheme='green'
                                    w='100%'
                                    onClick={onSave}
                                    isDisabled={isLoading}
                                    data-test-id='recipe-image-modal-save-button'
                                >
                                    Сохранить
                                </Button>
                            )}
                            <Button
                                variant='outline'
                                w='100%'
                                onClick={onDelete}
                                isDisabled={isLoading}
                                data-test-id='recipe-image-modal-delete-button'
                            >
                                Удалить
                            </Button>
                        </HStack>
                    )}
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
);
