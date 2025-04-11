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

import { NoteCard } from '~/components/notes-box/components/note-card';
import { NoteCardProps } from '~/components/notes-box/components/note-card/note-card';

export type NotesBoxData = {
    items: NoteCardProps[];
} & StackProps;

export const NotesBox: FC<NotesBoxData> = ({ items, ...rest }) => {
    const [notesFolded, setNotesFolded] = useState(true);
    const variant = useBreakpointValue({
        base: 150,
        '2xl': 169,
    });

    const length = items.length;
    return (
        <Stack
            id='notes'
            bgColor='blackAlpha.50'
            w='100%'
            p={{ base: 4, lg: 6 }}
            align='center'
            pb={3}
            pt={{ base: 5, lg: 6 }}
            gap={{ base: '10px', lg: 4 }}
            {...rest}
        >
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
            <Collapse in={!notesFolded} startingHeight={variant} animateOpacity>
                <Flex flexWrap='wrap' gap={4}>
                    {items.map((item) => (
                        <NoteCard
                            {...item}
                            minWidth={{
                                md: 'calc(100% / 4)',
                                xl: 'calc(100% / 3)',
                                xxxl: 'calc(100% / 4)',
                            }}
                            maxWidth='calc(100% / 2)'
                            flex={1}
                        />
                    ))}
                </Flex>
            </Collapse>
            {length > 3 && (
                <Button
                    w='fit-content'
                    // fontSize={14}
                    size={{ base: 'xs', lg: 'sm' }}
                    variant='ghost'
                    onClick={() => setNotesFolded(!notesFolded)}
                >
                    {notesFolded ? 'Показать больше' : 'Свернуть'}
                </Button>
            )}
        </Stack>
    );
};
