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
    <Flex alignItems='center' gap={6} {...rest}>
        <Avatar size='2xl' src={imgSrc} name={`${firstName} ${lastName}`} />
        <Stack gap={3}>
            <Text
                lineHeight='48px'
                fontSize='5xl'
                fontWeight={700}
            >{`${firstName} ${lastName}`}</Text>
            <Text fontSize='sm' lineHeight={5} color='blackAlpha.700'>
                {login}
            </Text>
            <HStack justify='space-between'>
                <ButtonSubscribe userLogin={login} />
                <CardStat {...social} />
            </HStack>
        </Stack>
    </Flex>
);
