import { Button, Tooltip } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

import { SubscribeIcon } from '~/components/icons/subcribe-icon';
import { SubscribeCompleteIcon } from '~/components/icons/subscribe-complete-icon';
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useToggleSubscriptionMutation } from '~/redux/api/users-api';
import { selectCurrUserId, setBloggersToggleLoader } from '~/redux/features/bloggers-slice';

type ButtonSubscribeProps = {
    userId: string;
    isSubscribedFromReq?: boolean;
};

export const ButtonSubscribe: FC<ButtonSubscribeProps> = ({ userId, isSubscribedFromReq }) => {
    const [toggleSubscription, { isLoading, data }] = useToggleSubscriptionMutation();
    const dispatch = useAppDispatch();
    const currUserId = useAppSelector(selectCurrUserId);

    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        if (isSubscribedFromReq) setIsSubscribed(isSubscribedFromReq);
    }, [isSubscribedFromReq]);

    useEffect(() => {
        if (isLoading) dispatch(setBloggersToggleLoader(userId));
        else dispatch(setBloggersToggleLoader(''));
    }, [isLoading]);

    useEffect(() => {
        if (data !== undefined) setIsSubscribed(data);
    }, [data]);

    const handleButtonClick = () => {
        toggleSubscription({
            toUserId: userId,
            fromUserId: currUserId,
        });
    };

    return isSubscribed ? (
        <Tooltip
            hasArrow
            label='Нажмите, если хотите отписаться'
            openDelay={100}
            maxWidth={150}
            bgColor='blackAlpha.900'
        >
            <Button
                type='button'
                size='xs'
                color='blackAlpha.800'
                fontSize='xs'
                variant='outline'
                borderColor='blackAlpha.600'
                leftIcon={<SubscribeCompleteIcon />}
                onClick={handleButtonClick}
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
            onClick={handleButtonClick}
        >
            Подписаться
        </Button>
    );
};
