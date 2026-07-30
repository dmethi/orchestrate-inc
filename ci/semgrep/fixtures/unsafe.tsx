declare const element: HTMLElement;

let assign = Object.assign;
assign(element, { innerHTML: location.hash });

let send = fetch;
send("/collect", { method: "POST" });

window.fetch("/collect", { method: "POST" });
globalThis.fetch("/collect", { method: "POST" });
const windowSend = window.fetch;
windowSend("/collect", { method: "POST" });
const globalSend = globalThis.fetch;
globalSend("/collect", { method: "POST" });

let storage = localStorage;
storage.setItem("visitor", "tracked");

window.localStorage.setItem("visitor", "tracked");
globalThis.sessionStorage.setItem("visitor", "tracked");
const windowStorage = window.sessionStorage;
windowStorage.setItem("visitor", "tracked");
const globalStorage = globalThis.localStorage;
globalStorage.setItem("visitor", "tracked");

let runtime = import.meta.env;
const endpoint = runtime.VITE_API_URL;

const create = React.createElement;
const form = create("form", null);
void endpoint;
void form;
export {};
