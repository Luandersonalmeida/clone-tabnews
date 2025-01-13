import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const postgresVersion = await database.query("SHOW server_version;");
  response.status(200).json({
    updated_at: updatedAt,
    postgres_version: postgresVersion.rows[0].server_version,
  });
  console.log("teste", postgresVersion.rows[0].server_version);
}

export default status;
