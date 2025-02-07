import { BreadcrumbLink, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import { Paths } from '../../constants/path.ts';
import { pathsMap } from '../../constants/path-map.ts';

const pathsObj: Record<string, string> = {
    vegan: Paths.VEGAN,
};

// TODO: сделать нормальный маппинг, а то поедет крыша мапить ручками на 3 уровень вложенности путей

export const Breadcrumbs = () => {
    const { pathname } = useLocation();
    const pathsArr = pathname.split('/');
    const paths = pathname.length > 1 ? pathsArr : pathsArr.splice(0, pathsArr.length - 1);

    return (
        <>
            <Box width={32} display={{ base: 'none', md: 'block' }} />
            <Breadcrumb
                spacing='8px'
                separator={<ChevronRightIcon color='gray.800' />}
                display={{ base: 'none', md: 'block' }}
            >
                {paths.map((el, i) => {
                    if (!i)
                        return (
                            <BreadcrumbItem
                                key={i}
                                isCurrentPage={paths.length === 1}
                                color={paths.length === 1 ? 'black' : 'blackAlpha.700'}
                            >
                                <BreadcrumbLink as={Link} to={Paths.R_SWITCHER}>
                                    {pathsMap[Paths.R_SWITCHER]}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        );

                    if (i === pathsArr.length - 1 && pathsArr.length > 1)
                        return (
                            <BreadcrumbItem isCurrentPage color='black' key={i}>
                                <BreadcrumbLink as={Link} to={pathsObj[el]}>
                                    {pathsMap[el]}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        );

                    return (
                        <BreadcrumbItem color='blackAlpha.700' key={i}>
                            <BreadcrumbLink as={Link} to={pathsObj[el]}>
                                {pathsMap[el]}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    );
                })}
            </Breadcrumb>
        </>
    );
};
