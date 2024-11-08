// Função para salvar os horários no localStorage com a data atual
function salvarHorario(horario) {
  const dataAtual = new Date().toLocaleDateString(); // Pega a data no formato local
  let horarios = JSON.parse(localStorage.getItem('horarios')) || [];

  // Verifica se já existe um registro para a data atual
  let registroDoDia = horarios.find(h => h.data === dataAtual);
  if (!registroDoDia) {
    // Se não existir, cria um novo registro para a data
    registroDoDia = { data: dataAtual, pontos: [] };
    horarios.push(registroDoDia);
  }

  // Adiciona o novo horário ao registro do dia
  registroDoDia.pontos.push(horario);

  localStorage.setItem('horarios', JSON.stringify(horarios));
}

// Função para exibir os horários salvos, agrupados por dia
function exibirHorarios() {
  const listaHorarios = document.getElementById('listaHorarios');
  listaHorarios.innerHTML = ''; // Limpa a lista antes de adicionar

  let horarios = JSON.parse(localStorage.getItem('horarios')) || [];

  horarios.forEach((registroDia) => {
    // Cria um item de título para o dia
    const diaHeader = document.createElement('h5');
    diaHeader.textContent = `Data: ${registroDia.data}`;
    listaHorarios.appendChild(diaHeader);

    // Cria uma lista para os horários do dia
    const ul = document.createElement('ul');
    ul.className = 'list-group';

    // Adiciona cada ponto registrado no dia
    registroDia.pontos.forEach((ponto, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = `Ponto ${index + 1}: ${ponto}`;
      ul.appendChild(li);
    });

    listaHorarios.appendChild(ul);
  });
}

// Modifique o evento para calcular o tempo restante após os horários da manhã
document.getElementById('manhaForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const horaEntradaManha = document.getElementById('entradaManha').value;
  let horaSaidaManha = document.getElementById('saidaManha').value;

  const tempoManha = calcularTempoTrabalhado(horaEntradaManha, horaSaidaManha);
  const tempoRestante = tempoRestanteParaCompletarJornada(tempoManha.horas, tempoManha.minutos);

  // Armazena o tempo restante globalmente para uso posterior
  horasRestantesGlobal = tempoRestante.horas;
  minutosRestantesGlobal = tempoRestante.minutos;

  // Remove o aviso do horário limite de saída da manhã
  document.getElementById('avisoHorarioLimite').textContent = '';

  // Mostra o tempo restante
  document.getElementById('tempoRestante').textContent = 
    `Faltam ${horasRestantesGlobal} hora(s) e ${minutosRestantesGlobal} minuto(s) para completar o dia.`;

  const horarioMinimoEntradaTarde = calcularHorarioMinimoEntradaTarde(horaSaidaManha);
  const horarioMaximoEntradaTarde = calcularHorarioMaximoEntradaTarde(horaSaidaManha);

  // Exibe o aviso sobre o intervalo
  document.getElementById('avisos').textContent = 
    `VOCÊ DEVE VOLTAR PARA BATER O PONTO DA TARDE ENTRE ${horarioMinimoEntradaTarde} E ${horarioMaximoEntradaTarde}.`;

  // Exibe o formulário para entrada da tarde
  document.getElementById('tardeForm').style.display = 'block';

  // Salva o ponto batido no localStorage
  salvarHorario(`Entrada: ${horaEntradaManha}, Saída: ${horaSaidaManha}`);
  exibirHorarios(); // Exibe os horários salvos
});

// No carregamento da página, exibe os horários salvos
document.addEventListener('DOMContentLoaded', exibirHorarios);
