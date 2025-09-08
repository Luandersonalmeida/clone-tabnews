import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />

      <h1>Database</h1>
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando ...";
  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Ultima atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let infoDatabase = "Carregando ...";

  if (!isLoading && data) {
    const infoMaxConnections = data.dependencies.database.max_connections;
    const infoOpenedConnection = data.dependencies.database.opened_connections;
    const infoVersion = data.dependencies.database.version;
    console.log(data.dependencies);

    infoDatabase = (
      <div>
        <li>
          <strong>Max Connections: {infoMaxConnections}</strong>
        </li>
        <li>
          <strong>Opened Connections: {infoOpenedConnection}</strong>
        </li>
        <li>
          <strong>Version: {infoVersion}</strong>
        </li>
      </div>
    );
    return infoDatabase;
  }
}
