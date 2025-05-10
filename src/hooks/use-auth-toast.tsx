import { CheckCircleIcon, InfoIcon, WarningIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Box, CloseButton, Flex, Text, useToast, UseToastOptions } from '@chakra-ui/react';

import { CyTestId } from '~/cy-test-id';

const getBgColor = (status: string) => {
    switch (status) {
        case 'success':
            return 'green.500';
        case 'error':
            return 'red.500';
        case 'warning':
            return 'orange.400';
        case 'info':
        default:
            return 'blue.500';
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'success':
            return <CheckCircleIcon boxSize={5} />;
        case 'warning':
            return <WarningTwoIcon boxSize={5} />;
        case 'info':
            return <InfoIcon boxSize={5} />;
        case 'error':
        default:
            return <WarningIcon boxSize={5} />;
    }
};

export const useAuthToast = () => {
    const toast = useToast();

    const baseToast = (options: UseToastOptions, centered = true) => {
        if (options.id && !toast.isActive(options.id)) {
            toast({
                status: 'error',
                duration: 15000,
                isClosable: true,
                position: 'bottom',
                containerStyle: {
                    width: '100%',
                    maxW: 424,
                    marginBottom: 20,
                    paddingX: 4,
                    marginRight: { base: 0, lg: centered ? 0 : '50%' },
                },
                render: ({ title, status = 'error', description, onClose }) => (
                    <Box
                        data-test-id={CyTestId.Notification.Error}
                        bg={getBgColor(status)}
                        color='white'
                        p={3}
                        borderRadius='md'
                    >
                        <Flex justify='space-between' gap={2}>
                            <Flex align='start' gap={4}>
                                <Box alignSelf='center' mb={1}>
                                    {getStatusIcon(status)}
                                </Box>
                                <Box>
                                    {title && <Text fontWeight='bold'>{title}</Text>}
                                    {description && <Text mt={1}>{description}</Text>}
                                </Box>
                            </Flex>

                            <CloseButton
                                data-test-id={CyTestId.Button.CloseAlert}
                                size='sm'
                                onClick={onClose}
                            />
                        </Flex>
                    </Box>
                ),
                ...options,
            });
        }
    };

    baseToast.isActive = toast.isActive;

    return {
        toast: baseToast,
    };
};
