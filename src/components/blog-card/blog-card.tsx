import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { Post } from '~/types/post.ts';

import { UserInfo } from '../user-info';

export const BlogCard: FC<Post> = ({ firstName, lastName, imageUrl, text, login }) => (
    <Card>
        <CardHeader p={4} pb={2}>
            <UserInfo firstName={firstName} lastName={lastName} login={login} imageUrl={imageUrl} />
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
    </Card>
);
