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
  data={
  numero_placa: document.getElementById('placa').value,
  modelo: document.getElementById('modelo').value,
  fecha_ven_seguro: document.getElementById('seguro').value,
  fecha_ven_tecmecanica: document.getElementById('mecanica').value,
  id_linea: document.getElementById('idlinea').value}  
  crear('vehiculo',data)
  formCV.reset();
});

crearL.addEventListener("click", () => {
  let myModal = new bootstrap.Modal(document.getElementById("modalLinea"));
  myModal.show();
});

formCL.addEventListener("submit", (e) => {
  e.preventDefault();  
  data={
  nombre_linea: document.getElementById('nombreL').value,
  estado: document.getElementById('estadoL').value,
  descripcion: document.getElementById('descripcionL').value,
  id_marca: document.getElementById('idmarcaL').value,
  }    
  crear('linea',data)
  formCL.reset();
});

crearM.addEventListener("click", () => {
  let myModal = new bootstrap.Modal(document.getElementById("modalMarca"));
  myModal.show();

});

formCM.addEventListener("submit", (e) => {
  e.preventDefault();  
  data={
  nombre_marca: document.getElementById('nombreM').value,
  estado: document.getElementById('estadoM').value,
  descripcionM: document.getElementById('descripcionM').value
  }    
  console.log(data)
  crear('marca',data)
  formCM.reset();
});

listarV.addEventListener("click", () => {
  menu.style.display = "block";
  let tod = document.getElementById("todo");
  let max = document.getElementById("maxmin");
  let filter = document.getElementById("filterSeguro");
  let consulta = document.getElementById("consultaUnica");
  let suma = document.getElementById("sumaModelos");
  let promedio = document.getElementById("promedioModelo");
  let div = document.getElementById('divTable');

  tod.addEventListener("click", () => {
    div.innerHTML = "";
    div.innerHTML= `<table id="table">
    </table>`
    listar("vehiculo");
    });
  max.addEventListener("click", () => {
    div.innerHTML = "";
    div.innerHTML= `<table id="table">
    </table>`
    listar("modelos");
  });
  consulta.addEventListener("click", () => {
    div.innerHTML = "";
    div.innerHTML= `<table id="table">
    </table>`
    listar("consultaUnica");
  });

  suma.addEventListener("click", () => {
    div.innerHTML = "";
    div.innerHTML= `<table id="table">
    </table>`
    listar("sumModelos");
  });

  promedio.addEventListener("click", () => {
    div.innerHTML = "";
    div.innerHTML= `<table id="table">
    </table>`
    listar("promediar");
  });

});

function listar(urlapi) {    
  console.log(`https://app-regvehiculos.herokuapp.com/api/listar/${urlapi}`);
  fetch(`https://app-regvehiculos.herokuapp.com/api/listar/${urlapi}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(Object.keys(data))
      let table = new simpleDatatables.DataTable("#table", {        
        data: {
          headings: Object.keys(data[0]), 
          data: data.map((item) => Object.values(item)),
        },
      });      
    });
}

function crear(urlapi,data) {    
  console.log(`https://app-regvehiculos.herokuapp.com/api/crear/${urlapi}`);
  fetch(`https://app-regvehiculos.herokuapp.com/api/crear/${urlapi}`,{
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-type": "application/json; charset=UTF-8"}   
  })
  .then(response => response.json()) 
  .then(json => console.log(json))
  .catch(err => console.log(err))
}
