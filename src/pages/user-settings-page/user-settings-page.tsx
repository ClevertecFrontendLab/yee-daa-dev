import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    Heading,
    HStack,
    Image,
    Text,
    useDisclosure,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { NavLink } from 'react-router';

import RecommendedImg from '~/assets/images/recommended.svg';
import { PeopleIcon } from '~/components/icons/people-icon';
import { RecommendationIcon } from '~/components/icons/recommendation-icon';
import { icons } from '~/constants/icons';
import { CLEVERTEC } from '~/constants/path';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import {
    selectIsRecommending,
    selectUser,
    selectUserStatistic,
    selectUserSubscribers,
} from '~/redux/features/user-slice';
import { UserStatistic } from '~/types/user';

import { AvatarInput } from './components/avatar-input';
import { ChartBlock } from './components/chart';
import { DeleteModal } from './components/delete-modal';
import { Subscriber } from './components/subscriber';
import { UserForm } from './components/user-form';
import { CHART_BOX_VIEW } from './constants';

type UserStatisticChartKeys = Extract<keyof UserStatistic, 'likes' | 'bookmarks'>;

export const UserSettingsPage = () => {
    const { subscribers } = useAppSelector(selectUser);
    const userSubscribers = useAppSelector(selectUserSubscribers);
    const isRecommendingProfile = useAppSelector(selectIsRecommending);
    const userStatistic = useAppSelector(selectUserStatistic);
    const { bookmarks, recommendationsCount } = userStatistic;

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <VStack spacing='40px' align='left' w='100%'>
            <VStack spacing='16px' align='left'>
                <Heading as='h4' size='md' lineHeight={7} fontWeight={700}>
                    Авторизация и персонализация
                </Heading>
                <AvatarInput />
                <UserForm />
            </VStack>

            <VStack spacing='16px' align='left'>
                <Heading as='h4' size='md' lineHeight={7}>
                    Статистика
                </Heading>
                <VStack spacing='12px' align='left'>
                    <HStack spacing='6px' px='6px'>
                        <PeopleIcon boxSize='12px' />
                        <Text
                            fontSize='xs'
                            lineHeight={4}
                            fontWeight={600}
                            color='var(--chakra-colors-lime-600)'
                        >
                            {userSubscribers.length} подписчиков
                        </Text>
                    </HStack>
                    <Wrap gap='12px' alignSelf='stretch'>
                        {userSubscribers.map((subscriber) => (
                            <WrapItem key={subscriber.id}>
                                <Subscriber {...subscriber} />
                            </WrapItem>
                        ))}
                    </Wrap>
                </VStack>
                {userStatistic &&
                    Object.entries(CHART_BOX_VIEW).map(([key, value]) => (
                        <ChartBlock
                            chartData={userStatistic[key as UserStatisticChartKeys]}
                            viewData={value}
                            key={key}
                        />
                    ))}
            </VStack>

            {isRecommendingProfile && (
                <VStack spacing='40px' w='100%'>
                    <HStack
                        w='100%'
                        spacing='32px'
                        px='32px'
                        py='24px'
                        bgColor='lime.150'
                        borderRadius='16px'
                        position='relative'
                    >
                        <HStack position='absolute' top='24px' right='32px' spacing='8px'>
                            <HStack spacing='6px' p='4px'>
                                {icons['bookmarks']}
                                <Text
                                    fontSize='xs'
                                    lineHeight='16px'
                                    fontWeight={600}
                                    color='lime.600'
                                >
                                    {bookmarks.length}
                                </Text>
                            </HStack>
                            <HStack spacing='6px' p='4px'>
                                {icons['followers']}
                                <Text
                                    fontSize='xs'
                                    lineHeight='16px'
                                    fontWeight={600}
                                    color='lime.600'
                                >
                                    {subscribers.length}
                                </Text>
                            </HStack>
                        </HStack>
                        <Image w='206px' h='206px' src={RecommendedImg} alt='Breakfast' />
                        <VStack w='579px' spacing='24px'>
                            <Text fontSize='4xl' fontWeight={600} lineHeight='40px'>
                                Теперь вы можете рекомендовать рецепты других авторов
                            </Text>
                            <HStack spacing='8px' align='left' alignItems='center'>
                                <Text fontSize='md'>Это можно будет сделать с помощью кнопки</Text>
                                <Button
                                    colorScheme='black'
                                    variant='solid'
                                    bgColor='blackAlpha.900'
                                    size='sm'
                                    onClick={(e) => e.preventDefault()}
                                    type='button'
                                    leftIcon={<RecommendationIcon color='white' />}
                                >
                                    Рекомендовать рецепт
                                </Button>
                            </HStack>
                        </VStack>
                    </HStack>
                    <HStack
                        w='100%'
                        spacing={{ base: '6px', md: '8px' }}
                        pt={2}
                        pb={2}
                        pl={2}
                        pr={1}
                    >
                        {icons['recommendation']}
                        <Text fontSize='md' lineHeight={6} color='lime.600'>
                            {recommendationsCount}
                        </Text>
                        <Text fontSize='md' lineHeight={6} color='lime.600'>
                            рекомендованных рецептов
                        </Text>
                    </HStack>
                </VStack>
            )}
            <Flex justifyContent='space-between' flexDirection={{ base: 'column' }} gap='16px'>
                <Heading as='h4' size='md' lineHeight={7}>
                    О проекте
                </Heading>
                <HStack>
                    <Text fontSize='md' lineHeight={6} fontWeight={500}>
                        Связаться с <NavLink to={CLEVERTEC}>разработчиками</NavLink>
                    </Text>{' '}
                    <ArrowForwardIcon />
                </HStack>
            </Flex>
            <Flex justifyContent='space-between' flexDirection={{ base: 'column' }} gap='16px'>
                <Heading as='h4' size='md' lineHeight={7}>
                    Удаление аккаунта
                </Heading>
                <HStack spacing='8px'>
                    <Button variant='link' onClick={onOpen} colorScheme='black'>
                        <Text fontSize='md' lineHeight={6} fontWeight={500}>
                            Удалить мой аккаунт
                        </Text>
                    </Button>
                    <ArrowForwardIcon />
                </HStack>
            </Flex>
            <DeleteModal isOpen={isOpen} onClose={onClose} />
        </VStack>
    );
};
