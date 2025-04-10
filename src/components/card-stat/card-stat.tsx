import { HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { FollowersIcon } from '~/components/icons/followers-icon.tsx';

import { BookmarkIcon } from '../icons/bookmark-icon.tsx';
import { FavoritesIcon } from '../icons/favorites-icon.tsx';

type Props = Partial<{
    bookmarks: number;
    likes?: number;
    followers?: number;
}>;

export const CardStat: FC<Props> = ({ bookmarks, likes, followers }) => (
    <HStack
        spacing={2}
        flexWrap='nowrap'
        justifyContent='flex-end'
        minW={{ base: 'auto', md: '110px' }}
    >
        {bookmarks && (
            <HStack spacing={2} p={1} alignItems='center'>
                <BookmarkIcon w={3} h={3} />
                <Text fontWeight={600} fontSize='xs' lineHeight={4} color='lime.600'>
                    {bookmarks}
                </Text>
            </HStack>
        )}
        {likes && (
            <HStack spacing={2} p={1} alignItems='center'>
                <FavoritesIcon w={3} h={3} />
                <Text fontWeight={600} fontSize='xs' lineHeight={4} color='lime.600'>
                    {likes}
                </Text>
            </HStack>
        )}
        {followers && (
            <HStack spacing={2} p={1} alignItems='center'>
                <FollowersIcon w={3} h={3} />
                <Text fontWeight={600} fontSize='xs' lineHeight={4} color='lime.600'>
                    {followers}
                </Text>
            </HStack>
        )}
    </HStack>
);
