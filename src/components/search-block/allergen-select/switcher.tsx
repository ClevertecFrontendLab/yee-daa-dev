import { HStack, Switch, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { BUTTON_EXCLUDE_ALLERGENS } from '~/constants/select';

type SwitcherProps = {
    isSwitchOn: boolean;
    isfromFilter: boolean;
    handleSwitchChange: () => void;
};

export const Switcher: FC<SwitcherProps> = ({ isSwitchOn, handleSwitchChange, isfromFilter }) => (
    <HStack>
        <Text fontWeight={500}>{BUTTON_EXCLUDE_ALLERGENS}</Text>
        <Switch
            data-test-id={isfromFilter ? 'allergens-switcher-filter' : 'allergens-switcher'}
            isChecked={isSwitchOn}
            onChange={handleSwitchChange}
            colorScheme='green'
            sx={{
                '&[data-checked] .chakra-switch__track': {
                    backgroundColor: 'var(--chakra-colors-lime-300)',
                },
            }}
        />
    </HStack>
);
