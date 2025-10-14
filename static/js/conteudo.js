document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("#conteudo .collapsible");
  
  try {
    // Lê o JSON
    const resposta = await fetch("static/dados/conteudo.json");
    const dados = await resposta.json();

    // Monta o HTML dinâmico
    container.innerHTML = dados.map(item => `
      <li>
        <div class="collapsible-header">
          <i class="material-icons">book</i>${item.titulo}
        </div>
        <div class="collapsible-body">
          <span>
            <p>Material para Leitura: <a href="${item.conteudo_link}" target="_blank">${item.conteudo_label}</a></p>
            <p>Atividade para a Equipe: <a href="${item.atividade_link}" target="_blank">${item.atividade_label}</a></p>
            
            <p>${item.descricao}</p>

            <p>Vídeo Auxiliar: <a href="${item.video}" target="_blank">preparando ...</a></p>
            
          </span>
        </div>
      </li>
    `).join('');

    // Inicializa o efeito collapsible do Materialize
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);

  } catch (erro) {
    console.error("Erro ao carregar o conteúdo:", erro);
    container.innerHTML = "<p>Erro ao carregar o conteúdo.</p>";
  }
});
