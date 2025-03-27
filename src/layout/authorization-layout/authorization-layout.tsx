import {
    Box,
    Center,
    Container,
    Heading,
    Show,
    Tab,
    TabIndicator,
    TabList,
    Tabs,
    theme,
    useMediaQuery,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router';

import { Logo } from '~/components/logo';

import { Paths } from '../../constants/path';
import { Label } from './label';

const TabNavigation = [Paths.SIGN_IN, Paths.SIGN_UP] as const;

const AuthorizationLayout: FC = () => {
    const match = useMatch(Paths.SIGN_IN);
    const [tabIndex, setTabIndex] = useState<number>(match ? 0 : 1);

    const navigate = useNavigate();
    const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

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
                    bgGradient='linear(to-bl, lime.100, #29813F 170%)'
                >
                    <Container maxW={{ base: 387, md: 493 }}>
                        <h1>
                            <Logo
                                height={isMd ? 64 : 38}
                                hideMd={false}
                                mb={{ base: 16, md: 20 }}
                            />
                        </h1>

                        <Tabs
                            variant='auth'
                            size='lg'
                            mb={10}
                            isFitted
                            index={tabIndex}
                            onChange={handleTabsChange}
                        >
                            <TabList>
                                <Tab as='h2' cursor='pointer'>
                                    Вход на сайт
                                </Tab>
                                <Tab as='h2' cursor='pointer'>
                                    Регистрация
                                </Tab>
                            </TabList>
                            <TabIndicator w='50% !important' />
                        </Tabs>

                        <Outlet />
                    </Container>
                </Center>

                <Show above='lg'>
                    <Box
                        maxW='50.65%'
                        w='full'
                        bgImage='url(/images/auth-bg.jpg)'
                        bgRepeat='no-repeat'
                        bgPosition='50% 50%'
                        bgSize='cover'
                    />
                </Show>
            </Box>
            <Box as='footer' p={{ base: 4, sm: 30 }} pos='fixed' bottom={0} w='full'>
                <Wrap spacing='4' justify='space-between'>
                    <WrapItem>
                        <Heading as='h6' fontSize='xs' fontWeight='semibold'>
                            {Label.Rigths}
                        </Heading>
                    </WrapItem>

                    <WrapItem display={{ base: 'none', lg: 'block' }}>
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
