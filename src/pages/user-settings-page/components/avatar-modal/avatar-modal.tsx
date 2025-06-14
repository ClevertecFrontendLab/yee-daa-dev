import { Box, Button, HStack, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

import { ResultModal } from '~/components/result-modal/result-modal';
import { useAddAvatarMutation } from '~/redux/api/user-api';

import { getCroppedImg } from '../../utils';

type AvatarModalProps = {
    isOpen: boolean;
    previewUrl: string | null;
    onClose: () => void;
    changeAvatar: (avatar: string | null) => void;
};
export const AvatarModal: React.FC<AvatarModalProps> = ({
    isOpen,
    onClose,
    previewUrl,
    changeAvatar,
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const [uploadFile] = useAddAvatarMutation();

    const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const saveAvatar = async () => {
        if (!previewUrl || !croppedAreaPixels) return;

        try {
            const blob = (await getCroppedImg(previewUrl, croppedAreaPixels)) as Blob;
            const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });

            const formData = new FormData();
            formData.append('file', file);

            const response = await uploadFile(formData).unwrap();
            changeAvatar(response.photoLink);
            onClose();
            URL.revokeObjectURL(previewUrl);
        } catch (error) {
            onClose();
            URL.revokeObjectURL(previewUrl);
            console.error('Ошибка при сохранении аватара:', error);
        }
    };

    return (
        <ResultModal
            imageUrl=''
            isOpen={isOpen}
            onClose={onClose}
            title='Изменить изображение профиля'
        >
            <ModalBody>
                <HStack justifyContent='center'>
                    {previewUrl && (
                        <Box
                            width='206px'
                            height='206px'
                            position='relative'
                            bg='gray.100'
                            overflow='hidden'
                            alignItems='center'
                        >
                            <Cropper
                                image={previewUrl}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                                cropShape='round'
                                showGrid={false}
                                style={{
                                    cropAreaStyle: {
                                        color: 'rgba(45, 177, 0, 0.5)',
                                    },
                                }}
                            />
                        </Box>
                    )}
                </HStack>
            </ModalBody>
            <ModalFooter>
                <Button variant='black' w='full' size='lg' mt='32px' onClick={saveAvatar}>
                    Кадрировать и сохранить
                </Button>
            </ModalFooter>
        </ResultModal>
    );
};
