import { Checkbox, Heading, Stack } from '@chakra-ui/react';

import { FILTER_TITLES } from '../../constants/filters';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-react-redux-hooks';
import { selectSelectedMeats, toggleMeat } from '../../redux/features/meats-slice';
import { selectSelectedSides, toggleSide } from '../../redux/features/sides-slice';
import { FoodItem } from '../../types/food-item';
import styles from './drawer.module.css';
import { getSelectedItems } from './helpers/get-selected-items';

type CheckboxGroupProps = {
    filterTitle: string;
    items: FoodItem[];
};

export const DrawerCheckboxGroup: React.FC<CheckboxGroupProps> = ({ filterTitle, items }) => {
    const dispatch = useAppDispatch();
    const selectedMeats = useAppSelector(selectSelectedMeats);
    const selectedSides = useAppSelector(selectSelectedSides);

    const selectedItems = getSelectedItems(filterTitle, { selectedMeats, selectedSides });

    const handleCheckboxChange = (value: string) => {
        if (filterTitle === FILTER_TITLES.MEAT) {
            dispatch(toggleMeat(value));
        }
        if (filterTitle === FILTER_TITLES.SIDE) {
            dispatch(toggleSide(value));
        }
    };

    return (
        <Stack>
            <Heading className={styles.drawerType}>{filterTitle}:</Heading>
            {items.map((item) => (
                <Checkbox
                    borderColor='var(--chakra-colors-lime-300)'
                    iconColor='black'
                    _hidden={{ display: 'none' }}
                    sx={{
                        '&[data-checked] .chakra-checkbox__control': {
                            backgroundColor: 'var(--chakra-colors-lime-300)',
                            borderColor: 'var(--chakra-colors-lime-300)',
                        },
                    }}
                    key={item.id}
                    value={item.value}
                    isChecked={selectedItems?.includes(item.value)}
                    onChange={() => handleCheckboxChange(item.value)}
                >
                    {item.label}
                </Checkbox>
            ))}
        </Stack>
    );
};
