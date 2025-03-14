import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AccordionState = {
    activeIndex: number;
};

const initialState: AccordionState = {
    activeIndex: -1,
};

export const accordionSlice = createSlice({
    name: 'accordion',
    initialState,
    reducers: {
        setActiveIndex(state, { payload }: PayloadAction<number>) {
            state.activeIndex = payload;
        },
        resetAccordion() {
            return initialState;
        },
    },
    selectors: {
        selectActiveIndex: (state) => state.activeIndex,
    },
});

export const { selectActiveIndex } = accordionSlice.selectors;

export const { resetAccordion, setActiveIndex } = accordionSlice.actions;

export const accordionReducer = accordionSlice.reducer;
