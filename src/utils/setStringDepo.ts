import { School } from "../data/schools"

export const setStringDepo = (listaDePontos:School[]) => {
    const listaDepoimentos = listaDePontos.map(ponto => ponto.depo)
    return listaDepoimentos.join('')
}