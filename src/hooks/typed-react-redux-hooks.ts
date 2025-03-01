import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { store } from '~/redux/configure-store';
import { AppState } from '~/types/store';

type ApplicationDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<ApplicationDispatch>();
