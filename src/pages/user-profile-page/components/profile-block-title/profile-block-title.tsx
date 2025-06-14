import { Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';

type ProfileBlockTitleProps = {
    title: string;
    count: number;
};

export const ProfileBlockTitle: FC<ProfileBlockTitleProps> = ({ title, count }) => (
    <Flex flexDirection={{ base: 'row' }} gap={6}>
        <HStack alignItems='center' mb={{ base: 4, '2xl': 3 }}>
            <Heading size='md' lineHeight='28px' fontWeight={700}>
                {title}
            </Heading>
            <Text
                lineHeight='28px'
                color='blackAlpha.600'
                fontSize='xl'
                fontWeight={400}
            >{`(${count})`}</Text>
        </HStack>
    </Flex>
);
