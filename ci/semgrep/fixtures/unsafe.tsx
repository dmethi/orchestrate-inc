declare const element: HTMLElement;

let assign = Object.assign;
assign(element, { innerHTML: location.hash });

let send = fetch;
send("/collect", { method: "POST" });

let storage = localStorage;
storage.setItem("visitor", "tracked");

let runtime = import.meta.env;
const endpoint = runtime.VITE_API_URL;

const create = React.createElement;
const form = create("form", null);
void endpoint;
void form;
export {};
