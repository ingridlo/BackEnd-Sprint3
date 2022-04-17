const crear = document.getElementById("crear");
const editar = document.getElementById("editar");
const listar = document.getElementById("listar");

crear.addEventListener("click", () => {
  let myModal = new bootstrap.Modal(
    document.getElementById("myModal")
  );
  myModal.show();
});
