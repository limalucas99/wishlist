import { app } from "@/main/app";
import env from "@/main/config/env";

app.listen(env.port, () => {
  console.log(`Wishlist BFF rodando na porta ${env.port}`);
  console.log(`Swagger disponível em http://localhost:${env.port}/api/docs`);
});
