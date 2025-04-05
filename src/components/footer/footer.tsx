import { Avatar } from '@chakra-ui/icons';
import { Grid, GridItem } from '@chakra-ui/react';

import userImg from '~/assets/images/user.webp';
import { UserProps } from '~/types/user.ts';

import { HomeSvg } from '../icons/home-svg.tsx';
import { SearchSvg } from '../icons/search-svg.tsx';
import { WriteSvg } from '../icons/write-svg.tsx';
import { FooterBtn } from './footer-btn.tsx';

const icons = [<HomeSvg />, <SearchSvg />, <WriteSvg />];
const texts = ['Главная', 'Поиск', 'Записать'];

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
            {icons.map((icon, i) => (
                <GridItem key={i}>
                    <FooterBtn text={texts[i]} icon={icon} />
                </GridItem>
            ))}
            <GridItem key={icons.length + 1}>
                <FooterBtn
                    text='Мой профиль'
                    icon={<Avatar src={imageUrl} name={`${firstName} ${lastName}`} />}
                    isProfile={true}
                />
            </GridItem>
        </Grid>
    );
};
