import { Box, Center, useDisclosure } from '@chakra-ui/react';
import { FC, useRef, useState } from 'react';
import { Control, useController } from 'react-hook-form';

import { useUploadFileMutation } from '~/redux/api/file-api';
import { RecipeFormValues } from '~/types/recipe-form';
import { getAbsoluteImagePath } from '~/utils/get-absolute-image-path';

import { ImgIcon } from '../icons/img-icon';
import { ImageModal } from '../image-modal/image-modal';

interface ImageUploadProps {
    control: Control<RecipeFormValues>;
    name: 'image' | `steps.${number}.image`;
    rules?: {
        required?: string | boolean;
    };
    testId?: string;
}

export const ImageUpload: FC<ImageUploadProps> = ({ control, name, rules, testId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [uploadFile, { isLoading }] = useUploadFileMutation();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const {
        field: { value: imageUrl, onChange },
        fieldState: { error },
    } = useController({
        name,
        control,
        rules,
    });

    const handleFileSelect = () => {
        if (isLoading) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isLoading) return;
        const file = event.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        const localPreviewUrl = URL.createObjectURL(file);
        setPreviewUrl(localPreviewUrl);
    };

    const handleSave = async () => {
        if (!selectedFile || isLoading) return;

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            const response = await uploadFile(formData).unwrap();
            onChange(response.url);
            setSelectedFile(null);
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
                setPreviewUrl(null);
            }
        } catch (error) {
            console.error(error);
        }
        onClose();
    };

    const handleDelete = () => {
        if (isLoading) return;
        onChange(null);
        setSelectedFile(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onClose();
    };

    const handleModalClose = () => {
        if (isLoading) return;
        if (!imageUrl) {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
                setPreviewUrl(null);
            }
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
        onClose();
    };

    const isExistingImage = Boolean(imageUrl?.startsWith('http'));
    const modalPreviewUrl = previewUrl || (imageUrl ? getAbsoluteImagePath(imageUrl) : undefined);
    const pagePreviewUrl = imageUrl ? getAbsoluteImagePath(imageUrl) : undefined;

    return (
        <Box width='100%' height='100%' data-test-id={testId}>
            <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                accept='image/*'
                style={{ display: 'none' }}
                data-test-id={`${testId}-input-file`}
            />
            {pagePreviewUrl ? (
                <Box
                    position='relative'
                    width='100%'
                    height='100%'
                    borderRadius='md'
                    overflow='hidden'
                    onClick={onOpen}
                    cursor='pointer'
                    border='1px solid'
                    borderColor={error ? 'red.500' : 'transparent'}
                >
                    <Box
                        as='img'
                        src={pagePreviewUrl}
                        alt='Preview'
                        width='100%'
                        height='100%'
                        objectFit='cover'
                        data-test-id={`${testId}-preview-image`}
                    />
                </Box>
            ) : (
                <Box
                    border='1px solid'
                    borderColor={error ? 'red.500' : 'gray.200'}
                    boxShadow={error ? '0 0 0 1px #E53E3E' : 'none'}
                    borderRadius='md'
                    p={4}
                    bg='blackAlpha.200'
                    width='100%'
                    height='100%'
                    onClick={onOpen}
                    cursor='pointer'
                >
                    <Center height='100%' flexDirection='column'>
                        <ImgIcon w={8} h={7} />
                    </Center>
                </Box>
            )}

            <ImageModal
                isOpen={isOpen}
                onClose={handleModalClose}
                currentImage={modalPreviewUrl}
                isExistingImage={isExistingImage}
                onImageSelect={handleFileSelect}
                onSave={handleSave}
                onDelete={handleDelete}
                isLoading={isLoading}
            />
        </Box>
    );
};
