import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer"
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps"
import { useEffect, useRef, useState } from "react"

type point = google.maps.LatLngLiteral & {key:string}
type Props = {points: point[]}

export default function Markers({points}:Props){
    const map = useMap() //Acessar o próprio mapa
    const [marcadores, setMarcadores] = useState<{[key:string]: Marker}>({}) //Acessar todos os marcadores presentes no mapa
    const clusterer = useRef<MarkerClusterer | null>(null) //Acessar o cluster de marcadores

    useEffect(()=>{
        if(!map) return //Caso não tenha o mapa, não faça nada
        if(!clusterer.current){ //Caso não tenha um cluster, vamos configurá=lo pela primeira vez
            clusterer.current = new MarkerClusterer({ map })
        } 
    }, [map])

    const setMarkerRef = (marker: Marker | null, key: string) => { //O objetivo desse método é grupar os marcadores em 'markers'
        //Se o marker tivermos um marker e se o marker já estiver em 'markers', não precisamos fazer nada
        if(marker  && marcadores[key]) return 
        //Se o marker for null e se não tivermos esse marker em 'markers' de qualquer forma, não precisamos fazer nada
        if(!marker && !marcadores[key]) return 
        
        setMarcadores(prev => {
            if(marker){ //Aqui vamos adicionar o marker caso ele não esteja em 'markers'
                return {...prev, [key]: marker}
            } else { //Aqui vamos deletar o marker que ele já estiver em 'markers'
                const newMarkers = {...prev}
                delete newMarkers[key]
                return newMarkers
            }
        })

    }
    
    const setStringDepoforMarkers = (listaMarcadoresDoCluster: Marker[] | undefined) => {
        console.log(listaMarcadoresDoCluster[0].position.lat)
        const arrayFiltrado = []
        listaMarcadoresDoCluster?.forEach(marcador => {
            points.forEach(ponto => {
                const posicao = {lat: marcador.position.lat, lng:marcador.position.lng}
                if(ponto.lat === posicao.lat && ponto.lng === posicao.lng) arrayFiltrado.push(ponto.depo)
            })
        })
        console.log(arrayFiltrado)
        return arrayFiltrado.join('')

    }
    
    useEffect(()=>{
        
        clusterer.current?.clearMarkers() //Sempre que os 'markers' mudarem, vamos excluir os markers que estavam apresentes no cluster e...
        
        clusterer.current = new MarkerClusterer({map, renderer: { //Criando novo cluster com ícone personalizado
            render: ({ position, markers }) => {
                return new google.maps.Marker({
                    position,
                    icon: {
                        url: `https://quickchart.io/wordcloud?text=${setStringDepoforMarkers(markers)}&maxNumWords=20&fontWeight=bold&colors=["000"]&padding=1&case=upper&rotation=0`,
                        scaledSize: new google.maps.Size(90, 90), // Tamanho do ícone
                    },
                });
            }
        }})
        
        clusterer.current?.addMarkers(Object.values(marcadores)) //adicionamos os marcadores novos presentes no novo estado de 'markers'
        //Note que, 'markers' é um objeto, por isso usamos o 'Object.values' para pegar as instancias Marker propriamete dita
        // console.log(clusterer.current.clusters)

    }, [marcadores])

    return <>
    {
        points.map(point => <AdvancedMarker 
            position={point} 
            key={point.key}
            ref={marker => {
                setMarkerRef(marker, point.key)}}> 
            {/* A função callback do atributo 'ref' recebe como argumento o própro elemento que o 'ref' está referenciando. É uma forma de acessá-lo em outra função diretamente */}
                <span>
                    <img src={`https://quickchart.io/wordcloud?text=${point.depo}&maxNumWords=20&width=110&height=110&fontWeight=bold&colors=["000"]&padding=0&case=upper&rotation=0`} alt="" />
                </span>
        </AdvancedMarker>)
    }
    </>
}