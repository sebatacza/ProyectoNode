

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