import { store } from '~/redux/configure-store';

export type AppState = ReturnType<typeof store.getState>;
