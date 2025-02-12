import { ArrowBackIcon, ArrowForwardIcon, IconButton } from '@chakra-ui/icons';
import { Box, Heading, HStack } from '@chakra-ui/react';
import { useState } from 'react';

import { useIsTablet } from '../../hooks/media-query.ts';
import { carouselRecipes } from '../../mocks/recipes.ts';
import { SectionBox } from '../section-box/section-box.tsx';
import { CarouselItem } from './carousel-item.tsx';

export const Carousel = () => {
    const isTablet = useIsTablet();

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = isTablet ? 1 : 4;
    const totalItems = carouselRecipes.length;

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + itemsPerPage;
            return newIndex >= totalItems ? 0 : newIndex;
        });
    };

    const handleBack = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - itemsPerPage;
            return newIndex < 0
                ? totalItems - (totalItems % itemsPerPage || itemsPerPage)
                : newIndex;
        });
    };
    return (
        <SectionBox>
            <Heading fontSize={{ base: '2xl', xl: '4xl', '2xl': '5xl' }} fontWeight={500} mb={6}>
                Новые рецепты
            </Heading>
            <Box position='relative'>
                <IconButton
                    aria-label='carousel-back'
                    icon={<ArrowBackIcon />}
                    bg='black'
                    color='white'
                    size='lg'
                    position='absolute'
                    top='45%'
                    left='0'
                    transform='translate(-25%, -50%)'
                    zIndex={3}
                    display={{ base: 'none', md: 'block' }}
                    onClick={handleBack}
                />
                <HStack
                    spacing={{ base: 3, md: 6 }}
                    transform={`translateX(-${currentIndex * 320 + currentIndex * 24}px)`}
                    transition='transform 0.3s ease'
                    alignItems='stretch'
                >
                    {carouselRecipes.map((el) => (
                        <CarouselItem {...el} key={el.id} />
                    ))}
                </HStack>
                <IconButton
                    aria-label='carousel-forward'
                    icon={<ArrowForwardIcon />}
                    bg='black'
                    color='white'
                    position='absolute'
                    top='45%'
                    right='0'
                    transform='translate(25%, -50%)'
                    size='lg'
                    zIndex={3}
                    display={{ base: 'none', md: 'block' }}
                    onClick={handleNext}
                />
            </Box>
        </SectionBox>
    );
};
