import { AccordionIcon, AccordionItem, AccordionPanel, Image } from '@chakra-ui/icons';
import { AccordionButton, HStack, Text } from '@chakra-ui/react';
import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';

import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { useDetectParams } from '~/hooks/use-detect-params.ts';
import { Category } from '~/redux/api/types/categories.ts';
import { selectActiveIndex, setActiveIndex } from '~/redux/features/accordion-slice.ts';
import { getAbsoluteImagePath } from '~/utils/get-absolute-image-path.ts';
import { isArrayWithItems } from '~/utils/is-array-with-items.ts';

import { SubNavItem } from './sub-nav-item.tsx';

export const NavItem: FC<Category & { index: number }> = ({
    category,
    subCategories,
    title,
    icon,
    index,
}) => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const [isActive, setIsActive] = useState(false);
    const { selectedCategory } = useDetectParams();
    const activeIndex = useAppSelector(selectActiveIndex);

    const defaultCategoryPath = isArrayWithItems(subCategories)
        ? `/${category}/${subCategories[0].category}`
        : `/${category}`;

    const isSameCategory = category === selectedCategory?.category;
    const isRootPath = pathname === '/';

    const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        setIsActive((prev) => !prev);
        dispatch(setActiveIndex(index));
        // чтобы по клику на ту же самую категорию не происходило перерендера и перенавигации
        if (isSameCategory) {
            e.preventDefault();
        }
    };

    useEffect(() => {
        if (!selectedCategory?.category || isRootPath) {
            setIsActive(false);
            return;
        }

        setIsActive(selectedCategory.category === category);
    }, [selectedCategory?.category, category, isRootPath]);

    useEffect(() => {
        //при перезагрузке страницы с тем же путем чтобы активной становилось сразу выбранная категория
        if (selectedCategory?.category === category && activeIndex === -1) {
            dispatch(setActiveIndex(index));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            id={selectedCategory?.category}
        >
            <NavLink
                to={defaultCategoryPath}
                key={category}
                onClick={handleClick}
                data-test-id={`${category === 'vegan' ? 'vegan-cuisine' : category}`}
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
