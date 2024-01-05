import { useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { api } from "~/lib/adapter";
import type { Resolve } from "~/type";

type User = Resolve<ReturnType<typeof api.loadUser>>['data'];

export function useAuth() {
  const user = useSignal<User>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const userObj = JSON.parse(window.localStorage.getItem('user') ?? '{}');
    if (!userObj?.token) return;
    const {data} = await api.loadUser({headers: {Authorization: `Bearer ${userObj.token}`}})
    user.value = data;
  })

  return user.value
}
