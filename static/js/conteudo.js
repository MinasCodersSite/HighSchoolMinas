document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("#conteudo .collapsible");
  
  try {
    const resposta = await fetch("static/dados/conteudo.json");
    const dados = await resposta.json();

    container.innerHTML = dados.map((item, index) => {
      let questionarioHTML = '';
      if (item.questionario_link === "None") {
        questionarioHTML = `<p style="color: gray;"><em>O questionário de fixação do conteúdo está sendo preparado.</em></p>`;
      } else if (item.questionario_link === "-") {
        questionarioHTML = `<p style="color: #f8a5a5;"><em>Este conteúdo não possui questionário.</em></p>`;
      } else {
        questionarioHTML = `<p>📋 <a href="${item.questionario_link}" target="_blank" style="color: #43b02a; text-decoration: none;">Acessar Questionário Individual de Fixação</a></p>`;
      }

      return `
        <li>
          <div class="collapsible-header">
            <i class="material-icons">book</i>${item.titulo}
          </div>
          <div class="collapsible-body">
            <span>
              <p>📄 Material para Leitura: 
                <a href="${item.conteudo_link}" target="_blank" style="color: #05a79a; text-decoration: none;">
                  ${item.conteudo_label}
                </a>
              </p>

              <div style="margin-left: 30px;">
                ${questionarioHTML}
              </div>

              <p>📝 Atividade para a Equipe: 
                <a href="${item.atividade_link}" target="_blank" style="color: #d0006f; text-decoration: none;">
                  ${item.atividade_label}
                </a>
              </p>

              <p>${item.descricao}</p>

              <button class="btn-gerar" 
                      data-index="${index}" 
                      style="background-color: #c8fa84; color: #05a79a; border: none; border-radius: 8px; padding: 6px 12px; cursor: pointer; font-weight: 500; margin-top: 10px;">
                💬 Clique aqui para gerar uma mensagem para compartilhar o conteúdo
              </button>

              <div class="mensagem-box" 
                   id="mensagem-${index}" 
                   style="display: none; margin-top: 10px; padding: 10px; border-radius: 8px; background-color: #fff6f6; border: 1px solid #f8a5a5;">
                <textarea id="texto-${index}" 
                          readonly 
                          style="width: 100%; height: 100px; border: none; background: transparent; resize: none; font-family: inherit; font-size: 14px; color: #444;">
                </textarea>
                <button class="btn-copiar" 
                        data-index="${index}" 
                        style="background-color: #05a79a; color: white; border: none; border-radius: 6px; padding: 5px 10px; cursor: pointer; margin-top: 8px;">
                  📋 Copiar mensagem
                </button>
              </div>
            </span>
          </div>
        </li>
      `;
    }).join('');

    // Inicializa o efeito collapsible
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);

    // Gera e mostra a mensagem
    document.querySelectorAll(".btn-gerar").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = e.target.dataset.index;
        const item = dados[i];
        const mensagemBox = document.getElementById(`mensagem-${i}`);
        const textarea = document.getElementById(`texto-${i}`);

        const mensagem = 
        `📚 *${item.titulo}*

${item.descricao}

📄 Material:\n ${item.conteudo_link}` 
        + ((item.questionario_link !== "None" && item.questionario_link !== "-") 
            ? `\n\n📋 Questionário:\n ${item.questionario_link}` 
            : "") + `\n\n📝 Atividade:\n [substitua pelo link da cópia criada para a equipe editar]`;

                textarea.value = mensagem;
                mensagemBox.style.display = mensagemBox.style.display === "none" ? "block" : "none";
              });
            });

    // Copia mensagem ao clicar
    document.querySelectorAll(".btn-copiar").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = e.target.dataset.index;
        const texto = document.getElementById(`texto-${i}`);
        texto.select();
        document.execCommand("copy");
        btn.textContent = "✅ Copiado!";
        setTimeout(() => (btn.textContent = "📋 Copiar mensagem"), 2000);
      });
    });

  } catch (erro) {
    console.error("Erro ao carregar o conteúdo:", erro);
    container.innerHTML = "<p>Erro ao carregar o conteúdo.</p>";
  }
});

