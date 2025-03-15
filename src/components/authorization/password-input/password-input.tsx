import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';
import { FC, useState } from 'react';

type PasswordInputProps = InputProps;

export const PasswordInput: FC<PasswordInputProps> = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const showPassword = () => setPasswordVisible(true);
    const hidePassword = () => setPasswordVisible(false);

    return (
        <InputGroup>
            <InputRightElement height='48px'>
                <IconButton
                    aria-label='password-visibility'
                    onMouseDown={showPassword}
                    onMouseUp={hidePassword}
                    onMouseLeave={hidePassword}
                    variant='unstyled'
                    height='100%'
                >
                    {passwordVisible ? <ViewIcon /> : <ViewOffIcon />}
                </IconButton>
            </InputRightElement>

            <Input
                variant='auth'
                size='lg'
                type={passwordVisible ? 'text' : 'password'}
                {...props}
            />
        </InputGroup>
    );
};
