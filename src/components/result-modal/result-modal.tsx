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
        isClosable?: boolean;
    };

export const ResultModal: FC<ResultModalProps> = ({
    children,
    variant = 'auth',
    title,
    imageUrl,
    onClose,
    isClosable = true,
    ...props
}) => (
    <Modal isCentered {...{ variant, onClose }} {...props}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader mb={4}>
                {isClosable && (
                    <IconButton
                        aria-label='Close modal'
                        icon={<ModalCloseIcon />}
                        position='absolute'
                        minW={6}
                        h={6}
                        top={5}
                        right={6}
                        lineHeight={0}
                        onClick={onClose}
                        variant='unstyled'
                        _hover={{
                            color: 'blackAlpha.800',
                        }}
                    />
                )}

                <Stack align='center' gap={8}>
                    {imageUrl && <Image src={imageUrl} alt='breakfast' />}
                    {title && (
                        <Heading
                            as='h2'
                            fontSize='2xl'
                            textAlign='center'
                            flexDirection='column'
                            mt={imageUrl ? 0 : 5}
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
