import { Box, Flex, Spacer, Square, Text } from '@chakra-ui/react';
import { FC } from 'react';

import userImg from '../../assets/images/user.webp';
import { UserProps } from '../../types/user.ts';

type Props = Partial<{
    size: 'small' | 'large';
    withGutter: boolean;
}>;

const user: UserProps = {
    firstName: 'Екатерина',
    lastName: 'Константинопольская',
    login: '@bake_and_pie',
};

export const UserInfo: FC<Props> = ({ size = 'small', withGutter = false }) => {
    // TODO: заменить на селектор
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { firstName, lastName, login, imageUrl } = user;

    const isLarge = size === 'large';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const imagePlug = (
        <Text fontSize='xl' color='white' fontWeight={500}>
            {firstName[0].concat(lastName[0])}
        </Text>
    );

    return (
        <Flex ml={withGutter ? 13 : 0} maxWidth={'355px'}>
            <Square
                size={isLarge ? '48px' : '32px'}
                bg={'lime.400'}
                borderRadius='50%'
                overflow='hidden'
            >
                {/* TODO: раскоментировать, когда будет доступ к картинкам, убрать заглушки линта */}
                {/*{imageUrl ? <img src={imageUrl} alt={'user-img'} /> : imagePlug}*/}
                <img src={userImg} alt={'user-img'} />
            </Square>
            <Spacer width={3} />
            <Box>
                <Text
                    fontSize='lg'
                    fontWeight={500}
                    lineHeight={7}
                    noOfLines={1}
                    maxWidth={'296px'}
                >
                    {`${firstName} ${lastName}`}
                </Text>
                <Text
                    fontSize='sm'
                    lineHeight={5}
                    color='blackAlpha.700'
                    noOfLines={1}
                    maxWidth={'296px'}
                >
                    {login}
                </Text>
            </Box>
        </Flex>
    );
};
