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
    } else {
      document.getElementById("etapa").style.display = "block";
      document.getElementById("labelEtapa").style.display = "block";
      document.getElementById("chaveDeAcesso").style.display = "block";
      document.getElementById("labelChave").style.display = "block";
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
    const dataP = document.getElementById("dataP").value;
    let textContent = "";
  
    if (tipoProcesso === "selecione") {
      alert("Selecione o tipo do processo!");
      return;
    }
    if (tipoProcesso === "transcricao"){
        textContent = `Olá, ${nomeClienteOutput}!\n\nO processo de transcrição de casamento de ${nomeReqOutput} foi protocolado na Conservatória na data ${dataP}. Vamos acompanhar o andamento do processo com o advogado responsável junto à conservatória e indicaremos a finalização desse serviço com a emissão do assento de casamento transcrito. A média de execução baseada na experiência de nossos especialistas é de 6 a 12 meses, a depender do bom funcionamento do órgão, mas continuaremos o monitoramento deste até a emissão do assento.\n\nQualquer dúvida, estamos à disposição. `
    } else {
        textContent = `Olá, ${nomeClienteOutput}!\n\nO processo de ${
            tipoProcesso === "filhos"
              ? "filho de"
              : tipoProcesso === "netos"
              ? "neto de"
              : "Aquisição por Casamento de"
          } ${nomeReqOutput} foi protocolado na Conservatória na data ${dataP}. A previsão é que a conservatória disponibilizará em cerca de 90 dias a chave de acesso para acompanhamento das etapas do processo, quando iniciaremos o nosso monitoramento e compartilharemos as atualizações com você.\n\nQualquer dúvida, estamos à disposição.`
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
  