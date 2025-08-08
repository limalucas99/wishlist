import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret-jwt-key";

const payload = {
  customerId: "507f1f77bcf86cd799439011",
  email: "lucas@example.com",
  name: "Lucas Lima",
};

const token = jwt.sign(payload, secret, { expiresIn: "1h" });

console.log("Token JWT gerado:");
console.log(token, "\n");
console.log("Para usar no Swagger ou Postman:");
console.log(`Authorization: Bearer ${token}\n`);
console.log("Dados do cliente no token:");
console.log(JSON.stringify(payload, null, 2));
