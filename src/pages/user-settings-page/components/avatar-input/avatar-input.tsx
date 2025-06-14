import { Avatar, AvatarBadge, Box, Input, useDisclosure } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { ImgBadgeIcon } from '~/components/icons/img-badge-icon';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { selectUser } from '~/redux/features/user-slice';
import { getAbsoluteImagePath } from '~/utils/get-absolute-image-path';

import { AvatarModal } from '../avatar-modal';

export const AvatarInput: React.FC = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { photoLink } = useAppSelector(selectUser);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(photoLink);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleBadgeClick = () => {
        inputRef.current?.click();
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);
            onOpen();
        }
    };
    useEffect(() => {
        if (photoLink) {
            setAvatarUrl(photoLink);
        }
    }, [photoLink]);
    return (
        <Box position='relative' display='inline-block'>
            <Avatar
                size='2xl'
                bg='blackAlpha.400'
                src={getAbsoluteImagePath(avatarUrl!) || undefined}
            >
                <AvatarBadge
                    boxSize='0.47em'
                    bg='black'
                    border='0.039em solid #FFF'
                    cursor='pointer'
                    onClick={handleBadgeClick}
                    transform='translate(-25%, -5%)'
                >
                    <ImgBadgeIcon boxSize='0.23em' />
                </AvatarBadge>
            </Avatar>

            <Input type='file' accept='image/*' ref={inputRef} onChange={handleFileChange} hidden />
            <AvatarModal
                isOpen={isOpen}
                onClose={onClose}
                previewUrl={previewUrl}
                changeAvatar={setAvatarUrl}
            />
        </Box>
    );
};
