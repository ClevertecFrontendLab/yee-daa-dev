import cookies from '../assets/icons/cookies.png';
import drink from '../assets/icons/drink.png';
import first from '../assets/icons/first.png';
import grill from '../assets/icons/grill.png';
import health from '../assets/icons/health.png';
import kids from '../assets/icons/kids.png';
import national from '../assets/icons/national.png';
import salad from '../assets/icons/salad.png';
import sauce from '../assets/icons/sauce.png';
import second from '../assets/icons/second.png';
import vegan from '../assets/icons/vegan.png';
import zagotovki from '../assets/icons/zagotovki.png';
import zakuski from '../assets/icons/zakuski.png';

export const categoriesMap: Record<string, string> = {
    ['Салаты']: salad,
    ['Закуски']: zakuski,
    ['Первые блюда']: first,
    ['Вторые блюда']: second,
    ['Десерты и выпечка']: cookies,
    ['Блюда на гриле']: grill,
    ['Веганская кухня']: vegan,
    ['Детские блюда']: kids,
    ['Лечебное питание']: health,
    ['Национальные']: national,
    ['Соусы']: sauce,
    ['Напитки']: drink,
    ['Домашние заготовки']: zagotovki,
};
