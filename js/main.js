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