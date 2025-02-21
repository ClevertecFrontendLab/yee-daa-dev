import { Box, Text } from '@chakra-ui/react';

import { PLACEHOLDER_SELECT } from '../../../constants/select';

export const SelectedItems: React.FC<{ selectedItems?: string[] }> = ({ selectedItems }) => {
    return (
        <Box display='flex' flexWrap='wrap' w='100%'>
            {selectedItems?.length ? (
                selectedItems.map((item) => (
                    <Box
                        key={item}
                        border={`1px solid var(--chakra-colors-lime-300)`}
                        borderRadius='md'
                        p={1}
                        mr={1}
                        fontSize='xs'
                        fontWeight={500}
                        display='inline-block'
                    >
                        <Text color='var(--chakra-colors-lime-600)'>{item}</Text>
                    </Box>
                ))
            ) : (
                <Text color='gray.500' noOfLines={1} isTruncated>
                    {PLACEHOLDER_SELECT}
                </Text>
            )}
        </Box>
    );
};
