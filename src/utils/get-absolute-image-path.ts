import { API_IMGS_BASE } from '~/redux/api/constants';

export const getAbsoluteImagePath = (url?: string) => (url ? `${API_IMGS_BASE}${url}` : '');
