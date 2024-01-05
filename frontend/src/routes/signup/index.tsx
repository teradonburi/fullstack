import { $, type QRL, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues, SubmitHandler } from '@modular-forms/qwik';
import { FormError, useForm, valiForm$ } from '@modular-forms/qwik';
import { email, type Input, minLength, object, string } from 'valibot';
import { api } from "~/lib/adapter";
import type { Resolve } from "~/type";
 
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
type ResponseData = Resolve<ReturnType<typeof api.exampleSignupApi>>['data'];
 
export const useFormLoader = routeLoader$<InitialValues<SignupForm>>(() => ({
  name: 'test',
  email: 'test@example.com',
  password: '',
}));
 
export default component$(() => {
  const [signupForm, { Form, Field }] = useForm<SignupForm, ResponseData>({
    loader: useFormLoader(),
    validate: valiForm$(SignupSchema),
  });

  const handleSubmit: QRL<SubmitHandler<SignupForm>> = $(async (values) => {
    // Runs on client      
    const {data} = await api.exampleSignupApi(values)
      .catch((error) => {
        if (error.response?.status === 409) {
          throw new FormError<SignupForm>('An error has occurred.', {
            email: error.response.data.message,
          });
        } else {
          throw new FormError<SignupForm>(error.response.data.message);
        }
      })
    localStorage.setItem('user', JSON.stringify({token: data.token}));
    location.href = '/';
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
                name:<input {...props} type="email" value={field.value} />
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
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
          <div>{signupForm.response.message}</div>
          <button type="submit">Signup</button>
        </Form>
        </div>
      </div>
    </main>
  );
});


