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
import { Post } from '~/types/post.ts';
import { makeNewRecipeBadge } from '~/utils/make-new-recipe-badge';

import { UserInfo } from '../user-info';

type CardType = 'FAVORITE' | 'DEFAULT' | 'AVAILABLE' | 'PROFILE';

type BlogCardProps = {
    cardType?: CardType;
    social?: {
        bookmarks: number;
        followers: number;
    };
    newRecipes?: number;
    link?: string;
};

export const BlogCard: FC<Post & BlogCardProps> = ({
    firstName,
    lastName,
    imageUrl,
    text,
    login,
    cardType,
    social,
    newRecipes,
    link,
}) => {
    const cardData = cardType ? CardTypeProps[cardType] : CardTypeProps.DEFAULT;

    return (
        <Card minHeight={cardData.minHeight}>
            <CardHeader {...cardData.CardHeader}>
                <UserInfo
                    firstName={firstName}
                    lastName={lastName}
                    login={login}
                    imageUrl={imageUrl}
                    shrinks
                />
                {newRecipes && (
                    <Float top={{ base: 1, xl: 2 }} right={{ base: 1, xl: 2 }}>
                        <Badge
                            fontWeight='400'
                            color='black'
                            bg='blackAlpha.100'
                            fontSize='14px'
                            variant='solid'
                            textTransform='lowercase'
                            p='2px 8px'
                        >
                            {makeNewRecipeBadge(newRecipes)}
                        </Badge>
                    </Float>
                )}
            </CardHeader>
            <CardBody {...cardData.CardBody}>
                <Text
                    fontSize='sm'
                    lineHeight={5}
                    noOfLines={3}
                    letterSpacing={{ base: '-0.5px', md: 'initial' }}
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
                            <ButtonSubscribe userLogin={login} />
                        ) : (
                            <Button size='xs' bg='lime.400' fontSize='xs'>
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
                        >
                            Читать
                        </Button>
                    </HStack>
                    {social && (
                        <CardStat bookmarks={social.bookmarks} followers={social.followers} />
                    )}
                </CardFooter>
            )}
        </Card>
    );
};
