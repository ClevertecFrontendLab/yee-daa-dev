import {
    IconButton,
    InputGroup,
    InputRightElement,
    SearchIcon,
    Stack,
    Switch,
} from '@chakra-ui/icons';
import { Input, Select, Text } from '@chakra-ui/react';

import { FilterIcon } from '../icons/filter-icon.tsx';

export const SearchBlock = () => {
    return (
        <Stack spacing={4} maxWidth='520px' ml='auto' mr='auto' pb={8}>
            <Stack direction='row' spacing={3}>
                <IconButton
                    aria-label={'filter'}
                    icon={<FilterIcon />}
                    size={{ base: 'sm', md: 'lg' }}
                    width={{ base: '32px', md: '48px' }}
                    variant='outline'
                    borderColor='blackAlpha.600'
                />
                <InputGroup>
                    <Input
                        type='search'
                        size={{ base: 'sm', md: 'lg' }}
                        placeholder='Название или ингредиент...'
                        _placeholder={{ color: 'lime.800' }}
                        borderColor='blackAlpha.600'
                    />
                    <InputRightElement
                        height={{ base: '32px', md: '48px' }}
                        width={{ base: '32px', md: '48px' }}
                    >
                        <SearchIcon
                            width={{ base: '14px', md: '18px' }}
                            height={{ base: '14px', md: '18px' }}
                        />
                    </InputRightElement>
                </InputGroup>
            </Stack>
            <Stack
                spacing={8}
                direction='row'
                justifyContent='flex-end'
                display={{ base: 'none', md: 'flex' }}
            >
                <Stack maxWidth='268px' direction='row' alignItems='center' spacing={3}>
                    <Text>Исключить мои аллергены</Text>
                    <Switch />
                </Stack>
                <Select placeholder='Выберите из списка...' maxWidth='228px' color='lime.800'>
                    <option value='option1'>Какой-то опшен</option>
                </Select>
            </Stack>
        </Stack>
    );
};
