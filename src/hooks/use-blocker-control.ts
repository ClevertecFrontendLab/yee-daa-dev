import { useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useBlocker } from 'react-router';

export const useBlockerControl = (condition: boolean) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const blocker = useBlocker(() => condition);

    const handleContinueNavigation = () => {
        onClose();
        blocker?.proceed?.();
    };

    const handleCancelNavigation = () => {
        onClose();
        blocker?.reset?.();
    };

    useEffect(() => {
        if (blocker?.state === 'blocked') {
            onOpen();
        }
    }, [blocker, onOpen]);

    return { isOpen, handleContinueNavigation, handleCancelNavigation, onClose };
};
