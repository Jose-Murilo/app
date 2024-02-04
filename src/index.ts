import { Elysia, t } from "elysia";
import { swagger } from '@elysiajs/swagger'

const app = new Elysia().get("/", () => "Hello Elysia")

app
  .use(swagger())
  .onError(({ code }) => {
    if (code === 'NOT_FOUND') return 'Route not found :('
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

app.listen(3000);