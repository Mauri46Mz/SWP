import { writable } from "svelte/store";

export const session = writable(localStorage.session ? JSON.parse(localStorage.session) : null);

session.subscribe(value => {
    localStorage.session = JSON.stringify(value);
});

export const theme = writable(localStorage.theme || "dark");

// theme.subscribe(value => {
//     localStorage.theme = JSON.stringify(value);
// });

export const ALERT_TYPE = {
    DANGER: "danger",
    INFO: "info",
    SUCCSESS: "success",
    NONE: "none"
    
}

Object.freeze(ALERT_TYPE);

export const alertMessage = writable("");
export const alertType = writable("");

export const displayAlert = (message, type = ALERT_TYPE.NONE, resetTime) => {
    alertMessage.set(message);
    alertType.set(type);
    if (resetTime) {
        setTimeout(() => {
            alertMessage.set("");
            alertType.set("");
        }, resetTime);
    }
}