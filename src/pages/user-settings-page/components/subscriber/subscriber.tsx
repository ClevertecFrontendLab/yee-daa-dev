import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';

import { BaseUserInfo } from '~/types/user';
import { getAbsoluteImagePath } from '~/utils/get-absolute-image-path';

export const Subscriber: React.FC<BaseUserInfo> = ({ firstName, lastName, login, photo }) => (
    <HStack
        px='24px'
        py='16px'
        gap='12px'
        border='1px solid rgb(226, 232, 240)'
        borderRadius='8px'
        w='447px'
    >
        <Avatar
            src={getAbsoluteImagePath(photo) || undefined}
            name={`${firstName} ${lastName}`}
            size='lg'
        />
        <VStack alignItems='flex-start'>
            <Text fontSize='lg' lineHeight={7} fontWeight={500}>
                {firstName} {lastName}
            </Text>
            <Text fontSize='sm' lineHeight={5} fontWeight={400} color='blackAlpha.700'>
                @{login}
            </Text>
        </VStack>
    </HStack>
);
