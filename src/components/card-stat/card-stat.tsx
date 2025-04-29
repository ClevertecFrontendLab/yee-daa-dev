import { HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { BookmarkIcon } from '../icons/bookmark-icon.tsx';
import { FavoritesIcon } from '../icons/favorites-icon.tsx';

type Props = Partial<{
    bookmarks: number;
    likes: number;
}>;

export const CardStat: FC<Props> = ({ bookmarks, likes }) => (
    <HStack
        spacing={2}
        flexWrap='wrap'
        justifyContent='flex-end'
        minW={{ base: 'auto', md: '110px' }}
    >
        {bookmarks && (
            <HStack spacing={2} p={1} alignItems='center'>
                <BookmarkIcon w={3} h={3} />
                <Text fontSize='xs' lineHeight={4} color='lime.600'>
                    {bookmarks}
                </Text>
            </HStack>
        )}
        {likes && (
            <HStack spacing={2} p={1} alignItems='center'>
                <FavoritesIcon w={3} h={3} />
                <Text fontSize='xs' lineHeight={4} color='lime.600'>
                    {likes}
                </Text>
            </HStack>
        )}
    </HStack>
);
