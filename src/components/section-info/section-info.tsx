import { Stack } from '@chakra-ui/icons';
import { Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { useDetectParams } from '~/hooks/use-detect-params';
import { PageType } from '~/types/page.ts';

export const SectionInfo: FC<{ pageType: PageType }> = ({ pageType }) => {
    const { selectedCategory } = useDetectParams();

    const description = selectedCategory?.description;
    const title = selectedCategory?.title ?? '';

    const headingTitle: Record<PageType, string> = {
        main: 'Приятного аппетита!',
        juiciest: 'Самое сочное',
        category: title,
    };

    return (
        <Stack spacing={3} mb={8}>
            <Heading fontSize={{ base: '2xl', xl: '5xl' }} lineHeight='none' textAlign='center'>
                {headingTitle[pageType]}
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
