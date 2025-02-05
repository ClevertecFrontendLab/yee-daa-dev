import { Paths } from './path.ts';

type SectionHeaderInfo = {
    title: string;
    description?: string;
};

export const sectionHeaderInfo: Record<string, SectionHeaderInfo> = {
    [Paths.R_SWITCHER]: {
        title: 'Приятного аппетита!',
    },
    vegan: {
        title: 'Веганская кухня',
        description:
            'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
    },
    ['the-juiciest']: {
        title: 'Самое сочное',
    },
};
