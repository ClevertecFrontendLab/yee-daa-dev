import { JSX } from 'react';

import { BookmarkIcon } from '~/components/icons/bookmark-icon';
import { FavoritesIcon } from '~/components/icons/favorites-icon';
import { PeopleIcon } from '~/components/icons/people-icon';
import { RecommendationIcon } from '~/components/icons/recommendation-icon';

export const icons: { [key: string]: JSX.Element } = {
    bookmarks: <BookmarkIcon w={4} h={4} />,
    followers: <PeopleIcon w={4} h={4} />,
    likes: <FavoritesIcon w={4} h={4} />,
    recommendation: <RecommendationIcon w={4} h={4} />,
};
