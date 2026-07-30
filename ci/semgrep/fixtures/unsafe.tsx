declare const element: HTMLElement;

const assign = Object.assign;
assign(element, { innerHTML: location.hash });

const send = fetch;
send("/collect", { method: "POST" });

const storage = localStorage;
storage.setItem("visitor", "tracked");

const runtime = import.meta.env;
const endpoint = runtime.VITE_API_URL;

const create = React.createElement;
const form = create("form", null);
void endpoint;
void form;
export {};
