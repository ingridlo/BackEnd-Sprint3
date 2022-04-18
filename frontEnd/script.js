const crearV = document.getElementById("crearVehiculo");
const crearL = document.getElementById("crearLinea");
const crearM = document.getElementById("crearMarca");
const formCV = document.getElementById("crearV");
const formCL = document.getElementById("crearL");
const formCM = document.getElementById("crearM");
const menu = document.getElementById("menu");
const listarV = document.getElementById("listarVehiculo");

crearV.addEventListener("click", () => {
  let myModal = new bootstrap.Modal(document.getElementById("modalvehiculo"));
  myModal.show();
});

formCV.addEventListener("submit", (e) => {
  e.preventDefault();
  formCV.reset();
});

crearL.addEventListener("click", () => {
  let myModal = new bootstrap.Modal(document.getElementById("modalLinea"));
  myModal.show();
});

formCL.addEventListener("submit", (e) => {
  e.preventDefault();
  formCV.reset();
});

crearM.addEventListener("click", () => {
  let myModal = new bootstrap.Modal(document.getElementById("modalMarca"));
  myModal.show();
});

formCL.addEventListener("submit", (e) => {
  e.preventDefault();
  formCV.reset();
});

listarV.addEventListener("click", () => {
  menu.style.display = "block";
  let tod = document.getElementById("todo");
  let max = document.getElementById("maxmin");
  let filter = document.getElementById("filterSeguro");
  let consulta = document.getElementById("consultaUnica");
  let suma = document.getElementById("sumaModelos");
  tod.addEventListener("click", () => {
    listar("vehiculo");
  });
  max.addEventListener("click", () => {
    listar("modelos");
  });
});

function listar(urlapi) {
  document.getElementById("table").innerHTML = ""
  console.log(`https://app-regvehiculos.herokuapp.com/api/listar/${urlapi}`);
  fetch(`https://app-regvehiculos.herokuapp.com/api/listar/${urlapi}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(Object.keys(data))
      let table = new simpleDatatables.DataTable("#table", {
        perPage: 20,
        searchable: false,

        fixedHeight: false,
        data: {
          headings: Object.keys(data[0]), 
          data: data.map((item) => Object.values(item)),
        },
      });
      console.log(data)
    });
}
