import {
    Heading,
    IconButton,
    Image,
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalProps,
    Stack,
} from '@chakra-ui/react';
import { FC, PropsWithChildren, ReactNode } from 'react';

import { ModalCloseIcon } from '../modal-close-icon/modal-close-icon';

type ResultModalProps = PropsWithChildren &
    ModalProps & {
        title?: ReactNode | ReactNode[];
        imageUrl?: string;
    };

export const ResultModal: FC<ResultModalProps> = ({
    children,
    variant = 'auth',
    title,
    imageUrl,
    onClose,
    ...props
}) => {
    return (
        <Modal isCentered {...{ variant, onClose }} {...props}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader mb={4}>
                    <IconButton
                        aria-label='Close modal'
                        icon={<ModalCloseIcon />}
                        position='absolute'
                        minW={6}
                        h={6}
                        top={5}
                        right={6}
                        onClick={onClose}
                        variant='unstyled'
                        _hover={{
                            color: 'blackAlpha.800',
                        }}
                    />

                    <Stack align='center' gap={8}>
                        {imageUrl && <Image src={imageUrl} alt='breakfast' />}
                        {title && (
                            <Heading
                                as='h2'
                                fontSize='xl'
                                textAlign='center'
                                flexDirection='column'
                            >
                                {title}
                            </Heading>
                        )}
                    </Stack>
                </ModalHeader>

                {children}
            </ModalContent>
        </Modal>
    );
};
