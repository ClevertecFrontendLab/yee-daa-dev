import 'swiper/swiper-bundle.css';

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Center, Heading, IconButton } from '@chakra-ui/react';
import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { SLIDER_RECIPES_LIMIT } from '~/constants/general.ts';
import { NEWEST_PARAMS } from '~/redux/api/constants.ts';
import { useGetAllRecipesWithParamsQuery } from '~/redux/api/services/recipes-api/index.ts';
import { Nullable } from '~/types/common.ts';
import { isArrayWithItems } from '~/utils/is-array-with-items.ts';

import { CarouselItem } from './carousel-item.tsx';

export const Carousel = () => {
    const { data } = useGetAllRecipesWithParamsQuery(NEWEST_PARAMS);
    const carouselItems = data?.data ?? [];
    const swiperRef = useRef<Nullable<SwiperRef>>(null);

    const carouselRecipes = carouselItems
        ?.slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, SLIDER_RECIPES_LIMIT);

    return (
        <Box maxWidth='1360px' mb={{ base: 8, xmd: 10 }} position='relative'>
            <Heading fontSize={{ base: '2xl', xl: '4xl', '2xl': '5xl' }} fontWeight={500} mb={6}>
                Новые рецепты
            </Heading>
            {isArrayWithItems(carouselRecipes) ? (
                <>
                    <Swiper
                        data-test-id='carousel'
                        ref={swiperRef}
                        modules={[Navigation]}
                        navigation={false}
                        spaceBetween={12}
                        slidesPerView={1}
                        loop={true}
                        grabCursor={true}
                        breakpoints={{
                            360: { slidesPerView: 2 },
                            560: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1120: { slidesPerView: 3 },
                            1640: { slidesPerView: 4 },
                        }}
                    >
                        {carouselRecipes.map((el, index) => (
                            <SwiperSlide key={el.id} data-test-id={`carousel-card-${index}`}>
                                <CarouselItem recipe={el} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <IconButton
                        data-test-id='carousel-back'
                        aria-label='carousel-back'
                        icon={<ArrowBackIcon />}
                        onClick={() => swiperRef.current?.swiper.slidePrev()}
                        bg='black'
                        color='white'
                        size='lg'
                        position='absolute'
                        top='45%'
                        left='0'
                        transform='translate(-25%, -50%)'
                        zIndex={3}
                        display={{ base: 'none', xmd: 'block' }}
                    />
                    <IconButton
                        data-test-id='carousel-forward'
                        aria-label='carousel-forward'
                        icon={<ArrowForwardIcon />}
                        onClick={() => swiperRef.current?.swiper.slideNext()}
                        bg='black'
                        color='white'
                        size='lg'
                        position='absolute'
                        top='45%'
                        right='0'
                        transform='translate(25%, -50%)'
                        zIndex={3}
                        display={{ base: 'none', xmd: 'block' }}
                    />
                </>
            ) : (
                <Center width={{ base: '328px', md: '328px', lg: '400px' }} textAlign='center'>
                    Извините! Произошла ошибка получения рецептов для формирования слайдера!
                </Center>
            )}
        </Box>
    );
};
