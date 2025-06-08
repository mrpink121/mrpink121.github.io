//Estudante : João Amador [3240655] Professor : Marco Heleno | Exercício de Avaliação: Portfolio 
// Ano Letivo 3º, 2024-2025 | 2º Semestre | Laboratório de Projeto II | ESAD CR. | Data de Avaliação : 08/06/2025

// Declaração de variáveis
let email_container_element, email_a_element, email_button_element;
let temp_input;

// Função principal iniciada automaticamente pelo p5.js 
function setup() {
  noCanvas();
  // Desativa a criação automática de uma tela canvas (não necessária)

  email_container_element = select("#email_container");
  // Elemento HTML com id "email_container"

  email_a_element = select("#email");
  // Elemento HTML com id "email"

  email_button_element = createButton("Copy Email");
  // Botão com o texto "Copy Email"

  email_button_element.class("copy-email-btn");
  // Classe CSS

  email_button_element.parent(email_container_element);
  // Define o elemento pai do botão como o container de email (coloca o botão dentro da <div>)

  email_button_element.hide();
  // Esconde o botão inicialmente

  email_button_element.mousePressed(copyEmail);
  // Clique no botão ativa a função copyEmail()
}

// Função para copiar o email para a área de transferência
function copyEmail() {
  temp_input = createInput();
  // Campo de input temporário

  temp_input.parent(email_container_element);
  // Input dentro do container do email

  temp_input.value(email_a_element.html());
  // Valor do input é o texto do link de email

  try {
    navigator.clipboard.writeText(temp_input.elt.value)
      // Copia o texto para a área de transferência
      .then(() => {
        temp_input.remove();
        // Remove o input temporário após copiar

        email_button_element.hide();
        // Esconde o botão

        console.log("Email copied to clipboard (Clipboard API)");
        // Mensagem na consola de sucesso
      })
      .catch(err => {
        console.error("Clipboard API failed: ", err);
        copyEmailFallback();
        // Mensagem na consola de falha

      });
  } catch (err) {
    console.error("Clipboard API failed: ", err);
    copyEmailFallback();
  }
}

// Função alternativa para copiar o email
function copyEmailFallback() {
  temp_input.elt.select();
  // Seleciona o texto do input

  document.execCommand("copy");
  // Comando para copiar o texto

  temp_input.remove();
  // Remove o input temporário

  email_button_element.hide();
  // Esconde novamente o botão

  console.log("Email copied to clipboard (fallback)");
  // Mensagem na consola
}

// Ao passar o rato por cima do email
function showEmailButton() {
  email_button_element.show();
  // Botão "Copy Email" Visível
}

// Função chamada ao tirar o rato de cima do container de email
function hideEmailButton() {
  email_button_element.hide();
  // Botão "Copy Email" Escondido
}
