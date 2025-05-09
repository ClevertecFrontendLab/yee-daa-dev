import { Box, Center, Heading, Image, Link, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import NotFoundImg from '~/assets/images/404.png';
import NotFoundImgTablet from '~/assets/images/404-tablet.png';
import { Paths } from '~/constants/path';

export const ErrorPage = () => (
    <Center
        textAlign='center'
        m='auto'
        w={{ base: '70%', md: '35%', lg: '100%' }}
        py={0}
        px={0}
        h='100%'
        flexDirection='column'
        gap={4}
    >
        <Box boxSize={{ base: 108, md: 108, lg: 206 }}>
            <Image
                w='100%'
                src={NotFoundImg}
                alt='not found page label'
                srcSet={`${NotFoundImg} 1920w, ${NotFoundImgTablet} 768w`}
                mb={{ md: '16px' }}
            />
        </Box>
        <Heading as='h1' size='lg' mb={0} fontSize={{ base: '24px', md: '24px', xl: '36px' }}>
            Упс! Такой страницы нет
        </Heading>
        <Text
            as='p'
            fontSize={{ base: '16px', md: '16px', xl: '24px' }}
            mb={6}
            textColor='blackAlpha.700'
            fontWeight='bold'
        >
            Можете поискать другой рецепт&nbsp;
            <Link
                data-test-id='error-page-go-home'
                as={NavLink}
                to={Paths.R_SWITCHER}
                textUnderlineOffset='4px'
                textDecoration='underline'
                _hover={{ textDecoration: 'none' }}
            >
                здесь.
            </Link>
        </Text>
    </Center>
);
