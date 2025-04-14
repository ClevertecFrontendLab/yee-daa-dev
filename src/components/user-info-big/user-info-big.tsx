import { Avatar, Flex, FlexProps, HStack, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { ButtonSubscribe } from '~/components/button-subscribe';
import { CardStat } from '~/components/card-stat/card-stat';

type UserInfoBigProps = {
    imgSrc: string;
    firstName: string;
    lastName: string;
    login: string;
    social: {
        bookmarks: number;
        followers: number;
    };
} & FlexProps;

export const UserInfoBig: FC<UserInfoBigProps> = ({
    imgSrc,
    firstName,
    lastName,
    login,
    social,
    ...rest
}) => (
    <Flex
        alignItems='center'
        flexDirection={{ base: 'column', sm: 'row' }}
        gap={6}
        w={{ base: '100%', sm: 'auto' }}
        {...rest}
    >
        <Avatar size={{ base: 'xl', xmd: '2xl' }} src={imgSrc} name={`${firstName} ${lastName}`} />
        <Stack gap={3} w={{ base: '100%', sm: 'auto' }}>
            <Text
                lineHeight={{ base: '32px', xmd: '48px' }}
                fontSize={{ base: '2xl', xmd: '5xl' }}
                fontWeight={700}
                textAlign={{ base: 'center', sm: 'left' }}
            >{`${firstName} ${lastName}`}</Text>
            <Text
                fontSize='sm'
                lineHeight={5}
                color='blackAlpha.700'
                textAlign={{ base: 'center', sm: 'left' }}
            >
                {login}
            </Text>
            <HStack justify='space-between'>
                <ButtonSubscribe userLogin={login} />
                <CardStat {...social} />
            </HStack>
        </Stack>
    </Flex>
);
