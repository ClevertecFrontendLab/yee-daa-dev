import { Box, Text } from '@chakra-ui/react';

import { PLACEHOLDER_SELECT } from '../../../../constants/select';

export const SelectedAllergens: React.FC<{ selectedAllergens: string[] }> = ({
    selectedAllergens,
}) => {
    return (
        <Box display='flex' flexWrap='wrap' w='100%'>
            {selectedAllergens.length ? (
                selectedAllergens.map((allergen) => (
                    <Box
                        key={allergen}
                        border={`1px solid #C4FF61`}
                        borderRadius='md'
                        p={1}
                        mr={1}
                        fontSize='xs'
                        display='inline-block'
                    >
                        <Text color='#C4FF61'>{allergen}</Text>
                    </Box>
                ))
            ) : (
                <Text color='gray.500'>{PLACEHOLDER_SELECT}</Text>
            )}
        </Box>
    );
};
