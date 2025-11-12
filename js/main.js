<<<<<<< HEAD
let nombre = prompt("ingrese su nombre")
let local = prompt("ingrese el local en que trabaja")

console.log ("Nombre: " + nombre + " local: " + local)


// MENU
let menu = parseInt(prompt("Que Quiere Saber?: \n 1-Horas Semanales \n 2-Presentismo \n 3-Tareas \n 4-salir"))

while(menu !== 4) {
    switch (menu){
        case 1:
            semanales()
            break
        case 2:
            llegada()
            break
        case 3:
            obligaciones()
            break    
        default:
            alert("Opcion Incorrecta")
    }
    menu = parseInt(prompt("Que Quiere Saber?: \n 1-Horas Semanales \n 2-Presentismo \n 3-Tareas \n 4-salir"))

}
alert ("Nos Vemos!")


//Funcion Horas Semanales

function semanales() {
  let horasPorDia = parseInt(prompt("Ingrese la cantidad de horas por día:"));
  let diasPorSemana = parseInt(prompt("Ingrese la cantidad de días que trabaja:"));

  if (isNaN(horasPorDia) || isNaN(diasPorSemana)) {
    alert("Ingrese solo numeros válidos.");
    return;
  }

  let resultado = horasPorDia * diasPorSemana;
  alert("Trabaja un total de " + resultado + " horas semanales.");
  console.log("Cantidad de horas semanales: " + resultado);
}

// Funcion Presentismo

function llegada() {
let presentismo = prompt ("Llego tarde? si/no")
presentismo = presentismo.toLowerCase();

if(presentismo === "si") {
    alert ("Este Mes no tiene presentismo")
    console.log ("No Tiene Presentismo")
} else if (presentismo === "no") {
    alert ("Se le paga Presentismo")
    console.log ("Tiene Presentismo")
}
}


//ARRAYS
function obligaciones(){
const tareas = ["Llenar Topinera", "Llenar heladera de papas", "Traer panes", "Encender planchas y freidoras", "Revisar que hay que hacer de produccion"]
tareas.push ("Guardar Verduleria")

let mensaje = "Lista de tareas del día:\n\n";

  for (const tarea of tareas) {
    mensaje += "- " + tarea + "\n";
    console.log(tarea);
  }

  alert(mensaje);
}
=======
//CONSTRUCTOR DE PUESTOS
function Puesto(nombre, tareas) {
  this.nombre = nombre;
  this.tareas = tareas;
}

const puestosIniciales = [
  new Puesto("Planchero", [
    { texto: "Calentar la plancha", completada: false },
    { texto: "Preparar hamburguesas", completada: false },
    { texto: "Limpiar superficie", completada: false }
  ]),
  new Puesto("Armador", [
    { texto: "Colocar panes", completada: false },
    { texto: "Agregar ingredientes", completada: false },
    { texto: "Envolver pedido", completada: false }
  ]),
  new Puesto("Peón", [
    { texto: "Lavar utensilios", completada: false },
    { texto: "Sacar basura", completada: false },
    { texto: "Reponer insumos", completada: false }
  ])
];



//FUNCIÓN PARA GUARDAR EN LOCALSTORAGE
function guardarDatos(puestos) {
  localStorage.setItem("puestosCocina", JSON.stringify(puestos));
}

//FUNCIÓN PARA CARGAR DATOS
function cargarDatos() {
  const data = localStorage.getItem("puestosCocina");
  if (data) {
    return JSON.parse(data);
  } else {
    // Si no hay datos guardados, devolvemos los iniciales
    return puestosIniciales;
  }
}


//FUNCIÓN PARA RENDERIZAR EL DOM
function mostrarPuestos(puestos) {
  const contenedor = document.getElementById("contenedorPuestos");
  contenedor.innerHTML = "";

  puestos.forEach((puesto, index) => {
    const div = document.createElement("div");
    div.classList.add("puesto");

    
    const titulo = document.createElement("h2");
    titulo.textContent = `👨‍🍳 ${puesto.nombre}`;
    div.appendChild(titulo);

    
    const lista = document.createElement("ul");
    puesto.tareas.forEach((tarea, i) => {
      const item = document.createElement("li");

      
      const check = document.createElement("input");
      check.type = "checkbox";
      check.checked = tarea.completada;

      check.addEventListener("change", () => {
        puesto.tareas[i].completada = check.checked;
        actualizarProgreso(puesto, div);
        guardarDatos(puestos);
      });

      
      const texto = document.createTextNode(tarea.texto);

      // Botón borrar
      const botonBorrar = document.createElement("button");
      botonBorrar.textContent = "❌";
      botonBorrar.classList.add("boton-borrar");
      botonBorrar.addEventListener("click", () => {
        puesto.tareas.splice(i, 1);
        guardarDatos(puestos);
        mostrarPuestos(puestos); 
      });

      
      item.appendChild(check);
      item.appendChild(texto);
      item.appendChild(botonBorrar);

      lista.appendChild(item);
    });

    div.appendChild(lista);

    // Input y botón para agregar nuevas tareas
    const inputTarea = document.createElement("input");
    inputTarea.type = "text";
    inputTarea.placeholder = "Nueva tarea...";
    inputTarea.classList.add("input-tarea");

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "➕ Agregar";
    botonAgregar.classList.add("boton-agregar");

    botonAgregar.addEventListener("click", () => {
      const texto = inputTarea.value.trim();
      if (texto) {
        puesto.tareas.push({ texto, completada: false });
        guardarDatos(puestos);
        mostrarPuestos(puestos);
      }
    });

    div.appendChild(inputTarea);
    div.appendChild(botonAgregar);

    // Mostrar progreso
    const progreso = document.createElement("p");
    progreso.classList.add("progreso");
    div.appendChild(progreso);

    // Barra visual
    const barra = document.createElement("div");
    barra.classList.add("barra");
    const barraInterna = document.createElement("div");
    barraInterna.classList.add("barra-interna");
    barra.appendChild(barraInterna);
    div.appendChild(barra);

    actualizarProgreso(puesto, div);
    
    contenedor.appendChild(div);
  });
}

//FUNCIÓN PARA ACTUALIZAR EL PROGRESO
function actualizarProgreso(puesto, div) {
  const total = puesto.tareas.length;
  const completadas = puesto.tareas.filter(t => t.completada).length;
  const porcentaje = Math.round((completadas / total) * 100);

  const progreso = div.querySelector(".progreso");
  const barraInterna = div.querySelector(".barra-interna");

  progreso.textContent = `Progreso: ${porcentaje}%`;
  barraInterna.style.width = `${porcentaje}%`;

  if (porcentaje === 100) barraInterna.style.backgroundColor = "green";
  else if (porcentaje >= 50) barraInterna.style.backgroundColor = "orange";
  else barraInterna.style.backgroundColor = "red";
}

//INICIO
let puestosCocina = cargarDatos();

if (!localStorage.getItem("puestosCocina")) {
  guardarDatos(puestosCocina);
}

mostrarPuestos(puestosCocina);



>>>>>>> ed78244 (2da Preentrega)
