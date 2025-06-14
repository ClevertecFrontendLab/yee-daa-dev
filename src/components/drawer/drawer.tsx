import { CloseIcon } from '@chakra-ui/icons';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    Stack,
    Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router';

import { FILTER_TITLES } from '~/constants/filters';
import { Paths } from '~/constants/path';
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { authors as mockAuthors } from '~/mocks/filters';
import { useCreateNoteMutation } from '~/redux/api/user-api';
import { selectCategoriesMenu } from '~/redux/features/categories-slice';
import { closeDrawer, selectDrawer } from '~/redux/features/filter-drawer-slice';
import { selectMeats } from '~/redux/features/meats-slice';
import { selectSides } from '~/redux/features/sides-slice';

import { CriteriaTagsList } from '../criteria-tags-list';
import { AllergenSelect } from '../search-block/allergen-select';
import styles from './drawer.module.css';
import { DrawerCheckboxGroup } from './drawer-checkbox-group';
import { FilterDrawerFooter } from './drawer-footer';
import { DrawerMenu } from './drawer-menu';

export const FilterDrawer = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const isOpenDrawer = useAppSelector(selectDrawer);
    const allCategories = useAppSelector(selectCategoriesMenu);

    const [sendNote] = useCreateNoteMutation({});
    const [textAreaValue, setTextAreaValue] = useState('');
    const [textAreaError, setTextAreaError] = useState('');

    const MIN_LENGTH = 10;
    const MAX_LENGTH = 160;

    const isProfile = pathname === Paths.PROFILE;

    //TODO заменить на данные из запроса для авторов когда будет коллекция с авторами
    const authors = mockAuthors;
    const meats = useAppSelector(selectMeats);
    const sides = useAppSelector(selectSides);

    const onClose = () => {
        dispatch(closeDrawer());
        setTextAreaValue('');
        setTextAreaError('');
    };
    const validateNote = (text: string) => {
        if (!text.trim()) return 'Поле обязательно';
        if (text.length < MIN_LENGTH) return `Минимум ${MIN_LENGTH} символов`;
        if (text.length > MAX_LENGTH) return `Максимум ${MAX_LENGTH} символов`;
        return '';
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target.value;
        if (textAreaError) {
            const err = validateNote(inputValue);
            setTextAreaError(err);
        }
        setTextAreaValue(inputValue.trim());
    };

    const handlePublicNotes = () => {
        const error = validateNote(textAreaValue);
        console.log(error);
        if (error) {
            setTextAreaError(error);
            return;
        }
        sendNote({ text: textAreaValue });
        onClose();
    };

    return (
        <Drawer
            isOpen={isOpenDrawer}
            placement='right'
            onClose={onClose}
            size={{ base: '100%', sm: 'sm', lg: 'md' }}
        >
            <DrawerOverlay onClick={onClose} />
            <DrawerContent className={styles.drawer} data-test-id='filter-drawer'>
                <DrawerHeader className={styles.drawerHeader}>
                    {isProfile ? (
                        <span className={styles.drawerHeading}>Новая заметка</span>
                    ) : (
                        <span className={styles.drawerHeading}>Фильтр</span>
                    )}
                    <CloseIcon
                        data-test-id='close-filter-drawer'
                        bg='black'
                        borderRadius='50%'
                        color='white'
                        p={1}
                        w={6}
                        h={6}
                        onClick={onClose}
                        cursor='pointer'
                    />
                </DrawerHeader>
                <DrawerBody className={styles.drawerBody}>
                    {isProfile ? (
                        <FormControl isInvalid={!!textAreaError}>
                            <Textarea
                                placeholder='Максимально 160 символов'
                                value={textAreaValue}
                                onChange={handleTextAreaChange}
                            />
                        </FormControl>
                    ) : (
                        <>
                            <Stack spacing={6}>
                                <DrawerMenu
                                    items={allCategories}
                                    filterTitle={FILTER_TITLES.CATEGORY}
                                />
                                <DrawerMenu
                                    items={authors}
                                    filterTitle={FILTER_TITLES.AUTHOR_SEARCH}
                                />
                            </Stack>
                            <Stack spacing={6}>
                                <DrawerCheckboxGroup
                                    filterTitle={FILTER_TITLES.MEAT}
                                    items={meats}
                                />
                                <DrawerCheckboxGroup
                                    filterTitle={FILTER_TITLES.SIDE}
                                    items={sides}
                                />
                                <AllergenSelect fromFilter={true} />
                            </Stack>
                            <CriteriaTagsList forDrawer={true} />
                        </>
                    )}
                </DrawerBody>
                {isProfile ? (
                    <DrawerFooter p={0}>
                        <Button
                            bg='blackAlpha.900'
                            variant='solid'
                            colorScheme='black'
                            mr={3}
                            onClick={handlePublicNotes}
                            isDisabled={!!textAreaError}
                        >
                            Опубликовать
                        </Button>
                    </DrawerFooter>
                ) : (
                    <FilterDrawerFooter />
                )}
            </DrawerContent>
        </Drawer>
    );
};
