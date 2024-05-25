

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

//Clase
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



//Usadas en el TP
class Personas{
    #id
    #nombre
    #apellido
    #correo
    #documento
    constructor(id,nombre,apellido,correo,documento){
        this.#id = id,
        this.#nombre = nombre,
        this.#apellido = apellido,
        this.#correo = correo,
        this.#documento = documento
    }
}

class Socios extends Personas{
  #plan
  #contraseña
  constructor(id,nombre,apellido,correo,documento,plan,contraseña){
    super(id,nombre,apellido,correo,documento),
    this.#plan = plan,
    this.#contraseña = contraseña
  }
}


const nuevoSocioForm = document.getElementById("socioNuevoForm");

nuevoSocioForm.addEventListener("submit", function (event) {
  //Evita que recarge pagina
  event.preventDefault();

  const ulErrores = document.getElementById("listaErrores");
  const mensaje = [];
  var iconoError = '<i class="fa-solid fa-triangle-exclamation"></i> ';
  const { nombres, apellidos, correo, contraseña, contraseñaRep, terminos, tipoPlan, imagen } = nuevoSocioForm.elements;

  ulErrores.innerHTML = "";

  //Nombres
  if (!nombres.value.trim()) {
    mensaje.push("Complete nombre.");
    document.getElementById('lblNombreError').innerHTML = iconoError+'Complete su nombre.';
  }else{
    document.getElementById('lblNombreError').innerHTML = '';
  }

  //Apellidos
  if (!apellidos.value.trim()) {
    mensaje.push("Complete apellido.");
    document.getElementById('lblApellidoError').innerHTML = iconoError+'Complete su apellido.';
  }else{
    document.getElementById('lblApellidoError').innerHTML = '';
  }

  //Correo
  if (!correo.value.trim() || !validarCorreo(correo.value)) {
    mensaje.push("Correo no válido.");
    document.getElementById('lblEmailError').innerHTML = iconoError+'Correo no válido.';
  }else{
    document.getElementById('lblEmailError').innerHTML = '';
  }

  //Contraseña
  if (!contraseña.value.trim() || !validarContraseña(contraseña.value)) {
    mensaje.push("Contraseña debe ser de al menos de 8 carácteres, contener una mayúscula, una minúscula, un númro y un caracter especial.");
    //Damos mismo ancho que el input para evitar que deforme el form
    var inputContraseña = document.getElementById('inputContraseña');
    document.getElementById('lblPassError').style.width = inputContraseña.getBoundingClientRect().width +'px';
    document.getElementById('lblPassError').innerHTML = iconoError+'Contraseña debe ser de al menos de 8 carácteres, contener una mayúscula, una minúscula, un númro y un caracter especial.';
  }else{
    document.getElementById('lblPassError').innerHTML = '';
  }

  if(!contraseñaRep.value.trim()){
    mensaje.push('Por favor repita su contraseña');
    document.getElementById('lblrptPassError').innerHTML = iconoError+'Por favor repita su contraseña.';
  }else{
    if(contraseña.value != contraseñaRep.value){
      mensaje.push('Las contraseñas ingresadas no coinciden.');
      document.getElementById('lblrptPassError').innerHTML = iconoError+'Las contraseñas ingresadas no coinciden.';
    }else{
      document.getElementById('lblrptPassError').innerHTML = '';
    }
  }

  //Terminos
  if(!terminos.checked){
    mensaje.push("Por favor acepte los términos y condiciones.");
    document.getElementById('lblCondicionesError').innerHTML = iconoError+'Por favor acepte los términos y condiciones.';
  }else{
    document.getElementById('lblCondicionesError').innerHTML = '';
  }

  //tipoPlan
  if(tipoPlan.value == "0"){
    mensaje.push("Selecciona tu tipo de plan.");
    document.getElementById('lblPlanError').innerHTML = iconoError+'Selecciona tu tipo de plan.';
  }else{
    document.getElementById('lblPlanError').innerHTML = '';
  }

  //archivo
  if(imagen.value != ""){
    //console.log('HAY')
    if(!validarTipoArchivo(imagen.value)){
      mensaje.push("Tipo de archivo permitido: png, jpg.");
      document.getElementById('lblIMGError').innerHTML = iconoError+'Tipo de archivo permitido: png, jpg.';
    }else{
      document.getElementById('lblIMGError').innerHTML = '';
    }
  }else{
    //console.log('NO HAY')
    mensaje.push("Por favor suba una imagen de su documento.");
    document.getElementById('lblIMGError').innerHTML = iconoError+'Por favor suba una imagen de su documento.';
  }
 

  if(mensaje.length > 0){
    console.log(mensaje);
    //ListarErrores(mensaje,ulErrores);
    return
  }else{
    //Todo correcto, mandamos formulario
    var nuevoSocio = new Socios(1,nombres.value,apellidos.value,correo.value,imagen.value,tipoPlan.value, contraseña.value);
    console.log(nuevoSocio);
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

