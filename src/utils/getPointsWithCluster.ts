import { Marker } from "@googlemaps/markerclusterer"
import { School } from "../data/schools"

export const getPointsWithCluster = (points: School[], marcadoresDoCluster: Marker[] | undefined) => {
    const listaDePontos: School[] = []
    marcadoresDoCluster?.forEach(marcador => {
        points.forEach(ponto => {
            // @ts-expect-error: Unreachable
            const posicaoDoMarcador = {lat:marcador.position.lat, lng:marcador.position.lng}
            if(ponto.lat === posicaoDoMarcador.lat && ponto.lng === posicaoDoMarcador.lng) listaDePontos.push(ponto)
        })
    })
    return listaDePontos
}