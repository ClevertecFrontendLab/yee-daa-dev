import { Center, Heading, Image, Link, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import NotFoundImg from '~/assets/images/404.png';
import NotFoundImgTablet from '~/assets/images/404-tablet.png';
import { Paths } from '~/constants/path';

export const ErrorPage = () => {
    console.log(Paths);
    return (
        <Center textAlign='center' py={0} px={0} h='100%' flexDirection='column' gap={4}>
            <Image
                src={NotFoundImg}
                alt='not found page label'
                srcSet={`${NotFoundImg} 1920w, ${NotFoundImgTablet} 768w`}
            />
            <Heading as='h1' size='2xl' mb={4}>
                Упс! Такой страницы нет
            </Heading>
            <Text fontSize='lg' mb={6} textColor='black.700'>
                Можете поискать другой рецепт{' '}
                <Link as={NavLink} to={Paths.R_SWITCHER} textUnderlineOffset='6px'>
                    здесь
                </Link>
                .
            </Text>
        </Center>
    );
};
