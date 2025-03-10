import { Stack } from '@chakra-ui/icons';
import { Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useDetectParams } from '~/hooks/use-detect-params';
import { selectFilteredRecipes, selectIsFilterError } from '~/redux/features/recipes-slice';
import { PageType } from '~/types/page.ts';
import { isArrayWithItems } from '~/utils/is-array-with-items';

export const SectionInfo: FC<{ pageType: PageType }> = ({ pageType }) => {
    const { selectedCategory } = useDetectParams();
    const filteredRecipes = useAppSelector(selectFilteredRecipes);
    const isError = useAppSelector(selectIsFilterError);

    const description = selectedCategory?.description;
    const title = selectedCategory?.title ?? '';

    const headingTitle: Record<PageType, string> = {
        main: 'Приятного аппетита!',
        juiciest: 'Самое сочное',
        category: title,
    };
    const isUsualFlow = pageType !== PageType.Juiciest && isArrayWithItems(filteredRecipes);
    const isNoMatchTextShowed =
        pageType !== PageType.Juiciest && !isError && !isArrayWithItems(filteredRecipes);

    return (
        <Stack spacing={3} mb={8}>
            {isUsualFlow && (
                <Heading fontSize={{ base: '2xl', xl: '5xl' }} lineHeight='none' textAlign='center'>
                    {headingTitle[pageType]}
                </Heading>
            )}
            {isNoMatchTextShowed && (
                <Text
                    fontSize={{ base: 'sm', md: 'md' }}
                    lineHeight={{ base: 5, md: 6 }}
                    fontWeight={700}
                    color='blackAlpha.600'
                    textAlign='center'
                >
                    {'По вашему запросу ничего не найдено.\nПопробуйте другой запрос'}
                </Text>
            )}
            {description && isUsualFlow && (
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
