import axios from "axios";
import { useCallback } from "react";

const fetcher = <T = any>(url: string) => axios.get(url).then((res) => res.data as T);

export interface Todo {
    userId: number,
	id: number,
	title: number,
	completed: boolean
}

export const useTodoService = () => {
  const getTodo = useCallback(() => fetcher<Todo>('https://jsonplaceholder.typicode.com/todos/13'), []);

  return { getTodo };
};
