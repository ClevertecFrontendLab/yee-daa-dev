import { FormControl, Switch, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { BUTTON_EXCLUDE_ALLERGENS } from '../../../constants/select';

type SwitcherProps = {
    isSwitchOn: boolean;
    handleSwitchChange: () => void;
};

export const Switcher: FC<SwitcherProps> = ({ isSwitchOn, handleSwitchChange }) => {
    return (
        <FormControl display='flex' gap={3} alignItems='center' width='233px'>
            <Text fontWeight={500}>{BUTTON_EXCLUDE_ALLERGENS}</Text>
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
