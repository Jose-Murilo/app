import { Elysia, t } from "elysia";
// import { swagger } from '@elysiajs/swagger'

const app = new Elysia().get("/", () => "Hello Elysia")

app
  .onError(({ code }) => {
    if (code === 'NOT_FOUND') return 'Route not found :('
  })
  //state é uma função para atribuir um valor inicial a store , que pode sofrer mutação posteriormente.
  .state('version', 1)

  //store é uma representação de um objeto mutável global de fonte única de verdade para todo o aplicativo Elysia.
  .get('/', ({ set, store: { version } }) => {
    // set.status = 'Unauthorized'
    set.headers['Content-Type'] = 'text/plain'

    return version

    // new Response('hi')
  })
  .post('/hello/:id', ({ params: { id }, body }) => {
    const { name } = body
    console.log(name)
    // return name
  }, {
    params: t.Object({
      id: t.Numeric()
    }),
    body: t.Object({
      name: t.String()
    })
  })

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


app.handle(new Request('http://localhost/hello/3', {
  method: 'POST',
  body: JSON.stringify({
    name: "Murilo"
  })
})).then(console.log)

app.listen({
  port: 3333,
});