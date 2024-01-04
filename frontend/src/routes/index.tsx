import { $, type QRL, component$, useOnWindow, useSignal, useStyles$, useResource$, Resource } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import styles from './styles.css?inline';
import InfiniteList from '~/components/infinite-list/inifinite-list';
import { DefaultApi } from "~/typescript-axios/api";
import { Configuration } from "~/typescript-axios";
import type { InitialValues, SubmitHandler } from '@modular-forms/qwik';
import { formAction$, useForm, valiForm$ } from '@modular-forms/qwik';
import { email, type Input, minLength, object, string } from 'valibot';
 
const api = new DefaultApi(new Configuration({
  basePath: 'http://localhost:3000',
}))

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const usePageLoad = routeLoader$(async () => {
  const api = new DefaultApi(new Configuration({
    basePath: 'http://localhost:3000',
  }))
  const {data} = await api.exampleApi()
  return data
});

function useInLoad() {
  const onload = useSignal(false);
  useOnWindow(
    'load',
    $(() => {
      onload.value = true;
    })
  );
  return onload.value;
}

const LoginSchema = object({
  email: string([
    minLength(1, 'Please enter your email.'),
    email('The email address is badly formatted.'),
  ]),
  password: string([
    minLength(1, 'Please enter your password.'),
    minLength(8, 'Your password must have 8 characters or more.'),
  ]),
});
 
type LoginForm = Input<typeof LoginSchema>;
 
export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  email: 'test@example.com',
  password: '',
}));
 
export const useFormAction = formAction$<LoginForm>(async (values) => {
  await api.exampleLoginApi(values)
}, valiForm$(LoginSchema));

export default component$(() => {
  useStyles$(styles);
  const onload = useInLoad()
  const PER_PAGE = 100
  const loadMore = useSignal(true);
	const itemsSig = useSignal([...new Array(PER_PAGE).keys()]);
  const pageData = usePageLoad(); 
  const [, { Form, Field }] = useForm<LoginForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(LoginSchema),
  });

  const handleSubmit: QRL<SubmitHandler<LoginForm>> = $((values) => {
    // Runs on client
    console.log(values);
  });

  const user = useResource$<{email: string}>(async ({ track }) => {
    // it will run first on mount (server), then re-run whenever prNumber changes (client)
    // this means this code will run on the server and the browser
    track(() => user.value);
    // const {data} = await api.exampleApi()
    return { email: 'test@example.com' }
  });

  return (
    <main 
      style={{height: '100vh'}}
    >
      <div style={{display: 'flex', background: 'grey', width: '100vw', height: '100vh', contain: 'strict'}}>
        <div style={{margin: 'auto', width: 'fit-content'}}>
          <Form onSubmit$={handleSubmit}>
            <Field name="email">
              {(field, props) => (
                <div>
                  <input {...props} type="email" value={field.value} />
                  {field.error && <div>{field.error}</div>}
                </div>
              )}
            </Field>
            <Field name="password">
              {(field, props) => (
                <div>
                  <input {...props} type="password" value={field.value} />
                  {field.error && <div>{field.error}</div>}
                </div>
              )}
            </Field>
            <button type="submit">Login</button>
          </Form>
          <Resource
            value={user}
            onPending={() => <p>Loading...</p>}
            onResolved={(user) => <div>{user.email}</div>}
          />
        </div>
      </div>
      {onload && 
        <InfiniteList
          loadMore={loadMore.value}
          onLoadMore$={$(async () => {
            itemsSig.value = [...itemsSig.value, ...new Array(PER_PAGE).keys()];
            loadMore.value = itemsSig.value.length < 1000;
          })}
        >
          {itemsSig.value.map((_, key) => (
            <div 
              key={key} 
              style={{
                contentVisibility: 'auto',
                containIntrinsicSize: '0 30px',
              }}
            >
              {pageData.value.message}{key}
            </div>
          ))}
          <div q:slot='loading' >
            Loading...
          </div>
        </InfiniteList>
      }
    </main>
  );
});


export const head: DocumentHead = {
  title: "Create Qwik App",
  meta: [
    {
      name: "description",
      content: "Generated by create next app",
    },
  ],
};
