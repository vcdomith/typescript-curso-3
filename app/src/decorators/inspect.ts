// export function inspect() {

//     return function(
//         target: any,
//         propertyKey: string,
//         descriptor: PropertyDescriptor
//     ) {

//         const metodoOriginal = descriptor.value

//         descriptor.value = function(...args: any[]) {

//             console.log(`--- Método ${propertyKey}`)
//             console.log(`------ Parâmetros ${JSON.stringify(args)}`)
            
//             const retorno = metodoOriginal.apply(this, args)
//             console.log(`------ retorno: ${JSON.stringify(retorno)}`)
            
//             return retorno
//         }

//         return descriptor

//     }



// }

// Não necessita a closure, pois não recebe parametros, porém o mais recomendado é usar o closure para manter o código consistente:


export function inspect(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {

    const metodoOriginal = descriptor.value

    // Tem que ser uma function explicita ao invês de uma arrow function pois precisa passar o contexto do 'this' para o metodoOriginal dentro dela.
    descriptor.value = function(...args: any[]) {

        console.log(`--- Método ${propertyKey}`)
        console.log(`------ Parâmetros ${JSON.stringify(args)}`)
        
        const retorno = metodoOriginal.apply(this, args)
        console.log(`------ retorno: ${JSON.stringify(retorno)}`)
        
        return retorno
    }

    return descriptor

}



