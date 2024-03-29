export type Resolve<T extends Promise<any>> = T extends Promise<infer P>
  ? P
  : never