import {
    Button,
    Collapse,
    Flex,
    Heading,
    HStack,
    Stack,
    StackProps,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useLocation } from 'react-router';

import { NoteCard } from '~/components/notes-box/components/note-card';
import { Paths } from '~/constants/path';
import { useAppDispatch } from '~/hooks/typed-react-redux-hooks';
import { ProfileBlockTitle } from '~/pages/user-profile-page/components';
import { useDeleteNoteMutation } from '~/redux/api/user-api';
import { openDrawer } from '~/redux/features/filter-drawer-slice.js';
import { NoteType } from '~/types/user';

import { PenIcon } from '../icons/pen-icon';

export type NotesBoxData = {
    items: NoteType[];
} & StackProps;

export const NotesBox: FC<NotesBoxData> = ({ items, ...rest }) => {
    const dispatch = useAppDispatch();
    const [notesFolded, setNotesFolded] = useState(true);

    const { pathname } = useLocation();
    const [deleteNote] = useDeleteNoteMutation();

    const isProfile = pathname.includes(Paths.PROFILE);
    const variant = useBreakpointValue({
        base: 204,
        md: 247,
        sm: 228,
        '2xl': 169,
    });

    const handleAddNotes = () => {
        dispatch(openDrawer());
    };
    const handleDeleteNote = (id: string) => {
        deleteNote(id);
    };

    const length = items.length;
    return (
        <Stack
            id='notes'
            bgColor='blackAlpha.50'
            w='100%'
            p={{ base: 4, lg: 6 }}
            align='center'
            pb={3}
            pt={{ base: 6, sm: 5, lg: 6 }}
            gap={{ base: 2, sm: '10px', lg: 4 }}
            data-test-id='blog-notes-box'
            {...rest}
        >
            <Flex justifyContent='space-between' flexDirection={{ base: 'row' }} gap={6} w='100%'>
                {isProfile ? (
                    <>
                        <ProfileBlockTitle {...{ title: 'Заметки', count: length }} />
                        <Button
                            variant='outline'
                            size={{ base: 'sm', '2xl': 'lg' }}
                            px={12}
                            leftIcon={<PenIcon />}
                            color='blackAlpha.800'
                            fontSize={{ base: 'xs', lg: 'sm' }}
                            onClick={handleAddNotes}
                            border='1px solid rgba(0, 0, 0, 0.48)'
                            borderRadius='6px'
                        >
                            Новая заметка
                        </Button>
                    </>
                ) : (
                    <HStack alignItems='center' mb={{ base: 4, '2xl': 3 }} w='100%'>
                        <Heading fontSize={{ base: 20, lg: 36 }} lineHeight='none' fontWeight={400}>
                            Заметки
                        </Heading>
                        <Text
                            lineHeight='none'
                            color='blackAlpha.600'
                            fontSize={{ base: 20, lg: 30 }}
                            fontWeight={400}
                        >{`(${length})`}</Text>
                    </HStack>
                )}
            </Flex>
            <Collapse
                in={!notesFolded}
                startingHeight={items.length !== 0 ? variant : 0}
                animateOpacity
                style={{ width: '100%' }}
            >
                <Flex flexWrap='wrap' gap={4}>
                    {items.map((item) => (
                        <NoteCard
                            key={item.date}
                            {...item}
                            minHeight={variant}
                            minWidth={{
                                base: 'calc(100% / 2)',
                                sm: 'calc(100% / 4)',
                                xl: 'calc(100% / 3)',
                                xxxl: 'calc(100% / 4)',
                            }}
                            maxWidth={{ base: '100%', md: 'calc(100% / 2)' }}
                            flex={1}
                            isProfile={isProfile}
                            id={item.id}
                            deleteNote={handleDeleteNote}
                        />
                    ))}
                </Flex>
            </Collapse>
            {length > 3 && (
                <Button
                    w='fit-content'
                    size={{ base: 'xs', lg: 'sm' }}
                    variant='ghost'
                    mt={{ base: 3, sm: 0 }}
                    onClick={() => setNotesFolded(!notesFolded)}
                >
                    {notesFolded ? 'Показать больше' : 'Свернуть'}
                </Button>
            )}
        </Stack>
    );
};
