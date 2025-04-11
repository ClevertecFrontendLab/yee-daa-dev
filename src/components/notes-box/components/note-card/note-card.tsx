import 'dayjs/locale/ru';

import { Card, CardBody, CardHeader, CardProps, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FC } from 'react';

export type NoteCardProps = {
    time: string;
    text: string;
} & CardProps;

const formatTime = (time: string) => dayjs(time).locale('ru').format('DD MMMM HH:MM');

export const NoteCard: FC<NoteCardProps> = ({ time, text, ...rest }) => (
    <Card {...rest}>
        <CardHeader p={6} pb={4}>
            <Text fontSize={{ base: 14, lg: 16 }} color='lime.600'>
                {formatTime(time)}
            </Text>
        </CardHeader>
        <CardBody p={6} pt={0} pb={5}>
            <Text
                fontSize={{ base: 14, lg: 16 }}
                lineHeight={5}
                noOfLines={{ base: 3, '2xl': 4 }}
                letterSpacing='-0.8px'
            >
                {text}
            </Text>
        </CardBody>
    </Card>
);
