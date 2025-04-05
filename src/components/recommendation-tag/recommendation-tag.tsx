import { Avatar, TagLabel } from '@chakra-ui/icons';
import { Tag } from '@chakra-ui/react';
import { FC } from 'react';

import { UserProps } from '~/types/user.ts';

type Props = Omit<UserProps, 'login'>;

export const RecommendationTag: FC<Props> = ({ firstName, lastName, imageUrl }) => (
    <Tag size='md' bg='lime.150'>
        <Avatar size='2xs' src={imageUrl} name={`${firstName} ${lastName}`} />
        <TagLabel ml={2} noOfLines={1}>
            {`${firstName} ${lastName}`} рекомендует
        </TagLabel>
    </Tag>
);
