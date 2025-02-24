import {
    Box,
    Center,
    Container,
    Heading,
    Tab,
    TabIndicator,
    TabList,
    Tabs,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router';

import { Paths } from '../../constants/path';
import { Logo } from '../logo';

export const Label = {
    Rigths: 'Все права защищены, ученический файл, ©Клевер Технолоджи, 2025',
    BestDishes: 'Лучший сервис для ваших кулинарных блюд',
} as const;

const TabNavigation = [Paths.SIGN_IN, Paths.SIGN_UP] as const;

const AuthorizationLayout: FC = () => {
    const match = useMatch(Paths.SIGN_IN);
    const [tabIndex, setTabIndex] = useState<number>(match ? 0 : 1);

    const navigate = useNavigate();

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
        navigate(TabNavigation[index], { replace: true });
    };

    return (
        <>
            <Box as='main' display='flex' minHeight='100dvh'>
                <Center
                    as='section'
                    pb={75}
                    flex={1}
                    bgGradient='linear(to-bl, lime.100, #29813F 150%)'
                >
                    <Container maxW={493}>
                        <Logo height={64} mb={20} />

                        <Tabs
                            variant='auth'
                            size='lg'
                            mb={10}
                            isFitted
                            index={tabIndex}
                            onChange={handleTabsChange}
                        >
                            <TabList>
                                <Tab>Вход на сайт</Tab>
                                <Tab>Регистрация</Tab>
                            </TabList>
                            <TabIndicator w='50% !important' />
                        </Tabs>

                        <Outlet />
                    </Container>
                </Center>

                <Box
                    maxW='50.65%'
                    w='full'
                    bgImage='url(/auth-bg.jpg)'
                    bgRepeat='no-repeat'
                    bgPosition='50% 50%'
                    bgSize='cover'
                />
            </Box>
            <Box as='footer' p={{ base: 30 }} pos='fixed' bottom={0} w='full'>
                <Wrap spacing='4' justify='space-between'>
                    <WrapItem>
                        <Heading as='h6' fontSize='xs' fontWeight='semibold'>
                            {Label.Rigths}
                        </Heading>
                    </WrapItem>

                    <WrapItem>
                        <Heading as='h6' fontSize='xs' fontWeight='semibold'>
                            &ndash;&nbsp;{Label.BestDishes}
                        </Heading>
                    </WrapItem>
                </Wrap>
            </Box>
        </>
    );
};

export default AuthorizationLayout;
