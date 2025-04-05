import { Modal, ModalContent, ModalOverlay, ModalOverlayProps } from '@chakra-ui/react';

import { CyTestId } from '~/cy-test-id';
import { useIsMobile } from '~/hooks/media-query';

import { Loader } from '../loader';

type AppLoaderProps = {
    isOpen: boolean;
    overlayColor?: ModalOverlayProps['bgColor'];
};

export const AppLoader = ({ isOpen, overlayColor = 'blackAlpha.300' }: AppLoaderProps) => {
    const isMobileWidth = useIsMobile();
    return (
        <Modal isOpen={isOpen} onClose={() => {}} closeOnEsc={false} isCentered={true}>
            <ModalOverlay bgColor={overlayColor} backdropFilter='blur(2px)' pointerEvents='none' />
            <ModalContent
                data-test-id={CyTestId.AppLoader}
                w='fit-content'
                bg='transparent'
                border='none'
                shadow='none'
            >
                <Loader
                    boxSize={isMobileWidth ? 134 : 206}
                    size={isMobileWidth ? 'md' : 'lg'}
                    color='black'
                />
            </ModalContent>
        </Modal>
    );
};
