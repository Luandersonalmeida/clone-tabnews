function status(request, response) {
  response.status(200).json({ chave: "Testes response!" });
}

export default status;
