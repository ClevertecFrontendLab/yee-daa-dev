import { Avatar } from '@chakra-ui/icons';
import { Box, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { UserProps } from '../../types/user.ts';

type Props = UserProps &
    Partial<{
        withGutter: boolean;
    }>;

export const UserInfo: FC<Props> = ({
    withGutter = false,
    lastName,
    imageUrl,
    firstName,
    login,
}) => {
    return (
        <Flex
            ml={withGutter ? 13 : 0}
            maxWidth={'355px'}
            alignItems='center'
            display={{ base: 'none', xl: 'flex' }}
        >
            <Avatar
                size={{ base: 'sm', md: 'md' }}
                src={imageUrl}
                name={`${firstName} ${lastName}`}
            />
            <Box ml={{ base: 2, md: 3 }} flexGrow={1}>
                <Text
                    fontSize={{ base: 'sm', md: 'lg' }}
                    fontWeight={500}
                    lineHeight={{ base: 6, md: 7 }}
                    noOfLines={1}
                    letterSpacing={'-0.5px'}
                >
                    {firstName} {lastName}
                </Text>
                <Text
                    fontSize={{ base: 'xs', md: 'sm' }}
                    lineHeight={5}
                    color='blackAlpha.700'
                    noOfLines={1}
                    maxWidth={'296px'}
                >
                    {login}
                </Text>
            </Box>
        </Flex>
    );
};
