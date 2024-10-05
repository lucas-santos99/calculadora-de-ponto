function calcularTempoTrabalhado(horaEntrada, horaSaida) {
    const [horaEnt, minEnt] = horaEntrada.split(':').map(Number);
    const [horaSai, minSai] = horaSaida.split(':').map(Number);
  
    let horasTrabalhadas = horaSai - horaEnt;
    let minutosTrabalhados = minSai - minEnt;
  
    if (minutosTrabalhados < 0) {
      minutosTrabalhados += 60;
      horasTrabalhadas--;
    }
  
    return {
      horas: horasTrabalhadas,
      minutos: minutosTrabalhados
    };
  }
  
  function tempoRestanteParaCompletarJornada(horasManha, minutosManha) {
    const jornadaHoras = 7;
    const jornadaMinutos = 35;
  
    let horasRestantes = jornadaHoras - horasManha;
    let minutosRestantes = jornadaMinutos - minutosManha;
  
    if (minutosRestantes < 0) {
      minutosRestantes += 60;
      horasRestantes--;
    }
  
    return {
      horas: horasRestantes,
      minutos: minutosRestantes
    };
  }
  
  function calcularSaidaTarde(horaEntradaTarde, horasRestantes, minutosRestantes) {
    const [horaEnt, minEnt] = horaEntradaTarde.split(':').map(Number);
  
    let horaSaida = horaEnt + horasRestantes;
    let minutoSaida = minEnt + minutosRestantes;
  
    if (minutoSaida >= 60) {
      minutoSaida -= 60;
      horaSaida++;
    }
  
    return `${horaSaida.toString().padStart(2, '0')}:${minutoSaida.toString().padStart(2, '0')}`;
  }
  
  // Exemplo de uso:
  const horaEntradaManha = "08:00";  // Hora de entrada na manhã
  const horaSaidaManha = "12:00";    // Hora de saída na manhã
  const horaEntradaTarde = "13:00";  // Hora de entrada na tarde
  
  // Calcula o tempo trabalhado de manhã
  const tempoManha = calcularTempoTrabalhado(horaEntradaManha, horaSaidaManha);
  
  // Calcula o tempo restante que precisa ser trabalhado à tarde
  const tempoRestante = tempoRestanteParaCompletarJornada(tempoManha.horas, tempoManha.minutos);
  
  // Calcula o horário de saída da tarde com base na entrada e no tempo restante
  const horaSaidaTarde = calcularSaidaTarde(horaEntradaTarde, tempoRestante.horas, tempoRestante.minutos);
  
  console.log(`Você precisa sair às: ${horaSaidaTarde}`);  // Exemplo de saída: Você precisa sair às: 16:35
  