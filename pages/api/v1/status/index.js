import database from "infra/database.js";

async function status(request, response) {
  console.log(database);
  const result = await database.query("SELECT 1 + 1 as sum;");
  response.status(200).json({ chave: "Testes response!" });
  console.log(result.rows);
}

export default status;
