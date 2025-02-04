import { Flex, HStack, Text } from '@chakra-ui/react';

import { BookmarkIcon } from '../icons/bookmark-icon.tsx';
import { FavoritesIcon } from '../icons/favorites-icon.tsx';
import { PeopleIcon } from '../icons/people-icon.tsx';

const stats = [185, 589, 587];
const icons = [
    <BookmarkIcon w={4} h={4} />,
    <PeopleIcon w={4} h={4} />,
    <FavoritesIcon w={4} h={4} />,
];

export const StatsBlock = () => {
    return (
        <Flex pl={4} pr={4}>
            {stats.map((item, i) => (
                <HStack spacing={{ base: '6px', md: '8px' }} key={i} pt={2} pb={2} pl={2} pr={1}>
                    {icons[i]}
                    <Text fontSize='md' lineHeight={6} color='lime.600'>
                        {item}
                    </Text>
                </HStack>
            ))}
        </Flex>
    );
};
