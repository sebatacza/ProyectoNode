

// let nombre = prompt ("Decime tu nombre")

// document.write(nombrewh)

    const toggleBtn = document.querySelector('.toggle-btn')
    const toggleBtnIcon = document.querySelector('.toggle-btn i')
    const dropDownMenu = document.querySelector('.dropdownMenu')
    
    toggleBtn.onclick = function () {
        
        dropDownMenu.classList.toggle('open')
        const isOpen = dropDownMenu.classList.contains('open')
    
        toggleBtnIcon.classList = isOpen ? 'fa solid fa-xmark' : 'fa solid fa-bars'
    }


class Productos{
    #id
    #nombre
    #tipo
    #precio
    #stock
    constructor(id,nombre,tipo,precio,stock){
        this.#id = id,
        this.#nombre = nombre,
        this.#tipo = tipo,
        this.#precio = precio,
        this.#stock = stock
    }
    verinfo(){
        let info = (`Info del producto: ${this.#nombre}, Tipo:${this.#tipo}, Precio:${this.#precio}, ID: ${this.#id}`)
        return this.#stock > 0 ? info += ` Stock: ${this.#stock}` : info += " Stock no disponible."
    }
}

// Herencia
class OtroProducto extends Productos{
    #volumen
    #ilustradores
    constructor(id,nombre,tipo,precio,stock,volumen,ilustradores){
        super(id,nombre,tipo,precio,stock),
        this.#volumen = volumen,
        this.#ilustradores = ilustradores
    }

    // Polimorfismo
    infoOtroProducto(){
        let info  = (`Volumen: ${this.#volumen}, Ilustradores: ${this.ilustradores}`)
        return `${this.verinfo()}, ${info}`
    }
}



const nuevoSocioForm = document.getElementById("socioNuevoForm");

nuevoSocioForm.addEventListener("submit", function (event) {
  //Evita que recarge pagina
  event.preventDefault();

  const ulErrores = document.getElementById("listaErrores");
  const mensaje = [];

  const { nombres, apellidos, correo, contraseña, contraseñaRep, terminos, tipoPlan, imagen } = nuevoSocioForm.elements;

  ulErrores.innerHTML = "";

  //Nombres
  if (!nombres.value.trim()) {
    mensaje.push("Nombre es requerido.");
  }

  //Apellidos
  if (!apellidos.value.trim()) {
    mensaje.push("Apellido es requerido.");
  }

  //Correo
  if (!correo.value.trim() || !validarCorreo(correo.value)) {
    mensaje.push("Correo invalido.");
  }

  //Contraseña
  if (!contraseña.value.trim() || !validarContraseña(contraseña.value)) {
    mensaje.push("Contraseña debe ser al menos de 8 caracteres, contener una mayuscula, una misnucula, un digito y un caracter especial.");
  }

  if(!contraseñaRep.value.trim()){
    mensaje.push('Por favor repita su contraseña');
  }else{
    if(contraseña.value != contraseñaRep.value){
      mensaje.push('Las contraseñas ingresadas no coinciden.');
    }
  }

  //Terminos
  if(!terminos.checked){
    mensaje.push("Acepta los términos y condiciones.");
  }

  //archivo
  if(tipoPlan.value == "0"){
    mensaje.push("Selecciona tu tipo de plan.");
  }
  console.log(imagen.value);
  if(imagen.value != ""){
    //console.log('HAY')
    if(!validarTipoArchivo(imagen.value)){
      mensaje.push("Ingrese png, jpg.");
    }
  }else{
    //console.log('NO HAY')
    mensaje.push("Por favor suba una imagen.");
  }
 

  if(mensaje.length > 0){
    //console.log(mensaje);
    ListarErrores(mensaje,ulErrores);
    return
  }else{
    //Todo correcto, mandamos formulario
    alert("Gracias por hacerte socio!");
    nuevoSocioForm.reset();
  }
});

//recibe array de string con errores y <ul></ul>
function ListarErrores(Errores, ulLista) {
  //console.log(Errores)
  for (var i = 0; i < Errores.length; i++){
    ulLista.innerHTML += `<li><i class="fa-solid fa-triangle-exclamation"></i> ${Errores[i]}</li>`;
  }
}

function validarCorreo(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function validarContraseña(contraseña) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(contraseña);
}

function validarTipoArchivo(archivo){
  var tipo = archivo.split(".").pop();
  switch(tipo){
    case "jpg":
    case "JPG":
    case "png":
    case "PNG":
      return true;
    default:
      return false;
  }
}