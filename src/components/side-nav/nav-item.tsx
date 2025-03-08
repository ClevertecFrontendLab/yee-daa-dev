import { AccordionIcon, AccordionItem, AccordionPanel, Image } from '@chakra-ui/icons';
import { AccordionButton, HStack, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router';

import { useAppDispatch } from '~/hooks/typed-react-redux-hooks.ts';
import { useDetectParams } from '~/hooks/use-detect-params.ts';
import { Category } from '~/redux/api/types/categories.ts';
import {
    clearSelectedAllergens,
    setFilteredByAllergens,
} from '~/redux/features/allergens-slice.ts';
import { clearFilteredRecipes } from '~/redux/features/recipies-slice.ts';
import { getAbsoluteImagePath } from '~/utils/get-absolute-image-path.ts';
import { isArrayWithItems } from '~/utils/is-array-with-items.ts';

import { SubNavItem } from './sub-nav-item.tsx';

export const NavItem: FC<Category> = ({ category, subCategories, title, icon }) => {
    const dispatch = useAppDispatch();
    const [isActive, setIsActive] = useState(false);
    const { selectedCategory, selectedSubCategory } = useDetectParams();

    const defaultCategoryPath = isArrayWithItems(subCategories)
        ? `/${category}/${subCategories[0].category}`
        : `/${category}`;

    const selectedCategoryPath = `/${selectedCategory?.category}/${selectedSubCategory?.category}`;
    const isSameCategory = category === selectedCategory?.category;

    const handleClick = () => {
        dispatch(clearFilteredRecipes());
        dispatch(clearSelectedAllergens());
        dispatch(setFilteredByAllergens([]));

        setIsActive((prev) => !prev);
    };

    useEffect(() => {
        setIsActive(selectedCategory?.category === category);
    }, [selectedCategory?.category, category]);

    useEffect(() => {
        if (!selectedCategory?.category) {
            setIsActive(false);
        }
    }, [selectedCategory?.category]);

    return (
        <AccordionItem
            border='none'
            className='accordion'
            sx={{
                '.chakra-collapse': {
                    display: isActive ? 'block !important' : 'none !important',
                    height: isActive ? 'auto !important' : '0px !important',
                    opacity: isActive ? '1 !important' : '0 !important',
                    transition: 'opacity 0.1s ease',
                },
            }}
        >
            <NavLink
                // при toggle категории позволяет сохранить выделение того, что было выделено до закрытия, если категория другая - выбирает первый из списка
                to={
                    selectedCategory && selectedSubCategory && isSameCategory
                        ? selectedCategoryPath
                        : defaultCategoryPath
                }
                key={category}
                onClick={handleClick}
                data-test-id={category === 'vegan' ? 'vegan-cuisine' : ''}
            >
                <AccordionButton
                    padding='8px 12px'
                    _expanded={{
                        background: 'lime.100',
                    }}
                >
                    <HStack as='span' flex='1' textAlign='left' spacing={3}>
                        <Image src={getAbsoluteImagePath(icon)} alt={category} w={6} h={6} />
                        <Text
                            fontSize='md'
                            lineHeight={6}
                            fontWeight={isActive ? 700 : 500}
                            noOfLines={1}
                        >
                            {title}
                        </Text>
                    </HStack>
                    <AccordionIcon />
                </AccordionButton>
            </NavLink>
            <AccordionPanel padding='4px 8px 4px 40px'>
                {subCategories?.map((el) => (
                    <SubNavItem key={el.category} {...el} parentCategory={category} />
                ))}
            </AccordionPanel>
        </AccordionItem>
    );
};
