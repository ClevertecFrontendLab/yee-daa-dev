import 'swiper/swiper-bundle.css';

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton } from '@chakra-ui/react';
import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { selectRecipes } from '~/redux/features/recipies-slice.ts';

import { CarouselItem } from './carousel-item.tsx';

export const Carousel = () => {
    const allRecipes = useAppSelector(selectRecipes);
    const swiperRef = useRef<SwiperRef | null>(null);

    const carouselRecipes = allRecipes
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

    return (
        <Box maxWidth='1360px' mb={{ base: 8, xmd: 10 }} position='relative'>
            <Heading fontSize={{ base: '2xl', xl: '4xl', '2xl': '5xl' }} fontWeight={500} mb={6}>
                Новые рецепты
            </Heading>

            <Swiper
                ref={swiperRef}
                modules={[Navigation]}
                navigation={false}
                spaceBetween={12}
                slidesPerView={2}
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
                {carouselRecipes.map((el) => (
                    <SwiperSlide key={el.id}>
                        <CarouselItem recipe={el} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <IconButton
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
        </Box>
    );
};
