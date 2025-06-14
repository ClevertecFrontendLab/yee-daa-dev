import { icons } from '~/constants/icons';

export const CHART_BOX_VIEW = {
    bookmarks: {
        icon: icons['bookmarks'],
        colorChart: '#2DB100',
        title: 'сохранений',
    },
    likes: {
        icon: icons['likes'],
        colorChart: '#8C54FF',
        title: 'лайка',
    },
};

export const CHART_TICK_STYLES = { fill: '#000', fontSize: 14, fontWeight: 400 };
export const CHART_GRID_STYLES = {
    stroke: 'var(--black, #000)',
    strokeWidth: 0.5,
    opacity: 0.6068,
    strokeDasharray: '5 5',
};
