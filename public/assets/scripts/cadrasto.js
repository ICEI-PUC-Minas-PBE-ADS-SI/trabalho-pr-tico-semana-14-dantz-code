const formCadastro = document.getElementById("form-cadastro");

formCadastro.addEventListener("submit", async function(event) {
  event.preventDefault();

  const novoDestino = {
    titulo: document.getElementById("titulo").value,
    descricao: document.getElementById("descricao").value,
    imagem: document.getElementById("imagem").value,
    conteudo: document.getElementById("conteudo").value,
    categoria: document.getElementById("categoria").value,
    destacar: document.getElementById("destacar").checked
  };

  const response = await fetch("http://localhost:3000/destinos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(novoDestino)
  });

  if (response.ok) {
    alert("Destino cadastrado com sucesso!");
    window.location.href = "index.html";
  } else {
    alert("Erro ao cadastrar destino.");
  }
});
