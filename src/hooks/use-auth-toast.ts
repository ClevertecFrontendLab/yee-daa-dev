import { useToast, UseToastOptions } from '@chakra-ui/react';

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
                ...options,
            });
        }
    };

    baseToast.isActive = toast.isActive;

    return {
        toast: baseToast,
    };
};
