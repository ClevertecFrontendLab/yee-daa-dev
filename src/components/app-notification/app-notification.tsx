import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Center } from '@chakra-ui/react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import {
    notificationDataSelector,
    notificationShowedSelector,
    resetNotification,
} from '~/redux/features/app-slice';

const ALERT_AUTOCLOSE_TIME_MS = 5000;

export const AppNotification = () => {
    const isNotificationShowed = useAppSelector(notificationShowedSelector);
    const { status, title, description } = useAppSelector(notificationDataSelector);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const timerId = setTimeout(() => dispatch(resetNotification()), ALERT_AUTOCLOSE_TIME_MS);
        console.log('effect worked');
        return () => {
            clearTimeout(timerId);
        };
    }, [dispatch, isNotificationShowed]);

    return (
        isNotificationShowed &&
        title && (
            <Center
                zIndex={1000}
                position='fixed'
                bottom={{ base: '80px', md: '100px', lg: '16px' }}
                left='50%'
                transform='translateX(-50%)'
                width={{ base: '328px', md: '328px', lg: '400px' }}
            >
                <Alert
                    status={status}
                    color='white'
                    backgroundColor='red.500'
                    p='12px 16px'
                    fontSize='16px'
                >
                    <AlertIcon color='white' boxSize='20px' />
                    <Box>
                        <AlertTitle fontWeight={700} pb='2px'>
                            {title}
                        </AlertTitle>
                        {description && (
                            <AlertDescription
                                fontWeight={400}
                                width={{ base: '80%', lg: '100%' }}
                                display='inline-block'
                            >
                                {description}
                            </AlertDescription>
                        )}
                    </Box>
                </Alert>
            </Center>
        )
    );
};
