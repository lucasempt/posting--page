const form = document.querySelector("#form-post");
const tituloInput = document.querySelector("#titulo");
const conteudoInput = document.querySelector("#conteudo");
const btnPostar = document.querySelector("#btn-postar"); // Novo seletor

const tituloRenderizar = document.querySelector("#renderizador-titulo");
const conteudoRenderizar = document.querySelector("#renderizador-conteudo");
const toast = document.querySelector("#toast"); // Novo seletor

form.addEventListener("submit", (event) => {
  event.preventDefault();

  btnPostar.innerText = "Enviando...";
  btnPostar.disabled = true;

  tituloRenderizar.classList.add("skeleton");
  conteudoRenderizar.classList.add("skeleton");

  tituloRenderizar.innerText = "";
  conteudoRenderizar.innerText = "";

  const data = {
    title: tituloInput.value,
    body: conteudoInput.value,
    userId: 1,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("Sucesso na API:", json);

      tituloRenderizar.classList.remove("skeleton");
      conteudoRenderizar.classList.remove("skeleton");

      tituloRenderizar.innerHTML = json.title;
      conteudoRenderizar.innerHTML = json.body;

      btnPostar.innerText = "Postar Agora";
      btnPostar.disabled = false;

      form.reset();

      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);

      btnPostar.innerText = "Erro ao Postar";
      btnPostar.disabled = false;
      tituloRenderizar.classList.remove("skeleton");
      conteudoRenderizar.classList.remove("skeleton");
      tituloRenderizar.innerText = "Ocorreu um erro.";
    });
});
