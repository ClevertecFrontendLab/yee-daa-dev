import 'dayjs/locale/ru';

import { Card, CardBody, CardHeader, CardProps, HStack, IconButton, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FC } from 'react';

import { DeleteIcon } from '~/components/icons/delete-icon';

export type NoteCardProps = {
    date: string;
    text: string;
    id: string;
} & CardProps & { isProfile: boolean; deleteNote: (id: string) => void };

const formatTime = (time: string) => dayjs(time).locale('ru').format('DD MMMM HH:MM');

export const NoteCard: FC<NoteCardProps> = ({ date, text, isProfile, id, deleteNote, ...rest }) => (
    <Card {...rest}>
        <CardHeader p={6} pb={4}>
            <HStack justifyContent='space-between'>
                <Text fontSize={{ base: 14, lg: 16 }} color='lime.600'>
                    {formatTime(date)}
                </Text>
                {isProfile && (
                    <IconButton
                        w='24px'
                        h='24px'
                        aria-label='Delete note'
                        variant='unstyled'
                        icon={<DeleteIcon boxSize='14px' />}
                        onClick={() => deleteNote(id!)}
                    />
                )}
            </HStack>
        </CardHeader>
        <CardBody p={6} pt={0} pb={5}>
            <Text
                fontSize={{ base: 14, lg: 16 }}
                lineHeight={5}
                noOfLines={{ base: 3, '2xl': 4 }}
                letterSpacing='-0.8px'
                data-test-id='notes-card-text'
            >
                {text}
            </Text>
        </CardBody>
    </Card>
);
