import { writable } from "svelte/store";

export const session = writable(localStorage.session ? JSON.parse(localStorage.session) : null);

session.subscribe(value => {
    localStorage.session = JSON.stringify(value);
});

export const theme = writable(localStorage.theme ? JSON.parse(localStorage.theme) : null);

theme.subscribe(value => {
    localStorage.theme = JSON.stringify(value);
});