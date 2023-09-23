type Todo = { id: number; name: string };
const todos: Todo[] = [];

export default function TodoList(props: {
    todos: Todo[];
}): React.JSX.Element {
  return (
    <ul>
      {props.todos.length
        ? props.todos.map((todo) => <li key={`todo-${todo.id}`}>{todo.name}</li>)
        : "No todos found"}
    </ul>
  );
}