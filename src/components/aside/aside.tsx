import { Flex, Spacer } from '@chakra-ui/react';

import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { selectIsRecommending, selectUserInfoCounts } from '~/redux/features/user-slice';

import { AddRecipeBtn } from '../add-recipe-btn';
import { StatsBlock } from '../stats-block';

export const Aside = () => {
    const { subscribers, likes, bookmarks, recommendations } = useAppSelector(selectUserInfoCounts);
    const isRecommendingProfile = useAppSelector(selectIsRecommending);
    return (
        <Flex height='100%' direction='column' alignItems='flex-end' justifyContent='space-between'>
            <StatsBlock
                {...{
                    followers: subscribers,
                    likes,
                    bookmarks,
                    isRecommendingProfile,
                    recommendations,
                }}
            />
            <Spacer />
            <AddRecipeBtn />
        </Flex>
    );
};
