import { Configuration, DefaultApi } from "~/typescript-axios";

export const api = new DefaultApi(new Configuration({
  basePath: 'http://localhost:3000',
}))
