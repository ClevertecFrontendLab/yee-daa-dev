import { ArrowBackIcon, ArrowForwardIcon, IconButton } from '@chakra-ui/icons';
import { Box, Heading, HStack } from '@chakra-ui/react';

import kotletaImg from '../../assets/images/kapustnie-kotletki.png';
import oladushkiImg from '../../assets/images/oladushki.png';
import saladImg from '../../assets/images/salat-zdorovie.png';
import soliankaImg from '../../assets/images/solianka.png';
import { carouselRecipes } from '../../mocks/carousel-recipes.ts';
import { CarouselItem } from './carousel-item.tsx';

const imgArr = [soliankaImg, kotletaImg, oladushkiImg, saladImg, soliankaImg];

export const Carousel = () => {
    return (
        <Box mb='40px'>
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
                />
                <HStack
                    spacing={{ base: 3, md: 6 }}
                    overflowX='hidden'
                    maxWidth='100%'
                    alignItems='stretch'
                >
                    {carouselRecipes.map((el, i) => (
                        <CarouselItem {...el} key={el.id} image={imgArr[i]} />
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
                />
            </Box>
        </Box>
    );
};
