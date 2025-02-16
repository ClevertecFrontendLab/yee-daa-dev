import { Button, Card, CardBody, CardHeader, Heading, HStack, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { icons } from '../../constants/icons';
import { Recipe } from '../../types/recipe';
import { FollowersIcon } from '../icons/followers-icon';
import { SubscribeIcon } from '../icons/subcribe-icon';

export const AuthorCard: FC<{ author?: Recipe['author'] }> = ({ author }) => (
    <Card bg={'var(--chakra-colors-lime-300)'} p={{ base: 3, sm: 6 }} flexDirection='row' gap={4}>
        <CardHeader p={0}>
            <Image src={author?.imageUrl} alt={author?.login} w='96px' h='96px' objectFit='cover' />
        </CardHeader>
        <CardBody p={0}>
            <HStack flexWrap='wrap' justifyContent='space-between'>
                <Heading fontSize={{ base: 'xl', sm: '2xl' }}>
                    {author?.firstName} {author?.lastName}
                </Heading>
                <Text>Автор рецепта</Text>
            </HStack>
            <Text mb={5} mt={2}>
                @{author?.login}
            </Text>
            <HStack flexWrap='wrap' justifyContent='space-between'>
                <Button
                    size='xs'
                    color='white'
                    bg='blackAlpha.900'
                    fontSize='xs'
                    leftIcon={<SubscribeIcon />}
                >
                    Подписаться
                </Button>
                <HStack>
                    {author?.bookmarks && (
                        <HStack>
                            {icons['bookmarks']}
                            <Text fontSize='xs' lineHeight={6} color='lime.600'>
                                {author?.bookmarks}
                            </Text>
                        </HStack>
                    )}
                    {author?.followers && (
                        <HStack>
                            <FollowersIcon />
                            <Text fontSize='xs' lineHeight={6} color='lime.600'>
                                {author?.followers}
                            </Text>
                        </HStack>
                    )}
                </HStack>
            </HStack>
        </CardBody>
    </Card>
);
