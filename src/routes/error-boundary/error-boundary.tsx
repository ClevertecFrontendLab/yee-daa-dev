import { InfoIcon } from '@chakra-ui/icons';
import {
    Button,
    Heading,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
} from '@chakra-ui/react';
import { isRouteErrorResponse, useRouteError } from 'react-router';

export const ErrorBoundary = () => {
    const error = useRouteError();

    return (
        <Modal
            isOpen={true}
            onClose={() => {}}
            closeOnOverlayClick={false}
            scrollBehavior='inside'
            size={{ base: 'xs', md: 'md', lg: 'lg' }}
            isCentered={true}
        >
            <ModalOverlay />
            <ModalContent display='flex' flexDirection='column' alignItems='center'>
                <ModalHeader textAlign='center' p={6}>
                    Произошла ошибка при формировании доступных категорий или категории не получены
                    со стороны сервера.
                </ModalHeader>

                <ModalBody textAlign='center' p={6}>
                    {isRouteErrorResponse(error) ? (
                        <Stack spacing={10} alignItems='center' w='80%' m='auto'>
                            <InfoIcon color='red.300' />
                            <Heading as='h3' size='lg'>
                                {error.status} {error.statusText}
                            </Heading>
                            <Text fontSize='lg' wordBreak='break-all'>
                                {error.data}
                            </Text>
                        </Stack>
                    ) : (
                        <Text textAlign='center' padding={2}>
                            Проверьте подключение к интернету и доступность сервера, а также
                            правильность введенного пути. Список категорий и подкатегорий для блюд
                            временно недоступен. Попробуйте сформировать запрос позже
                        </Text>
                    )}
                </ModalBody>

                <ModalFooter alignItems='center'>
                    <Button
                        colorScheme='red'
                        size={{ base: 'xs', md: 'md', lg: 'lg' }}
                        mr={3}
                        onClick={() => window.location.reload()}
                    >
                        Перезагрузить страницу
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
