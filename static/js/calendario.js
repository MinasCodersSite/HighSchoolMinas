const container = document.getElementById('calendario-container');

const sedes = [
  "Florestal",
  "Florestal - Serafim",
  "Formiga",
  "Ouro Branco",
  "Viçosa",
  "Ribeirão das Neves"
];

const cores = {
  verdeClaro: "#c8fa84",
  verdeAgua: "#05a79a",
  verde: "#43b02a",
  amarelo: "#ffb81c",
  azul: "#0076cf",
  rosa: "#d0006f",
  laranja: "#ff7500",
  vermelho: "#ea4335"
};

async function renderCalendario(sede) {
  try {

    // Constrói o caminho do JSON baseado na sede
    const arquivo = sede.toLowerCase()
                        .replace(/ /g, '-')
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '') + '.json';
    const response = await fetch(`static/dados/calendarios/${arquivo}`);
    
    if (!response.ok) { // caso o arquivo não exista
      
      container.innerHTML = `
        <div class="calendario">
          <div class="sede-box">
            ${sedes.map(s => `<button class="${s === sede ? 'active' : ''}">${s}</button>`).join('')}
          </div>
          <p>O calendário da sede <strong>${sede}</strong> ainda não foi definido.</p>
        </div>
      `;
      
      // Reatribui eventos de clique aos botões
      document.querySelectorAll('.sede-box button').forEach(btn => {
        btn.addEventListener('click', () => renderCalendario(btn.textContent));
      });

      return; // Sai da função
    }

    const eventos = await response.json();

    const agora = new Date();
    const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());

    const emojiHoje = '⏰'; // emoji para indicar evento atual

    // Função para converter "dd/mm/yy" ou "dd/mm/yyyy" em Date
    function parseData(str) {
        const [dia, mes, ano] = str.split('/');
        const anoCompleto = ano.length === 2 ? '20' + ano : ano; // transforma 25 em 2025
        return new Date(anoCompleto, parseInt(mes) - 1, dia); // mês 0-based
    }

    // Função para verificar se hoje está no intervalo
    function estaNoIntervalo(dataStr) {
        if (!dataStr) return false;

        if (dataStr.includes('a')) { // intervalo
            const [inicioStr, fimStr] = dataStr.split('a').map(s => s.trim());
            const inicio = parseData(inicioStr);
            const fim = parseData(fimStr);
            return hoje >= inicio && hoje <= fim;
        } else if (dataStr.includes('/')){ // data única
            const data = parseData(dataStr);
            return hoje.toDateString() === data.toDateString();
        } else {
            return false
        }
    }

    // Cria HTML dos botões
    const botoesHTML = sedes.map(s => 
      `<button class="${s === sede ? 'active' : ''}">${s}</button>`
    ).join('');

    // Cria HTML da tabela
    const tabelaHTML = `
      <table style="font-family: Arial, sans-serif; border-collapse: collapse; width: 100%; margin-bottom: 15px; font-weight: bold;">
        <thead style="background-color: #05a79a; color: white;">
          <tr><th style="width: 25%;">Data</th><th style="width: 75%;">Conteúdo</th></tr>
        </thead>
        <tbody>
          ${eventos.map(ev => `
            <tr style="background-color: ${ev.cor ? cores[ev.cor] : 'transparent'}">
              
              <td>${estaNoIntervalo(ev.data) ? emojiHoje + ' ' : ''}${ev.data}</td>
              <td>${ev.conteudo}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    // Insere tudo no container
    container.innerHTML = `
      <div class="calendario">

        <div class="sede-box">${botoesHTML} </div>

        ${tabelaHTML}

        <p>* Sujeito à Alteração!</p>

      </div>
    `;

    // Adiciona eventos de clique aos botões
    document.querySelectorAll('.sede-box button').forEach(btn => {
      btn.addEventListener('click', () => {
        renderCalendario(btn.textContent);
      });
    });

  } catch (err) {
    container.innerHTML = `
        <div class="sede-box">
            ${sedes.map(s => `<button class="${s === sede ? 'active' : ''}">${s}</button>`).join('')}
        </div>

        <p>Erro ao carregar o calendário da sede <strong>${sede}</strong>.</p>
    `;
    console.error(err);
  }
}

// Renderiza a sede padrão
renderCalendario('Florestal');


