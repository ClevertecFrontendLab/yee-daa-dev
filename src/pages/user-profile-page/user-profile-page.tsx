import { Flex, IconButton, Stack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { GearIcon } from '~/components/icons/gear-icon';
import { NotesBox } from '~/components/notes-box';
import { UserInfoBig } from '~/components/user-info-big';
import { Paths } from '~/constants/path';
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useGetRecipeByUserIdQuery } from '~/redux/api/recipes-api';
import { selectUser, selectUserInfoCounts, setUser } from '~/redux/features/user-slice';

import { ProfileBlock } from './components';
import { getUserProfileHeaderData, userProfileHeaderDataType } from './utils/user-profile-headers';

export const UserProfilePage = () => {
    const { photoLink, firstName, lastName, login, bookmarks, id, drafts, notes, recipes } =
        useAppSelector(selectUser);
    const { subscribers: subscribersCount, bookmarks: bookmarksCount } =
        useAppSelector(selectUserInfoCounts);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(Paths.SETTINGS);
    };

    const { data: userRecipe } = useGetRecipeByUserIdQuery(id);
    useEffect(() => {
        if (userRecipe) {
            const { recipes, myBookmarks, notes } = userRecipe;
            dispatch(setUser({ recipes, notes, bookmarks: myBookmarks }));
        }
    }, [dispatch, userRecipe]);

    return (
        <Stack spacing={{ base: 3, xmd: 6 }} align='left'>
            <Flex justifyContent='space-between' flexDirection={{ base: 'row' }} gap={6}>
                <UserInfoBig
                    firstName={firstName}
                    lastName={lastName}
                    login={login}
                    subscribersCount={subscribersCount}
                    bookmarksCount={bookmarksCount}
                    isFavorite={false}
                    imgSrc={photoLink}
                    mt={{ base: 0, md: -8, xmd: -4 }}
                    minWidth={{ base: 0, sm: 356, xmd: 422, '2xl': 480 }}
                    _id={id}
                />
                <IconButton
                    variant='unstyled'
                    height='100%'
                    aria-label='navigate-settings'
                    icon={<GearIcon onClick={handleNavigate} boxSize='24px' />}
                />
            </Flex>
            <Flex justifyContent='space-between' flexDirection={{ base: 'column' }} gap={6}>
                <ProfileBlock
                    data={[
                        { type: userProfileHeaderDataType.drafts, data: drafts },
                        { type: userProfileHeaderDataType.recipes, data: recipes },
                    ]}
                    headers={[
                        getUserProfileHeaderData('Мои рецепты', recipes.length),
                        getUserProfileHeaderData('Черновики', drafts.length),
                    ]}
                />
                <NotesBox items={notes} mt={4} id='notes' />
                <ProfileBlock
                    data={[{ type: userProfileHeaderDataType.bookmarks, data: bookmarks }]}
                    headers={[getUserProfileHeaderData('Мои закладки', bookmarks.length)]}
                />
            </Flex>
        </Stack>
    );
};
