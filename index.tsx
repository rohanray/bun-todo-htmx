import { renderToString } from "react-dom/server";
import TodoList from "./todo";

const staticPath = "/static";
const js = Bun.file(`${staticPath}/js`)
const css = Bun.file(`${staticPath}/css`)

const server = Bun.serve({
  hostname: "localhost",
  port: 8181,
  fetch: fetchHandler,
});

console.log(`Bun Todo running on ${server.hostname}:${server.port}`);

type Todo = { id: number; name: string };
const todos: Todo[] = [];

async function fetchHandler(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname.includes("/static/")) {
    console.log("url.pathname::: ", url.pathname)
    return new Response(Bun.file("." + url.pathname))
  }

  if (url.pathname === "" || url.pathname === "/") {
    return new Response(Bun.file("index.html"));
  }

  if (url.pathname === "/todos" && request.method === "GET") {
    return new Response(renderToString(<TodoList todos={todos} />));
  }

  if (url.pathname === "/todos" && request.method === "POST") {
    const { todo } = await request.json();
    todos.push({
      id: todos.length + 1,
      name: todo,
    });
    return new Response(renderToString(<TodoList todos={todos} />));
  }

  return new Response("Not Found", { status: 404 });
}
