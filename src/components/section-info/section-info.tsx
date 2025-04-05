import { Stack } from '@chakra-ui/icons';
import { Heading, Text } from '@chakra-ui/react';
import { FC, Fragment, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useDetectParams } from '~/hooks/use-detect-params';
import { selectShowEmptyText, setShowedEmptyText } from '~/redux/features/recipes-slice';
import { PageType } from '~/types/page.ts';

export const SectionInfo: FC<{ pageType: PageType }> = ({ pageType }) => {
    const { selectedCategory } = useDetectParams();
    const showEmptyText = useAppSelector(selectShowEmptyText);
    const dispatch = useAppDispatch();

    const description = selectedCategory?.description;
    const title = selectedCategory?.title ?? '';

    const headingTitle: Record<PageType, string> = {
        main: 'Приятного аппетита!',
        juiciest: 'Самое сочное',
        category: title,
    };

    const isJuiciestPage = pageType === PageType.Juiciest;

    useEffect(
        () => () => {
            dispatch(setShowedEmptyText(false));
        },
        [dispatch],
    );

    return (
        <Stack spacing={3} mb={8}>
            {!showEmptyText && (
                <Heading fontSize={{ base: '2xl', xl: '5xl' }} lineHeight='none' textAlign='center'>
                    {headingTitle[pageType]}
                </Heading>
            )}
            {!isJuiciestPage && (
                <Fragment>
                    {showEmptyText && (
                        <Text
                            fontSize={{ base: 'sm', md: 'md' }}
                            m='auto'
                            maxWidth={{ base: '100%', md: '50%' }}
                            lineHeight={{ base: 5, md: 6 }}
                            fontWeight={600}
                            color='black'
                            textAlign='center'
                        >
                            {'По вашему запросу ничего не найдено.\nПопробуйте другой запрос'}
                        </Text>
                    )}
                    {description && !showEmptyText && (
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
                </Fragment>
            )}
        </Stack>
    );
};
