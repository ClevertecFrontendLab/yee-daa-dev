import { ArrowBackIcon, ArrowForwardIcon, IconButton } from '@chakra-ui/icons';
import { Box, Heading, HStack } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';

import { useIsTablet } from '../../hooks/media-query.ts';
import { useAppSelector } from '../../hooks/typed-react-redux-hooks.ts';
import { selectRecipes } from '../../redux/features/recipies-slice.ts';
import { CarouselItem } from './carousel-item.tsx';

export const Carousel: FC = () => {
    const isTablet = useIsTablet();
    const allRecipes = useAppSelector(selectRecipes);
    const [currentIndex, setCurrentIndex] = useState(0);
    const lastItemRef = useRef<HTMLDivElement | null>(null);

    const carouselRecipes = allRecipes
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

    const itemsPerPage = isTablet ? 1 : 2;
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
            return newIndex < 0 ? totalItems - itemsPerPage : newIndex;
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setCurrentIndex(0);
                    }
                });
            },
            { threshold: 1.0 },
        );

        if (lastItemRef.current) {
            observer.observe(lastItemRef.current);
        }

        return () => {
            if (lastItemRef.current) {
                observer.unobserve(lastItemRef.current);
            }
        };
    }, [lastItemRef]);

    return (
        <Box maxWidth='1360px' mb={{ base: 8, xmd: 10 }} position='relative'>
            <Heading fontSize={{ base: '2xl', xl: '4xl', '2xl': '5xl' }} fontWeight={500} mb={6}>
                Новые рецепты
            </Heading>
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
                display={{ base: 'none', xmd: 'block' }}
                onClick={handleBack}
            />
            <Box
                overflowX={{ base: 'auto', xmd: 'auto', '2xl': 'hidden' }}
                sx={{
                    scrollbarWidth: 'none',
                    '::-webkit-scrollbar': {
                        display: 'none',
                    },
                    WebkitOverflowScrolling: { base: 'touch', xmd: 'touch' },
                }}
            >
                <HStack
                    spacing={{ base: 3, xmd: 6 }}
                    transform={`translateX(-${currentIndex * 320 + currentIndex * 24}px)`}
                    transition='transform 0.3s ease'
                    alignItems='stretch'
                >
                    {carouselRecipes.map((el, index) => (
                        <div
                            ref={index === carouselRecipes.length - 1 ? lastItemRef : null}
                            key={el.id}
                        >
                            <CarouselItem recipe={el} />
                        </div>
                    ))}
                </HStack>
            </Box>
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
                display={{ base: 'none', xmd: 'block' }}
                onClick={handleNext}
            />
        </Box>
    );
};
