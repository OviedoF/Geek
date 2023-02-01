import { ACTIVE_SCREEN, DESACTIVE_SCREEN, RESET_ALL } from "../types";

export const activeScreen = (object) => ({
    type: ACTIVE_SCREEN,
    payload: object
});

export const desactiveScreen = (screen) => ({
    type: DESACTIVE_SCREEN,
    payload: screen
});

export const resetAllScreens = () => ({
    type: RESET_ALL
});