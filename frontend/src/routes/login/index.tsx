import { $, type QRL, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues, SubmitHandler } from '@modular-forms/qwik';
import { FormError, useForm, valiForm$ } from '@modular-forms/qwik';
import { email, type Input, minLength, object, string } from 'valibot';
import { api } from "~/lib/adapter";
import type { Resolve } from "~/type";
 
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
type ResponseData = Resolve<ReturnType<typeof api.login>>['data'];

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  email: 'test@example.com',
  password: '',
}));

export default component$(() => {
  const [loginForm, { Form, Field }] = useForm<LoginForm, ResponseData>({
    loader: useFormLoader(),
    validate: valiForm$(LoginSchema),
  });

  const handleSubmit: QRL<SubmitHandler<LoginForm>> = $(async (values) => {
    // Runs on client
    const {data} = await api.login(values).catch(() => {
      throw new FormError<LoginForm>('login failed');
    })
    window.localStorage.setItem('user', JSON.stringify({token: data.token}));
    window.location.href = '/';
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
                email:<input {...props} type="email" value={field.value} />
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <Field name="password">
            {(field, props) => (
              <div>
                password:<input {...props} type="password" value={field.value} />
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <div>{loginForm.response.message}</div>
          <button type="submit">Login</button>
        </Form>
        </div>
      </div>
    </main>
  );
});


