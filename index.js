const palco = document.getElementById("palco") // div que vai armazenar as bolas
const num_objects = document.getElementById("num_objects") // quantidade de bolas

const btn_add = document.getElementById("btn_add") // btn para add
const btn_remover = document.getElementById("btn_remover") // btn para remover

const txt_qtde = document.getElementById("txt_qtde") // input

// variaveis gerais //
let largura_palco = palco.offsetWidth
let altura_palco = palco.offsetHeight

let bolas = [] // vai ser adicionado todas as bolas

let num_bolas = 0 // qtde de bolas


// classe bola -> vai criar cada bola
class Bola {
    constructor(arraybolas, palco) {
        // definindo o tamanho
        // tamanho minimo é 10
        this.tam = Math.floor(Math.random() * 15) + 10

        // definindo cores rgb (0 - 255)
        this.r = Math.floor(Math.random() * 255) // red
        this.g = Math.floor(Math.random() * 255) // green
        this.b = Math.floor(Math.random() * 255) // blue

        // definindo a posição das bolas
        // estou diminuindo pelo tamanho, por que corre risco da bola ficar metade para fora da janela
        this.px = Math.floor(Math.random() * (largura_palco - this.tam))
        this.py = Math.floor(Math.random() * (altura_palco - this.tam))

        // definindo a velocidade de x e y
        // minimo: 0.5
        // maximo: 2
        this.velx= Math.floor(Math.random() * 2) + 0.5
        this.vely= Math.floor(Math.random() * 2) + 0.5

        // definindo direção do x e y
        // se for maior que 5 = 1
        // se for menor que 5 = -1
        this.dirx = Math.floor(Math.random() * 10)>5 ? 1 : -1
        this.diry = Math.floor(Math.random() * 10)>5 ? 1 : -1

        // lugar onde vai ser instanciado
        this.palco = palco

        // quem vai ser instanciado
        this.arraybolas = arraybolas

        // um id diferente para cada bolinha
        // a chance de ser igual é muito pequena
        this.id = Date.now()+"_"+Math.floor(Math.random()*1000000000)

        this.desenhar()

        // vai chamar a funcao controlar a cada 10 segundos
        this.controle = setInterval(this.controlar, 10)

        // vou pegar a propria bolinha vindo no dom
        this.eu = document.getElementById(this.id)

        // adiciona +1 na quantidade total
        num_bolas++

        // adiciono la no dom
        num_objects.innerHTML = num_bolas
    }

    // posição no array de bolas
    minhaPos = () => {
        // retorna a posição da bola dentro do array
        return this.arraybolas.indexOf(this)
    }

    // remover bolinha
    remover = () => {
        // remover o intervalo, para a bolinha na tela
        clearInterval(this.controle)

        bolas = bolas.filter(boll => {
            
            // se a bolinha que está no array for diferente da bolinha que for removida, ele retorna a propria a bola 
            if(boll.id != this.id) {
                return boll
            }

            // se ela for igual ao id da bola que vai ser deletada, ele nao retorna

            this.eu.remove() // remove do dom

            // diminuo a quantidade
            num_bolas--
            num_objects.innerHTML = num_bolas
        })
    }

    // funcao que vai desenhar a bolinha no dom
    desenhar = () => {
        // criar a bolinha
        const div = document.createElement("div")
        div.setAttribute("id", this.id) // define o id aq gerado na classe
        div.setAttribute("class", "bola")
        div.setAttribute("style", `left: ${this.px}px; top: ${this.py}px; width: ${this.tam}px; height: ${this.tam}px; background-color: rgb(${this.r}, ${this.g}, ${this.b})`)
        this.palco.appendChild(div)    
    }

    colisao_bordas = () => {

        // verifico se a bolinha encostou na borda
        // se encostou troco a direção
        if ((this.px + this.tam) >= largura_palco) {
            this.dirx = -1
        } else if (this.px <= 0) {
            this.dirx = 1
        } 

        if ((this.py + this.tam) >= altura_palco) {
            this.diry = -1
        } else if (this.py <= 0) {
            this.diry = 1
        }
    }

    // metodo que vai controlar
    controlar = () => {
        // vai atualizar a posição da bolinha
    
        this.colisao_bordas()

        // atualizar a posição
        this.px += this.dirx * this.velx
        this.py += this.diry * this.vely
        this.eu.setAttribute("style", `left: ${this.px}px; top: ${this.py}px; width: ${this.tam}px; height: ${this.tam}px; background-color: rgb(${this.r}, ${this.g}, ${this.b})`)

        if((this.px > largura_palco) || (this.py > altura_palco)) {
            this.remover()
        }
    }
}



// vai ser atividado quando redimensionar a janela
// resize => redimencionar
window.addEventListener("resize", (evt) => {
    // quando redimensionar, vou atualizar a variavel da altura e largura
    largura_palco = palco.offsetWidth
    altura_palco = palco.offsetHeight
})

// ações do botao add
btn_add.addEventListener("click", () => {
    // quantidade de bolas q vem do input
    const qtde = txt_qtde.value

    // loop para adicionar cada bolinha, com base na quantidade
    for (let i = 0; i < qtde; i++) {
        // instanciar novas bolas
        bolas.push(new Bola(bolas, palco))

    }
})

// acoes do botao remover
btn_remover.addEventListener("click", () => {
    // remover bolinha por bolinha
    bolas.map((b) => {
        // função para remover
        b.remover()
    })
})