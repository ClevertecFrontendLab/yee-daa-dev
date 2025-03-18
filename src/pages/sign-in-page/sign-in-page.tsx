import { Box } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import { SignInForm } from '~/components/authorization/sign-in-form/sign-in-form';
import { Paths } from '~/constants/path';

import { Label } from './label';

const SignInPage = () => (
    <SignInForm>
        <Box
            mt={4}
            width='full'
            textAlign='center'
            fontWeight='semibold'
            fontSize='md'
            _hover={{
                textDecoration: 'underline',
            }}
        >
            <NavLink to={Paths.RESTORE_CREDENTIALS} replace>
                {Label.ForgotPassword}
            </NavLink>
        </Box>
    </SignInForm>
);

export default SignInPage;
