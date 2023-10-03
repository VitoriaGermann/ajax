var pagina = 1;
var carregando = false;

function carregarImagens() {
  if (carregando) {
    return;
  }
  carregando = true;
  var url = "./images.json";
  var ajax = new XMLHttpRequest();
  ajax.open("GET", url, true);
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {

      var divImagens = document.getElementById("imagens");
      var images = JSON.parse(ajax.responseText);
      
      images.animals = shuffleArray(images.animals);

      for (const image of images.animals) {
        var img = document.createElement("img");
        img.src = image.imagemUrl;
        img.alt = image.name;
        divImagens.appendChild(img);
      }
      carregando = false;
      pagina++;
    }
  };
  ajax.send();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

window.onscroll = function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    carregarImagens();
  }
};

carregarImagens();