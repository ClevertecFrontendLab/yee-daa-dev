import { Stack } from '@chakra-ui/icons';
import { Heading, Text } from '@chakra-ui/react';

import { sectionHeaderInfo } from '../../constants/section-header-info.ts';
import { useSecondLevelPath } from '../../hooks/use-second-level-path.tsx';

export const SectionInfo = () => {
    const secondLevelPath = useSecondLevelPath();
    const { title, description } = sectionHeaderInfo[secondLevelPath];

    return (
        <Stack spacing={3} mb={8}>
            <Heading fontSize={{ base: '2xl', xl: '5xl' }} lineHeight='none' textAlign='center'>
                {title}
            </Heading>
            {description && (
                <Text
                    fontSize={{ base: 'sm', md: 'md' }}
                    lineHeight={{ base: 5, md: 6 }}
                    fontWeight={500}
                    color='blackAlpha.600'
                    textAlign='center'
                >
                    {description}
                </Text>
            )}
        </Stack>
    );
};
