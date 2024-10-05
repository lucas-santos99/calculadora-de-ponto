// Função para salvar os horários no localStorage
function salvarHorario(horario) {
  let horarios = JSON.parse(localStorage.getItem('horarios')) || [];
  horarios.push(horario);
  localStorage.setItem('horarios', JSON.stringify(horarios));
}

// Função para exibir os horários salvos
function exibirHorarios() {
  const listaHorarios = document.getElementById('listaHorarios');
  listaHorarios.innerHTML = ''; // Limpa a lista antes de adicionar

  let horarios = JSON.parse(localStorage.getItem('horarios')) || [];
  horarios.forEach((horario, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `Ponto ${index + 1}: ${horario}`;
    listaHorarios.appendChild(li);
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
