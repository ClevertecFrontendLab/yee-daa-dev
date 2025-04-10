import { Button, Tooltip } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { SubscribeIcon } from '~/components/icons/subcribe-icon';
import { SubscribeCompleteIcon } from '~/components/icons/subscribe-complete-icon';

type ButtonSubscribeProps = {
    userLogin: string;
};

export const ButtonSubscribe: FC<ButtonSubscribeProps> = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);

    return isSubscribed ? (
        <Tooltip
            hasArrow
            label='Нажмите, если хотите отписаться'
            openDelay={100}
            maxWidth={150}
            bgColor='blackAlpha.900'
        >
            <Button
                size='xs'
                color='blackAlpha.800'
                fontSize='xs'
                variant='outline'
                borderColor='blackAlpha.600'
                leftIcon={<SubscribeCompleteIcon />}
                onClick={() => setIsSubscribed(!isSubscribed)}
            >
                Вы подписаны
            </Button>
        </Tooltip>
    ) : (
        <Button
            size='xs'
            color='white'
            bg='blackAlpha.900'
            fontSize='xs'
            leftIcon={<SubscribeIcon />}
            onClick={() => setIsSubscribed(!isSubscribed)}
        >
            Подписаться
        </Button>
    );
};
