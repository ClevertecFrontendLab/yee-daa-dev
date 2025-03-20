import { Box, Text } from '@chakra-ui/react';

import { PLACEHOLDER_SELECT, PLACEHOLDER_SELECT_DRAWER } from '~/constants/select';
import { StrOrNull } from '~/types/common';
import { isArrayWithItems } from '~/utils/is-array-with-items';

type SelectedItemsProps = Partial<{
    selectedItems: StrOrNull[];
    fromFilter: boolean;
}>;
export const SelectedItems: React.FC<SelectedItemsProps> = ({ selectedItems, fromFilter }) => (
    <Box display='flex' flexWrap='wrap' w='100%'>
        {isArrayWithItems(selectedItems) ? (
            selectedItems.map((item) => (
                <Box
                    key={item}
                    border='1px solid var(--chakra-colors-lime-300)'
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
                {fromFilter ? PLACEHOLDER_SELECT_DRAWER : PLACEHOLDER_SELECT}
            </Text>
        )}
    </Box>
);
