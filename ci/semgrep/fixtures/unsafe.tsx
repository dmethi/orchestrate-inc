declare const element: HTMLElement;
element.innerHTML = location.hash;
fetch("/collect", { method: "POST" });
localStorage.setItem("visitor", "tracked");
const endpoint = import.meta.env.VITE_API_URL;
const form = <form><input name="email" /></form>;
void endpoint;
void form;
