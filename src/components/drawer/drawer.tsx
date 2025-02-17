import { CloseIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Select,
    Stack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../hooks/typed-react-redux-hooks';
import { meats, sides } from '../../mocks/filters';
import { selectAuthors } from '../../redux/features/authors-slice';
import { selectCategoriesMenu } from '../../redux/features/categories-slice';
import { selectCuisines } from '../../redux/features/cuisines-slice';
import { closeDrawer, selectDrawer } from '../../redux/features/drawer';
import { AllergenSelect } from '../search-block/allergen-select';
import styles from './drawer.module.css';

export const FilterDrawer = () => {
    const dispatch = useDispatch();
    const isOpenDrawer = useAppSelector(selectDrawer);
    const allCategories = useAppSelector(selectCategoriesMenu);
    const cuisines = useAppSelector(selectCuisines);
    const authors = useAppSelector(selectAuthors);

    const onClose = () => {
        dispatch(closeDrawer());
    };

    return (
        <Drawer
            isOpen={isOpenDrawer}
            placement='right'
            onClose={onClose}
            size={{ base: '100%', sm: 'sm', lg: 'md' }}
        >
            <DrawerOverlay onClick={onClose}>
                <DrawerContent className={styles.drawer}>
                    <DrawerHeader className={styles.drawerHeader}>
                        <span className={styles.drawerHeading}>Фильтр</span>
                        <CloseIcon
                            bg='black'
                            borderRadius='50%'
                            color='white'
                            p={1}
                            w={6}
                            h={6}
                            onClick={onClose}
                        />
                    </DrawerHeader>
                    <DrawerBody className={styles.drawerBody}>
                        <Stack spacing={6}>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    width='270px'
                                    _focus={{
                                        borderColor: 'var(--chakra-colors-lime-600)',
                                        boxShadow: 'none',
                                    }}
                                >
                                    Категория
                                </MenuButton>
                                <MenuList width='270px'>
                                    {allCategories.map((category, index) => (
                                        <MenuItem
                                            key={category.title}
                                            fontSize='lg' // Установка размера шрифта для опций
                                            bg={index % 2 === 0 ? 'gray.100' : 'white'} // Заливка опций
                                            _hover={{ bg: 'var(--chakra-colors-lime-200)' }} // Заливка при наведении
                                        >
                                            {category.title}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    width='270px'
                                    _focus={{
                                        borderColor: 'var(--chakra-colors-lime-600)',
                                        boxShadow: 'none',
                                    }}
                                >
                                    Кухня
                                </MenuButton>
                                <MenuList width='270px'>
                                    {cuisines.map((cuisine, index) => (
                                        <MenuItem
                                            key={cuisine.label}
                                            fontSize='lg' // Установка размера шрифта для опций
                                            bg={index % 2 === 0 ? 'gray.100' : 'white'} // Заливка опций
                                            _hover={{ bg: 'var(--chakra-colors-lime-200)' }} // Заливка при наведении
                                        >
                                            {cuisine.label}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    width='270px'
                                    _focus={{
                                        borderColor: 'var(--chakra-colors-lime-600)',
                                        boxShadow: 'none',
                                    }}
                                >
                                    Поиск по автору
                                </MenuButton>
                                <MenuList width='270px'>
                                    {authors.map((author, index) => (
                                        <MenuItem
                                            key={author.login}
                                            fontSize='lg' // Установка размера шрифта для опций
                                            bg={index % 2 === 0 ? 'gray.100' : 'white'} // Заливка опций
                                            _hover={{ bg: 'var(--chakra-colors-lime-200)' }} // Заливка при наведении
                                        >
                                            {author.firstName} {author.lastName}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                            <Select
                                placeholder='Поиск по автору'
                                _focus={{
                                    borderColor: 'var(--chakra-colors-lime-600)',
                                    boxShadow: 'none',
                                }}
                            />
                        </Stack>
                        <Stack spacing={6}>
                            <Stack>
                                <Heading className={styles.drawerType}>Тип мяса:</Heading>
                                {meats.map((meat) => (
                                    <Checkbox
                                        borderColor='var(--chakra-colors-lime-300)'
                                        iconColor='black'
                                        // isChecked={}
                                        // onChange={}
                                        _hidden={{ display: 'none' }}
                                        sx={{
                                            '&[data-checked] .chakra-checkbox__control': {
                                                backgroundColor: 'var(--chakra-colors-lime-300)',
                                                borderColor: 'var(--chakra-colors-lime-300)',
                                            },
                                        }}
                                        key={meat.id}
                                        value={meat.value}
                                    >
                                        {meat.label}
                                    </Checkbox>
                                ))}
                            </Stack>
                            <Stack>
                                <Heading className={styles.drawerType}>Тип гарнира:</Heading>
                                {sides.map((meat) => (
                                    <Checkbox
                                        borderColor='var(--chakra-colors-lime-300)'
                                        iconColor='black'
                                        // isChecked={}
                                        // onChange={}
                                        _hidden={{ display: 'none' }}
                                        sx={{
                                            '&[data-checked] .chakra-checkbox__control': {
                                                backgroundColor: 'var(--chakra-colors-lime-300)',
                                                borderColor: 'var(--chakra-colors-lime-300)',
                                            },
                                        }}
                                        key={meat.id}
                                        value={meat.value}
                                    >
                                        {meat.label}
                                    </Checkbox>
                                ))}
                            </Stack>
                            <AllergenSelect />
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter p={0}>
                        <Button variant='outline' mr={3} className={styles.drawerButton}>
                            Очистить фильтр
                        </Button>
                        <Button bg='black' color='white' className={styles.drawerButton}>
                            Найти рецепт
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
};
