import { Checkbox, Heading, Stack } from '@chakra-ui/react';

import { FILTER_TITLES } from '../../constants/filters';
import { useAppDispatch } from '../../hooks/typed-react-redux-hooks';
import { useSelectedItems } from '../../hooks/use-selected-items';
import { toggleMeat } from '../../redux/features/meats-slice';
import { toggleSide } from '../../redux/features/sides-slice';
import { FoodItem } from '../../types/food-item';
import styles from './drawer.module.css';

type CheckboxGroupProps = {
    filterTitle: string;
    items: FoodItem[];
};

export const DrawerCheckboxGroup: React.FC<CheckboxGroupProps> = ({ filterTitle, items }) => {
    const dispatch = useAppDispatch();
    const { selectedItemsResult } = useSelectedItems(filterTitle);

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
                    isChecked={selectedItemsResult?.includes(item.value)}
                    onChange={() => handleCheckboxChange(item.value)}
                >
                    {item.label}
                </Checkbox>
            ))}
        </Stack>
    );
};
