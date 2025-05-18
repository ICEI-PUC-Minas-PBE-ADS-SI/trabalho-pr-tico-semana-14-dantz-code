document.addEventListener('DOMContentLoaded', () => {
  const id = new URLSearchParams(window.location.search).get('id');  // Captura o ID da URL

  // Requisição para buscar os detalhes do destino
  fetch(`http://localhost:3000/destinos/${id}`)
    .then(response => {
      console.log('Resposta do servidor:', response);  // Exibe a resposta bruta da API
      if (!response.ok) throw new Error("Destino não encontrado");
      return response.json();
    })
    .then(destino => {
      console.log('Detalhes do destino carregados:', destino);  // Exibe os detalhes carregados

      // Localiza o container onde os detalhes serão inseridos
      const container = document.getElementById('detalhes-container');

      // Insere o conteúdo no HTML
      container.innerHTML = `
        <h1>${destino.titulo}</h1>
        <img src="img/${destino.imagem}" alt="${destino.titulo}" loading="lazy">
        <p>${destino.conteudo}</p>
        <a href="index.html">Voltar</a>
      `;
    })
    .catch(error => {
      // Se ocorrer algum erro, exibe a mensagem
      console.error('Erro:', error);
      const container = document.getElementById('detalhes-container');
      container.innerHTML = `<p class="erro-message">Falha ao carregar os detalhes. Tente recarregar a página.</p>`;
    });
});
