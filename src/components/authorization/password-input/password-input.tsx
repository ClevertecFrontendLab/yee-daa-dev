import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    IconButton,
    IconButtonProps,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { CyTestId } from '~/cy-test-id';

type PasswordInputProps = {
    input: InputProps & { register: UseFormRegisterReturn };
    button?: Omit<IconButtonProps, 'aria-label'>;
    dataTestId?: string;
};

export const PasswordInput: FC<PasswordInputProps> = ({
    input: { register, ...restInput },
    button,
    dataTestId = CyTestId.Auth.PasswordInput,
}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const showPassword = () => setPasswordVisible(true);
    const hidePassword = () => setPasswordVisible(false);

    return (
        <InputGroup>
            <InputRightElement height='48px'>
                <IconButton
                    data-test-id={CyTestId.Auth.PasswordVisibilityButton}
                    onMouseDown={showPassword}
                    onMouseUp={hidePassword}
                    onMouseLeave={hidePassword}
                    variant='unstyled'
                    height='100%'
                    {...button}
                    aria-label='password-visibility'
                >
                    {passwordVisible ? <ViewIcon /> : <ViewOffIcon />}
                </IconButton>
            </InputRightElement>

            <Input
                data-test-id={dataTestId}
                variant='auth'
                size='lg'
                type={passwordVisible ? 'text' : 'password'}
                {...restInput}
                {...register}
            />
        </InputGroup>
    );
};
