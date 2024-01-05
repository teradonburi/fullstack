import { $, type QRL, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues, SubmitHandler } from '@modular-forms/qwik';
import { formAction$, useForm, valiForm$ } from '@modular-forms/qwik';
import { email, type Input, minLength, object, string } from 'valibot';
import { api } from "~/lib/adapter";
 
const SignupSchema = object({
  name: string([
    minLength(1, 'Please enter your name.'),
  ]),
  email: string([
    minLength(1, 'Please enter your email.'),
    email('The email address is badly formatted.'),
  ]),
  password: string([
    minLength(1, 'Please enter your password.'),
    minLength(8, 'Your password must have 8 characters or more.'),
  ]),
});
 
type SignupForm = Input<typeof SignupSchema>;
 
export const useFormLoader = routeLoader$<InitialValues<SignupForm>>(() => ({
  name: 'test',
  email: 'test@example.com',
  password: '',
}));
 
export const useFormAction = formAction$<SignupForm>(async (values) => {
  await api.exampleSignupApi(values)
}, valiForm$(SignupSchema));

export default component$(() => {
  const [, { Form, Field }] = useForm<SignupForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(SignupSchema),
  });

  const handleSubmit: QRL<SubmitHandler<SignupForm>> = $((values) => {
    // Runs on client
    console.log(values);
  });


  return (
    <main 
      style={{height: '100vh'}}
    >
      <div style={{display: 'flex', background: 'grey', width: '100vw', height: '100vh', contain: 'strict'}}>
        <div style={{margin: 'auto', width: 'fit-content'}}>
        <Form onSubmit$={handleSubmit}>
          <Field name="name">
            {(field, props) => (
              <div>
                <input {...props} type="email" value={field.value} />
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
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
          <button type="submit">Signup</button>
        </Form>
        </div>
      </div>
    </main>
  );
});


