fetch("http://localhost:3000/destinos")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erro ao carregar destinos");
    }
    return response.json();
  })
  .then((destinos) => {
    console.log("Destinos carregados:", destinos);
    const container = document.getElementById("cards-container");
    container.innerHTML = ""; // Limpa o container antes de adicionar novos cards

    destinos.forEach((destino) => {
      const card = document.createElement("div");
      card.className = "card-turistico";

      // Verifique se "conteudo" existe antes de tentar usar substring
      const resumoConteudo = destino.conteudo
        ? destino.conteudo.substring(0, 100) + "..."
        : destino.resumo;

      card.innerHTML = `
        <img src="img/${destino.imagem}" alt="${destino.titulo}" loading="lazy">
        <h3>${destino.titulo}</h3>
        <p>${resumoConteudo}</p>
        <a href="detalhes.html?id=${destino.id}" class="btn-detalhes">Ver detalhes</a>
      `;
      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Erro:", error);
    const container = document.getElementById("cards-container");
    container.innerHTML =
      '<p class="erro-message">Falha ao carregar destinos. Tente recarregar a página.</p>';
  });
