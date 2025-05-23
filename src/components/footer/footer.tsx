import { Avatar } from '@chakra-ui/icons';
import { Grid, GridItem } from '@chakra-ui/react';

import userImg from '~/assets/images/user.webp';
import { Paths } from '~/constants/path.ts';
import { UserProps } from '~/types/user.ts';

import { HomeSvg } from '../icons/home-svg.tsx';
import { SearchSvg } from '../icons/search-svg.tsx';
import { WriteSvg } from '../icons/write-svg.tsx';
import { FooterBtn } from './footer-btn.tsx';

const footerButtons = [
    { text: 'Главная', icon: <HomeSvg />, path: Paths.R_SWITCHER },
    { text: 'Поиск', icon: <SearchSvg />, path: Paths.R_SWITCHER },
    { text: 'Записать', icon: <WriteSvg />, path: Paths.NEW_RECIPE },
];

const user: UserProps = {
    firstName: 'Екатерина',
    lastName: 'Константинопольская',
    login: '@bake_and_pie',
    imageUrl: userImg,
};

export const Footer = () => {
    // TODO: заменить на селектор когда будет коллекция пользователей
    const { firstName, lastName, imageUrl } = user;

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
                    icon={<Avatar src={imageUrl} name={`${firstName} ${lastName}`} />}
                    isProfile={true}
                    path={Paths.R_SWITCHER}
                />
            </GridItem>
        </Grid>
    );
};
