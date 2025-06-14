import { Avatar, TagLabel } from '@chakra-ui/icons';
import { Tag } from '@chakra-ui/react';
import { FC } from 'react';

import { getAbsoluteImagePath } from '~/utils/get-absolute-image-path';

type RecommendationTagProps = {
    firstName?: string;
    lastName?: string;
    photo?: string;
    othersLength?: number;
};

export const RecommendationTag: FC<RecommendationTagProps> = ({
    firstName,
    lastName,
    photo,
    othersLength,
}) => {
    const renderText =
        othersLength && othersLength - 1 > 0 ? `и ${othersLength - 1} рекомендуют` : 'рекомендует';
    return (
        <Tag size='md' bg='lime.150'>
            <Avatar
                size='2xs'
                src={getAbsoluteImagePath(photo)}
                name={`${firstName} ${lastName}`}
            />
            <TagLabel ml={2} noOfLines={1}>
                {`${firstName} ${lastName}`} {renderText}
            </TagLabel>
        </Tag>
    );
};
