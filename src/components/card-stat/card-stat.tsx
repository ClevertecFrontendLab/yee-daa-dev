import { HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { BookmarkIcon } from '../icons/bookmark-icon.tsx';
import { FavoritesIcon } from '../icons/favorites-icon.tsx';

type Props = Partial<{
    bookmarks: number;
    likes: number;
}>;

export const CardStat: FC<Props> = ({ bookmarks, likes }) => {
    return (
        <HStack>
            {bookmarks && (
                <HStack spacing={2} pl={2} pr={1}>
                    <BookmarkIcon w={4} h={4} />
                    <Text fontSize='md' lineHeight={6} color='lime.600'>
                        {bookmarks}
                    </Text>
                </HStack>
            )}
            {likes && (
                <HStack spacing={2} pl={2} pr={1}>
                    <FavoritesIcon w={4} h={4} />
                    <Text fontSize='md' lineHeight={6} color='lime.600'>
                        {likes}
                    </Text>
                </HStack>
            )}
        </HStack>
    );
};
