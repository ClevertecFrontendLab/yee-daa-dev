import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import { Paths } from '../../constants/path';

export const ErrorPage = () => {
    return (
        <Box textAlign='center' py={10} px={6}>
            <Heading as='h1' size='2xl' mb={4}>
                Ой! Что-то пошло не так.
            </Heading>
            <Text fontSize='lg' mb={6}>
                Мы не можем найти страницу, которую вы ищете.
            </Text>
            <Button colorScheme='teal' as={NavLink} to={Paths.R_SWITCHER}>
                Вернуться на главную
            </Button>
        </Box>
    );
};
