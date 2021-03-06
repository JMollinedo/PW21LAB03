const { RSA_X931_PADDING } = require('constants')
const readline = require('readline')

class CharPair{
    constructor(abridor,cerrador){
        this.abridor = abridor
        this.cerrador = cerrador
    }
}

function validar(cadena){
    const parejas = [
        new CharPair('{','}'),
        new CharPair('[',']'),
        new CharPair('(',')')
    ]
    const pila = []
    for (let index = 0; index < cadena.length; index++) {
        const caracter = cadena.charAt(index)
        const pareja = parejas.filter(p => p.abridor == caracter)
        if(pareja.length > 0){
            pila.push(caracter)
            continue
        }
        const last = parejas.filter(p => p.cerrador == caracter)
        if(last.length > 0){
            const peek = pila[pila.length - 1]
            if(peek == last[0].abridor){
                pila.splice(pila.length-1,1)
                continue
            }
        }
    }
    return pila.length == 0
}

function main(){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.question('ingrese texto a verificar\n', (answer) => {
        let res = validar(answer);
        if(res) console.log("Texto valido")
        else console.log("Texto Invalido")
        rl.close()
    })
    return
}

main()