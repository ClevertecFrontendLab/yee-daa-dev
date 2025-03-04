import { Flex, HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { icons } from '../../constants/icons';
import { UserProps } from '../../types/user';

export const StatsBlock: FC<UserProps> = ({ followers, likes, bookmarks }) => {
    return (
        <Flex
            pl={{ base: 4, md: 0 }}
            pr={{ base: 4, md: 0 }}
            pt={{ base: 0, md: 4 }}
            pb={{ base: 0, md: 4 }}
            mr={{ base: 0, md: 16 }}
            flexDirection={{ base: 'row', xl: 'column' }}
            gap={{ base: 0, md: 6 }}
        >
            {bookmarks && (
                <HStack spacing={{ base: '6px', md: '8px' }} pt={2} pb={2} pl={2} pr={1}>
                    {icons['bookmarks']}
                    <Text fontSize='md' lineHeight={6} color='lime.600'>
                        {bookmarks}
                    </Text>
                </HStack>
            )}
            {followers && (
                <HStack spacing={{ base: '6px', md: '8px' }} pt={2} pb={2} pl={2} pr={1}>
                    {icons['followers']}
                    <Text fontSize='md' lineHeight={6} color='lime.600'>
                        {followers}
                    </Text>
                </HStack>
            )}
            {likes && (
                <HStack spacing={{ base: '6px', md: '8px' }} pt={2} pb={2} pl={2} pr={1}>
                    {icons['likes']}
                    <Text fontSize='md' lineHeight={6} color='lime.600'>
                        {likes}
                    </Text>
                </HStack>
            )}
        </Flex>
    );
};
