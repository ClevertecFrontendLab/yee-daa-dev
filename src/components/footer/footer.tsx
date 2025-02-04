import { Grid, GridItem, Text } from '@chakra-ui/react';

import userImg from '../../assets/images/user.webp';
import { UserProps } from '../../types/user.ts';
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
};

export const Footer = () => {
    // TODO: заменить на селектор
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { firstName, lastName, login, imageUrl } = user;

    // TODO: когда будет доступ к картинкам - реализовать логику с подставление заглушки
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const imagePlug = (
        <Text fontSize='xl' color='black' fontWeight={500}>
            {firstName[0].concat(lastName[0])}
        </Text>
    );

    return (
        <Grid templateColumns='repeat(4, 1fr)' height='100%' templateRows='1fr'>
            {icons.map((icon, i) => (
                <GridItem>
                    <FooterBtn text={texts[i]} icon={icon} />
                </GridItem>
            ))}
            <GridItem>
                <FooterBtn
                    text={'Мой профиль'}
                    icon={<img src={userImg} alt='user-image' />}
                    isProfile={true}
                />
            </GridItem>
        </Grid>
    );
};
