import { Avatar } from '@chakra-ui/icons';
import { Box, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { USER_INFO_TYPES } from '~/components/user-info/consts';
import { UserProps } from '~/types/user.ts';

type Props = UserProps &
    Partial<{
        withGutter: boolean;
        shrinks: boolean;
    }>;

export const UserInfo: FC<Props> = ({
    withGutter = false,
    lastName,
    imageUrl,
    firstName,
    login,
    shrinks,
}) => {
    const userInfoParams = shrinks ? USER_INFO_TYPES.SHRUNK : USER_INFO_TYPES.DEFAULT;
    return (
        <Flex
            ml={withGutter ? 13 : 0}
            maxWidth='355px'
            alignItems='center'
            display={{ base: 'none', xs: 'flex' }}
        >
            <Avatar src={imageUrl} name={`${firstName} ${lastName}`} {...userInfoParams.Avatar} />
            <Box ml={3} flexGrow={1}>
                <Text
                    fontWeight={500}
                    noOfLines={1}
                    letterSpacing='-0.5px'
                    {...userInfoParams.userName}
                >
                    {`${firstName} ${lastName}`}
                </Text>
                <Text
                    lineHeight={5}
                    color='blackAlpha.700'
                    noOfLines={1}
                    maxWidth='296px'
                    {...userInfoParams.login}
                >
                    @{login}
                </Text>
            </Box>
        </Flex>
    );
};
