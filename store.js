import { atom, Selector } from 'recoil';

export const farmState = atom({
    key: 'farmState', // unique ID (with respect to other atoms/selectors)
    default: 1, // default value (aka initial value)
});

export const workerState = atom({
    key: 'workerState', // unique ID (with respect to other atoms/selectors)
    default: 1, // default value (aka initial value)
});

export const adminFieldOwnerState = atom({
    key: 'adminFieldOwnerState', // unique ID (with respect to other atoms/selectors)
    default: 1, // default value (aka initial value)
});

export const farmList = atom({
    key: 'farmList', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});

export const userState = atom({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: 'loading', // default value (aka initial value)
});
export const userID = atom({
    key: 'userID', // unique ID (with respect to other atoms/selectors)
    default: 1, // default value (aka initial value)
});

export const todoListState = atom({
    key: "todoListState",
    default: [{ id: 1, text: "Study React JS", isCompleted: true },
    { id: 2, text: "Practice Recoil State Management", isCompleted: false }]
});