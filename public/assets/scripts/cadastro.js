document.addEventListener('DOMContentLoaded', function () {
  // Função para carregar os destinos cadastrados
  async function carregarDestinos() {
    const response = await fetch("http://localhost:3000/destinos");
    const destinos = await response.json();
    
    const tbody = document.querySelector("#listaDestinos tbody");
    tbody.innerHTML = ""; // Limpar a lista antes de adicionar novos destinos

    destinos.forEach(destino => {
      const destinoRow = document.createElement("tr");

      // Adicionando os dados na tabela
      destinoRow.innerHTML = `
        <td>${destino.titulo}</td>
        <td>${destino.categoria}</td>
        <td>${destino.conteudo}</td>
        <td>
          <button class="editar">Editar</button>
          <button class="excluir">Excluir</button>
        </td>
      `;

      // Selecionar os botões de editar e excluir dentro de cada linha
      const editarBtn = destinoRow.querySelector(".editar");
      const excluirBtn = destinoRow.querySelector(".excluir");

      // Adicionar evento de clique para o botão Editar
      editarBtn.addEventListener("click", function () {
        editarDestino(destino.id);
      });

      // Adicionar evento de clique para o botão Excluir
      excluirBtn.addEventListener("click", function () {
        excluirDestino(destino.id);
      });

      // Adicionar a linha na tabela
      tbody.appendChild(destinoRow);
    });
  }

  // Função para carregar os dados de um destino para edição
  async function editarDestino(id) {
    const response = await fetch(`http://localhost:3000/destinos/${id}`);
    const destino = await response.json();

    // Preencher o formulário com os dados do destino
    document.getElementById("titulo").value = destino.titulo;
    document.getElementById("descricao").value = destino.descricao;
    document.getElementById("imagem").value = destino.imagem;
    document.getElementById("conteudo").value = destino.conteudo;
    document.getElementById("categoria").value = destino.categoria;
    document.getElementById("destacar").checked = destino.destacar;

    // Mudar o botão para "Atualizar" e salvar o ID no botão
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.textContent = "Atualizar";
    submitBtn.dataset.idDestino = id;  // Salva o ID do destino para atualizar
  }

  // Função para excluir um destino
  async function excluirDestino(id) {
    if (confirm("Tem certeza que deseja excluir este destino?")) {
      const response = await fetch(`http://localhost:3000/destinos/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        alert("Destino excluído com sucesso!");
        carregarDestinos(); // Recarregar a lista de destinos após a exclusão
      } else {
        alert("Erro ao excluir destino.");
      }
    }
  }

  // Função para cadastrar ou atualizar um destino
  document.getElementById("form-cadastro").addEventListener("submit", async function(event) {
    event.preventDefault();  // Impede o envio padrão do formulário

    const novoDestino = {
      titulo: document.getElementById("titulo").value,
      descricao: document.getElementById("descricao").value,
      imagem: document.getElementById("imagem").value,
      conteudo: document.getElementById("conteudo").value,
      categoria: document.getElementById("categoria").value,
      destacar: document.getElementById("destacar").checked
    };

    const idDestino = document.getElementById("submitBtn").dataset.idDestino; // Verifica se está em modo de edição

    let response;
    if (idDestino) {
      // Se tem ID, atualiza o destino (PUT)
      response = await fetch(`http://localhost:3000/destinos/${idDestino}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoDestino)
      });
      document.getElementById("submitBtn").textContent = "Cadastrar"; // Reseta o texto do botão
      delete document.getElementById("submitBtn").dataset.idDestino; // Limpa o ID do botão
    } else {
      // Se não tem ID, cria um novo destino (POST)
      response = await fetch("http://localhost:3000/destinos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoDestino)
      });
    }

    if (response.ok) {
      alert(idDestino ? "Destino atualizado com sucesso!" : "Destino cadastrado com sucesso!");
      window.location.href = "index.html"; // Redireciona para a página inicial
    } else {
      alert("Erro ao cadastrar/atualizar destino.");
    }
  });

  // Carregar os destinos ao carregar a página
  carregarDestinos(); // Chama a função para carregar os destinos
});
