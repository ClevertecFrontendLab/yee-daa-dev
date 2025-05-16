import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    HStack,
    Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router';

import { CardTypeProps } from '~/components/blog-card/consts';
import { ButtonSubscribe } from '~/components/button-subscribe';
import { CardStat } from '~/components/card-stat/card-stat';
import { Float } from '~/components/float';
import { MobileLoader } from '~/components/mobile-loader';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { selectBloggersToggleLoading } from '~/redux/features/bloggers-slice';
import { Post } from '~/types/post.ts';
import { makeNewRecipeBadge } from '~/utils/make-new-recipe-badge';

import { UserInfo } from '../user-info';

type CardType = 'FAVORITE' | 'DEFAULT' | 'AVAILABLE' | 'PROFILE';

type BlogCardProps = {
    _id?: string;
    cardType?: CardType;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite?: boolean;
    newRecipesCount?: number;
    link?: string;
};

export const BlogCard: FC<Post & BlogCardProps> = ({
    firstName,
    lastName,
    imageUrl,
    text,
    login,
    cardType,
    subscribersCount,
    bookmarksCount,
    newRecipesCount,
    isFavorite,
    link,
    _id,
}) => {
    const cardData = cardType ? CardTypeProps[cardType] : CardTypeProps.DEFAULT;
    const bloggersLoadingId = useAppSelector(selectBloggersToggleLoading);

    return (
        <Card minHeight={cardData.minHeight} data-test-id='blogs-card'>
            <CardHeader {...cardData.CardHeader}>
                <UserInfo
                    firstName={firstName}
                    lastName={lastName}
                    login={login}
                    imageUrl={imageUrl}
                    shrinks
                    _id={_id}
                />
                {cardType === 'FAVORITE' &&
                    Boolean(newRecipesCount) &&
                    newRecipesCount !== undefined && (
                        <Float top={{ base: 1, xl: 2 }} right={{ base: 1, xl: 2 }}>
                            <Badge
                                fontWeight='400'
                                color='black'
                                bg='blackAlpha.100'
                                fontSize='14px'
                                variant='solid'
                                textTransform='lowercase'
                                p='2px 8px'
                                data-test-id='blogs-card-new-recipes-badge'
                            >
                                {makeNewRecipeBadge(newRecipesCount)}
                            </Badge>
                        </Float>
                    )}
            </CardHeader>
            <CardBody {...cardData.CardBody}>
                <Text
                    fontSize='sm'
                    lineHeight={5}
                    noOfLines={cardType === 'DEFAULT' ? 4 : 3}
                    minHeight='60px'
                    letterSpacing={{ base: '-0.5px', md: 'initial' }}
                    data-test-id='blogs-card-notes-text'
                >
                    {text}
                </Text>
            </CardBody>
            {cardType !== 'DEFAULT' && (
                <CardFooter
                    justifyContent='space-between'
                    pl={{ base: 4, xl: 7 }}
                    pr={{ base: 4, xl: 6 }}
                    pt={4}
                    pb={4}
                    {...cardData.CardFooter}
                >
                    <HStack {...cardData.HStack}>
                        {cardType === 'AVAILABLE' || cardType === 'PROFILE' ? (
                            <ButtonSubscribe userId={_id} isSubscribedFromReq={isFavorite} />
                        ) : (
                            <Button
                                size='xs'
                                bg='lime.400'
                                fontSize='xs'
                                as={Link}
                                to={link}
                                data-test-id='blogs-card-recipes-button'
                            >
                                Рецепты
                            </Button>
                        )}
                        <Button
                            borderColor='lime.600'
                            size='xs'
                            color='lime.600'
                            fontSize='xs'
                            variant='outline'
                            as={Link}
                            to={`${link}#notes`}
                            data-test-id='blogs-card-notes-button'
                        >
                            Читать
                        </Button>
                    </HStack>
                    <CardStat bookmarks={bookmarksCount} followers={subscribersCount} />
                </CardFooter>
            )}
            <MobileLoader isOpen={bloggersLoadingId === _id} />
        </Card>
    );
};
