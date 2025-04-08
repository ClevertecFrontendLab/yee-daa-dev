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

import { CardStat } from '~/components/card-stat/card-stat';
import { Float } from '~/components/float';
import { SubscribeIcon } from '~/components/icons/subcribe-icon';
import { Post } from '~/types/post.ts';
import { makeNewRecipeBadge } from '~/utils/make-new-recipe-badge';

import { UserInfo } from '../user-info';

type CardType = 'FAVORITE' | 'DEFAULT' | 'AVAILABLE';

type BlogCardProps = {
    cardType: CardType;
    social: {
        bookmarks: number;
        followers: number;
    };
    newRecipes?: number;
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
}) => (
    <Card>
        <CardHeader p={4} pb={2}>
            <UserInfo firstName={firstName} lastName={lastName} login={login} imageUrl={imageUrl} />
            {newRecipes && (
                <Float top='10px' right='10px'>
                    <Badge
                        fontWeight='400'
                        color='black'
                        bg='blackAlpha.100'
                        fontSize='0.8em'
                        variant='solid'
                        textTransform='lowercase'
                        p='2px 8px'
                    >
                        {makeNewRecipeBadge(newRecipes)}
                    </Badge>
                </Float>
            )}
        </CardHeader>
        <CardBody p={4} pt={2}>
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
            <CardFooter justifyContent='space-between'>
                <HStack>
                    {cardType === 'AVAILABLE' ? (
                        <Button
                            size='xs'
                            color='white'
                            bg='blackAlpha.900'
                            fontSize='xs'
                            leftIcon={<SubscribeIcon />}
                        >
                            Подписаться
                        </Button>
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
                    >
                        Читать
                    </Button>
                </HStack>
                <CardStat bookmarks={social.bookmarks} followers={social.followers} />
            </CardFooter>
        )}
    </Card>
);
