document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("#conteudo .collapsible");
  
  try {
    // Lê o JSON
    const resposta = await fetch("static/dados/conteudo.json");
    const dados = await resposta.json();

    // Monta o HTML dinâmico
    container.innerHTML = dados.map(item => {
      // Define o texto do questionário conforme o valor
      let questionarioHTML = '';
      if (item.questionario_link === "None") {
        questionarioHTML = `<p style="color: gray;"> <em>O questionário de fixação do conteúdo está sendo preparado.</em></p>`;
      } else if (item.questionario_link === "-") {
        questionarioHTML = `<p style="color: #f8a5a5;"> <em>Este conteúdo não possui questionário.</em></p>`;
      } else {
        questionarioHTML = `<p>📋 <a href="${item.questionario_link}" target="_blank" style="color: #43b02a; text-decoration: none;">Acessar Questionário Individual de Fixação </a></p>`;
      }

      return `
        <li>
          <div class="collapsible-header">
            <i class="material-icons">book</i>${item.titulo}
          </div>
          <div class="collapsible-body">
            <span>
              <p>📄 Material para Leitura: <a href="${item.conteudo_link}" target="_blank" style="color: #05a79a; text-decoration: none;">${item.conteudo_label}</a></p>
              <div style="margin-left: 30px;">
                ${questionarioHTML}
              </div>

              <p>📝 Atividade para a Equipe: <a href="${item.atividade_link}" target="_blank" style="color: #d0006f; text-decoration: none;">${item.atividade_label}</a></p>
              
              <p>${item.descricao}</p>
            </span>
          </div>
        </li>
      `;
    }).join('');

    // Inicializa o efeito collapsible do Materialize
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);

  } catch (erro) {
    console.error("Erro ao carregar o conteúdo:", erro);
    container.innerHTML = "<p>Erro ao carregar o conteúdo.</p>";
  }
});
