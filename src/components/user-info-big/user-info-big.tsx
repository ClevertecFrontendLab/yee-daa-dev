import { Avatar, Box, Flex, FlexProps, HStack, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useLocation } from 'react-router';

import { ButtonSubscribe } from '~/components/button-subscribe';
import { CardStat } from '~/components/card-stat/card-stat';
import { MobileLoader } from '~/components/mobile-loader';
import { Paths } from '~/constants/path';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { selectBloggersToggleLoading } from '~/redux/features/bloggers-slice';
import { getAbsoluteImagePath } from '~/utils/get-absolute-image-path';

type UserInfoBigProps = {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite?: boolean;
    imgSrc?: string;
    dataTestId?: string;
} & FlexProps;

export const UserInfoBig: FC<UserInfoBigProps> = ({
    _id,
    imgSrc,
    firstName,
    lastName,
    login,
    subscribersCount,
    bookmarksCount,
    isFavorite,
    dataTestId,
    ...rest
}) => {
    const isLoading = useAppSelector(selectBloggersToggleLoading);
    const { pathname } = useLocation();

    const isProfile = pathname.includes(Paths.PROFILE);

    return (
        <Box
            w={{ base: '100%', sm: 'auto' }}
            position='relative'
            data-test-id={`${dataTestId}-box`}
        >
            <Flex
                alignItems='center'
                flexDirection={{ base: 'column', sm: 'row' }}
                gap={6}
                {...rest}
            >
                <Avatar
                    size={{ base: 'xl', xmd: '2xl' }}
                    src={getAbsoluteImagePath(imgSrc)}
                    name={`${firstName} ${lastName}`}
                />
                <Stack gap={3} w={{ base: '100%', sm: 'auto' }}>
                    <Text
                        lineHeight={{ base: '32px', xmd: '48px' }}
                        fontSize={{ base: '2xl', xmd: '5xl' }}
                        fontWeight={700}
                        textAlign={{ base: 'center', sm: 'left' }}
                        data-test-id={`${dataTestId}-name`}
                    >{`${firstName} ${lastName}`}</Text>
                    <Text
                        fontSize='sm'
                        lineHeight={5}
                        color='blackAlpha.700'
                        textAlign={{ base: 'center', sm: 'left' }}
                        data-test-id={`${dataTestId}-login`}
                    >
                        @{login}
                    </Text>
                    <HStack justify='space-between'>
                        {!isProfile && (
                            <ButtonSubscribe userId={_id} isSubscribedFromReq={isFavorite} />
                        )}
                        <CardStat
                            isProfile
                            followers={subscribersCount}
                            bookmarks={bookmarksCount}
                        />
                    </HStack>
                </Stack>
            </Flex>
            <MobileLoader isOpen={isLoading === _id} />
        </Box>
    );
};
