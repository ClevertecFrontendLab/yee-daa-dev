import { FormControl, Switch, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { BUTTON_EXCLUDE_MY_ALLERGENS } from '../../../constants/select';

type SwitcherProps = {
    isSwitchOn: boolean;
    handleSwitchChange: () => void;
};

export const Switcher: FC<SwitcherProps> = ({ isSwitchOn, handleSwitchChange }) => {
    return (
        <FormControl display='flex' alignItems='center' width='268px'>
            <Text fontWeight={500} width='220px'>
                {BUTTON_EXCLUDE_MY_ALLERGENS}
            </Text>
            <Switch
                isChecked={isSwitchOn}
                onChange={handleSwitchChange}
                colorScheme='green'
                sx={{
                    '&[data-checked] .chakra-switch__track': {
                        backgroundColor: 'var(--chakra-colors-lime-300)',
                    },
                }}
            />
        </FormControl>
    );
};
