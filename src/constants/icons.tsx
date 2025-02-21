import { JSX } from 'react';

import { BookmarkIcon } from '../components/icons/bookmark-icon';
import { FavoritesIcon } from '../components/icons/favorites-icon';
import { PeopleIcon } from '../components/icons/people-icon';

export const icons: { [key: string]: JSX.Element } = {
    bookmarks: <BookmarkIcon w={4} h={4} />,
    followers: <PeopleIcon w={4} h={4} />,
    likes: <FavoritesIcon w={4} h={4} />,
};
