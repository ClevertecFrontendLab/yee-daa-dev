import { Avatar } from '@chakra-ui/icons';
import { Grid, GridItem } from '@chakra-ui/react';

import { Paths } from '~/constants/path.ts';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { selectUser } from '~/redux/features/user-slice.ts';
import { getAbsoluteImagePath } from '~/utils/get-absolute-image-path.ts';

import { HomeSvg } from '../icons/home-svg.tsx';
import { SearchSvg } from '../icons/search-svg.tsx';
import { WriteSvg } from '../icons/write-svg.tsx';
import { FooterBtn } from './footer-btn.tsx';

const footerButtons = [
    { text: 'Главная', icon: <HomeSvg />, path: Paths.R_SWITCHER },
    { text: 'Поиск', icon: <SearchSvg />, path: Paths.R_SWITCHER },
    { text: 'Записать', icon: <WriteSvg />, path: Paths.NEW_RECIPE },
];

export const Footer = () => {
    const { firstName, lastName, photoLink } = useAppSelector(selectUser);

    return (
        <Grid templateColumns='repeat(4, 1fr)' height='100%' templateRows='1fr'>
            {footerButtons.map(({ icon, path, text }) => (
                <GridItem key={text}>
                    <FooterBtn text={text} icon={icon} path={path} />
                </GridItem>
            ))}
            <GridItem key={footerButtons.length}>
                <FooterBtn
                    text='Мой профиль'
                    icon={
                        <Avatar
                            src={getAbsoluteImagePath(photoLink)}
                            name={`${firstName} ${lastName}`}
                        />
                    }
                    isProfile={true}
                    path={Paths.PROFILE}
                />
            </GridItem>
        </Grid>
    );
};
