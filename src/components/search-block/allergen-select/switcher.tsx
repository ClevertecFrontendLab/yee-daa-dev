import { HStack, Switch, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { BUTTON_EXCLUDE_ALLERGENS } from '~/constants/select';
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { selectSwitcherState, toggleSwitcher } from '~/redux/features/allergens-slice';

type SwitcherProps = {
    fromFilter: boolean;
    handleSwitchChangeCb: () => void;
};

export const Switcher: FC<SwitcherProps> = ({ handleSwitchChangeCb, fromFilter }) => {
    const isSwitchOn = useAppSelector(selectSwitcherState);
    const dispatch = useAppDispatch();

    const handleSwitchChange = () => {
        handleSwitchChangeCb();
        dispatch(toggleSwitcher());
    };
    return (
        <HStack>
            <Text fontWeight={500}>{BUTTON_EXCLUDE_ALLERGENS}</Text>
            <Switch
                data-test-id={fromFilter ? 'allergens-switcher-filter' : 'allergens-switcher'}
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
};
