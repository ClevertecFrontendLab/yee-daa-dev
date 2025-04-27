import { Card, CardBody, CardHeader, Heading, HStack, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { ButtonSubscribe } from '~/components/button-subscribe';
import { UserProps } from '~/types/user';

import { FollowersIcon } from '../icons/followers-icon';

export const AuthorCard: FC<{ author: UserProps }> = ({ author }) => (
    <Card bg='var(--chakra-colors-lime-300)' p={{ base: 3, sm: 6 }} flexDirection='row' gap={4}>
        <CardHeader p={0}>
            <Image
                src={author.imageUrl}
                alt={`${author.login}'s avatar`}
                w='96px'
                h='96px'
                objectFit='cover'
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
                <ButtonSubscribe userId={author._id} />

                <HStack>
                    <HStack>
                        <FollowersIcon />
                        <Text fontSize='xs' lineHeight={6} color='lime.600'>
                            {author?.followers ?? 0 ?? 0}
                        </Text>
                    </HStack>
                </HStack>
            </HStack>
        </CardBody>
    </Card>
);
