import { Avatar, Card, CardBody, CardHeader, Heading, HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { ButtonSubscribe } from '~/components/button-subscribe';
import { AuthorDataType } from '~/redux/api/types/recipes';

import { FollowersIcon } from '../icons/followers-icon';

export const AuthorCard: FC<{ author: AuthorDataType; authorId: string }> = ({
    author,
    authorId,
}) => (
    <Card bg='var(--chakra-colors-lime-300)' p={{ base: 3, sm: 6 }} flexDirection='row' gap={4}>
        <CardHeader p={0}>
            <Avatar
                // src={author.imageUrl}
                name={`${author.firstName} ${author.lastName}`}
                size='lg'
            />
        </CardHeader>
        <CardBody p={0}>
            <HStack flexWrap='wrap' justifyContent='space-between'>
                <Heading fontSize={{ base: 'xl', sm: '2xl' }}>
                    {author.firstName} {author.lastName}
                </Heading>
                <Text>Автор рецепта</Text>
            </HStack>
            <Text mb={5} mt={2}>
                @{author.login}
            </Text>
            <HStack flexWrap='wrap' justifyContent='space-between'>
                {/* TODO: add author id from request */}
                <ButtonSubscribe userId={authorId} />

                <HStack>
                    <HStack>
                        <FollowersIcon />
                        <Text fontSize='xs' lineHeight={6} color='lime.600'>
                            {author?.subscribers?.length ?? 0 ?? 0}
                        </Text>
                    </HStack>
                </HStack>
            </HStack>
        </CardBody>
    </Card>
);
