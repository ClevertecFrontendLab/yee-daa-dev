import { Modal, ModalContent, ModalOverlay, ModalOverlayProps } from '@chakra-ui/react';

import { useIsMobile } from '~/hooks/media-query';

import { Loader } from '../loader';

type AppLoaderProps = {
    isOpen: boolean;
    overlayColor?: ModalOverlayProps['bgColor'];
};

export const AppLoader = ({ isOpen, overlayColor = 'black.300' }: AppLoaderProps) => {
    const isMobileWidth = useIsMobile();
    return (
        <Modal isOpen={isOpen} onClose={() => {}} closeOnEsc={false} isCentered={true}>
            <ModalOverlay bgColor={overlayColor} backdropFilter='blur(4px)' pointerEvents='none' />
            <ModalContent w='fit-content' bg='transparent' border='none' shadow='none'>
                <Loader
                    boxSize={isMobileWidth ? 134 : 206}
                    size='xl'
                    color='black'
                    data-test-id='app-loader'
                />
            </ModalContent>
        </Modal>
    );
};
