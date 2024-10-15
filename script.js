function reset() {
  document.querySelector("form").reset();
  document.getElementById("content").value = "";
}

function mudarForms(that) {
  if (that.value == "transcricao") {
    document.getElementById("etapa").style.display = "none";
    document.getElementById("labelEtapa").style.display = "none";
    document.getElementById("chaveDeAcesso").style.display = "none";
    document.getElementById("labelChave").style.display = "none";
    document.getElementById("labelNumProcesso").style.display = "none";
    document.getElementById("numProcesso").style.display = "none";
  } else {
    document.getElementById("etapa").style.display = "block";
    document.getElementById("labelEtapa").style.display = "block";
    document.getElementById("chaveDeAcesso").style.display = "block";
    document.getElementById("labelChave").style.display = "block";
    document.getElementById("labelNumProcesso").style.display = "block";
    document.getElementById("numProcesso").style.display = "block";
  }
}

function createNote() {
  const nomeCliente = document.getElementById("nomeCliente").value;
  const nomeReq = document.getElementById("nomeReq").value;

  const lowercaseExceptions = new Set([
    "de",
    "da",
    "do",
    "e",
    "em",
    "a",
    "as",
    "os",
    "para",
    "com",
    "dos",
    "das"
  ]);

  const capitalizeWords = (string) =>
    string
      .toLowerCase()
      .split(" ")
      .map((word, index, arr) => {
        if (
          lowercaseExceptions.has(word) &&
          index !== 0 &&
          index !== arr.length - 1
        ) {
          return word;
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
      })
      .join(" ");

  const nomeClienteOutput = capitalizeWords(nomeCliente);
  const nomeReqOutput = capitalizeWords(nomeReq);

  const tipoProcesso = document.getElementById("tipoProcesso").value;
  const etapa = document.getElementById("etapa").value;
  const chaveDeAcesso = document.getElementById("chaveDeAcesso").value;
  const numProcesso = document.getElementById("numProcesso").value;
  let textContent = "";

  if (tipoProcesso === "selecione") {
    alert("Selecione o tipo do processo!");
    return;
  }
  if (etapa === "selecione" && tipoProcesso !== "transcricao") {
    alert("Selecione a etapa do processo!");
    return;
  }

  if (etapa == "concluido") {
    textContent = `Olá, ${nomeClienteOutput}!\n\nMonitoramento do processo de ${
      tipoProcesso === "filhos"
        ? "filho de"
        : tipoProcesso === "netos"
        ? "neto de"
        : "Aquisição por Casamento de"
    } ${nomeReqOutput}:\nConforme consultado no portal da Justiça portuguesa na data de hoje, o processo ${numProcesso} está concluído.\nParabéns! O seu pedido de nacionalidade foi aprovado. Após deferimento, a emissão do assento de nascimento pode levar de 90 a 180 dias.\nContinuaremos o monitoramento e compartilharemos as atualizações.\n\nVocê também pode acompanhar pelos acessos abaixo:\nhttps://meu.registo.justica.gov.pt/Pedidos/Consultar-estado-do-processo-de-nacionalidade\nSenha de acesso: ${chaveDeAcesso}\nQualquer dúvida, estamos à disposição.`;
  } else if (tipoProcesso == "transcricao") {
    textContent = `Olá ${nomeClienteOutput},\n\nMonitoramento do processo de transcrição de casamento em Portugal de ${nomeReqOutput}:\nEstamos acompanhando o andamento do processo com o advogado responsável junto à conservatória e indicaremos a finalização desse serviço com a emissão do assento de casamento transcrito.\nA média de execução baseada na experiência de nossos especialistas é de 6 a 12 meses, a depender do bom funcionamento da instituição.\n\nContinuaremos o monitoramento e compartilharemos as atualizações.\nQualquer dúvida, estamos à disposição.`;
  } else {
    let avgTime = tipoProcesso === "filhos" ? "18 meses" : "24 a 36 meses";
    textContent = `Olá, ${nomeClienteOutput}!\n\nMonitoramento do processo de ${
      tipoProcesso === "filhos"
        ? "filho de"
        : tipoProcesso === "netos"
        ? "neto de"
        : "Aquisição por Casamento de"
    } ${nomeReqOutput}: \nConforme consultado no portal da Justiça portuguesa na data de hoje, o processo ${numProcesso} está ${
      etapa === "analise"
        ? "na etapa de análise"
        :  etapa === "decisao"
        ? "na etapa de decisão"
        : etapa === "submetido"
        ? "submetido"
        : "em fase de conclusão"
    }. \nA média de execução baseada na experiência de nossos especialistas é de ${avgTime}, a depender do bom funcionamento da instituição.\nContinuaremos o monitoramento e compartilharemos as atualizações. \n\nVocê também pode acompanhar pelos acessos abaixo: \nhttps://meu.registo.justica.gov.pt/Pedidos/Consultar-estado-do-processo-de-nacionalidade \nSenha de acesso: ${chaveDeAcesso} \n\nRessaltamos que, devido a fase inicial da nova plataforma, o status do processo pode ser alterado a qualquer momento. Continuamos a monitorar o andamento e informaremos assim que houver qualquer atualização relevante. Qualquer dúvida, estamos à disposição.`;
  }

  document.getElementById("content").value = textContent;
}

function copyToClipboard() {
  var content = document.getElementById("content").value;
  navigator.clipboard.writeText(content).then(
    function () {
      alert("Conteúdo copiado para a área de transferência!");
    },
    function (err) {
      console.error("Erro ao copiar: ", err);
    }
  );
}
