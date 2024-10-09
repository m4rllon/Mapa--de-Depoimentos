import { Marker, MarkerClusterer, SuperClusterAlgorithm } from "@googlemaps/markerclusterer"
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps"
import { useEffect, useRef, useState } from "react"
import { getPointsWithCluster } from "../../../utils/getPointsWithCluster"
import { getStringFiltered } from "../../../utils/filterStrings"
import { setStringDepo } from "../../../utils/setStringDepo"
import { PopupContent } from "../Popup"
import { createRoot } from "react-dom/client"
import IconClusters from "../IconClusters"

type point = google.maps.LatLngLiteral & {key:string, name:string, depo:string}
type Props = {points: point[]}

export default function Markers({points}:Props){
    class Popup extends window.google.maps.OverlayView {
        position: google.maps.LatLng;
        containerDiv: HTMLDivElement;
    
        constructor(position: google.maps.LatLng, content: HTMLElement) {
          super();
          this.position = position;
          content.classList.add("popup-bubble");
    
          const bubbleAnchor = document.createElement("div");
          bubbleAnchor.classList.add("popup-bubble-anchor");
          bubbleAnchor.appendChild(content);
    
          this.containerDiv = document.createElement("div");
          this.containerDiv.classList.add("popup-container");
          this.containerDiv.appendChild(bubbleAnchor);
    
          Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
        }
    
        onAdd() {
          this.getPanes()!.floatPane.appendChild(this.containerDiv);
        }
    
        onRemove() {
          if (this.containerDiv.parentElement) {
            this.containerDiv.parentElement.removeChild(this.containerDiv);
          }
        }
    
        draw() {
          const divPosition = this.getProjection()?.fromLatLngToDivPixel(
            this.position
          );
    
          if (!divPosition) return;
    
          const display =
            Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
              ? "block"
              : "none";
    
          if (display === "block") {
            this.containerDiv.style.left = divPosition.x + "px";
            this.containerDiv.style.top = divPosition.y + "px";
          }
    
          if (this.containerDiv.style.display !== display) {
            this.containerDiv.style.display = display;
          }
        }
    }

    const map = useMap() //Acessar o próprio mapa
    const [marcadores, setMarcadores] = useState<{[key:string]: Marker}>({}) //Acessar todos os marcadores presentes no mapa
    const clusterer = useRef<MarkerClusterer | null>(null) //Acessar o cluster de marcadores
    const [statusPopup, setStatusPopup] = useState<boolean>(true)
    const [popup, setPopup] = useState<Popup | null>(null)

    useEffect(()=>{
        if(!map) return //Caso não tenha o mapa, não faça nada
        if(!clusterer.current){ //Caso não tenha um cluster, vamos configurá=lo pela primeira vez
            clusterer.current = new MarkerClusterer({ map, algorithm: new SuperClusterAlgorithm({
                radius: 100, // Aumente o valor para expandir o range de agrupamento
              }), })
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

    const getWordCloudDataWithString = (text: string) => {
        const wordsArray = text.split(' ')
        const wordCloudData:({text:string, value:number}[]) = []
        
        wordsArray.forEach(wordTarget => {
            let count = 0
            wordsArray.forEach((word) => {
                if (wordTarget === word) count = count+1
            })
            const inWordcloud = wordCloudData.some((wordCloud) => wordCloud.text === wordTarget)
            if(!inWordcloud) wordCloudData.push({text:wordTarget, value: count})
            else wordCloudData.forEach(wordCloud => {if(wordCloud.text === wordTarget) wordCloud = {text:wordCloud.text, value: count}})
        })

        const wordCloudDataSort = wordCloudData.sort((a, b) => b.value - a.value)
        const wordCloudDataSliced = wordCloudDataSort.slice(0, 20)

        return wordCloudDataSliced
    }

    useEffect(()=>{
        clusterer.current?.clearMarkers() //Sempre que os 'markers' mudarem, vamos excluir os markers que estavam apresentes no cluster e...
        clusterer.current = new MarkerClusterer(
            {map,

            algorithm: new SuperClusterAlgorithm({
                radius: 700, // Aumente o valor para expandir o range de agrupamento
            }),

            onClusterClick: (event, cluster) => {
                // popup?.setMap(null)
                // const listaDePontos = getPointsWithCluster(points, cluster.markers)
                // const posicaoDoCluster = {lat: cluster.position.lat(), lng: cluster.position.lng()}

                // if(cluster.markers){
                //     const content = document.createElement("div");
                //     content.id = "content";
                    
                //     const root = createRoot(content)

                //     root.render(<PopupContent listaDePontos={listaDePontos} closePopup={setStatusPopup}/>)

                //     const newPopup = new Popup(
                //         new google.maps.LatLng(posicaoDoCluster.lat, posicaoDoCluster.lng),
                //         content
                //     )

                //     setPopup(newPopup)

                //     newPopup.setMap(map)
                // }
            },

            renderer: { //Criando novo cluster com ícone personalizado
                render: ({ position, markers }) => {
                    const listaDePontosDoCluster = getPointsWithCluster(points, markers)
                    const depoimento = setStringDepo(listaDePontosDoCluster)
                    const depoimentoFormatado = getStringFiltered(depoimento)
                    const dataWordCloud = getWordCloudDataWithString(depoimentoFormatado)


                    const imageIcon = document.createElement('div')
                    imageIcon.style.width = '350px'
                    imageIcon.style.height = '200px'
                    imageIcon.id = 'content'
                    const root = createRoot(imageIcon)
                    root.render(<IconClusters data={dataWordCloud}/>)
                    return new google.maps.marker.AdvancedMarkerElement({
                        position,
                        content: imageIcon,
                        gmpClickable: true,
                    });
                }
            },
        })
        clusterer.current?.addMarkers(Object.values(marcadores)) //adicionamos os marcadores novos presentes no novo estado de 'markers'
        //Note que, 'markers' é um objeto, por isso usamos o 'Object.values' para pegar as instancias Marker propriamete dita
        // console.log(clusterer.current.clusters)
    }, [marcadores])

    useEffect(()=>{
        if(!statusPopup){
            popup?.setMap(null)
            setStatusPopup(true)
        } 
    }, [statusPopup])

    const openPopup = (ponto:point) => {
        popup?.setMap(null)
        if(ponto){
            const content = document.createElement("div");
            content.id = "content";
            const root = createRoot(content)
            root.render(<PopupContent listaDePontos={[ponto]} closePopup={setStatusPopup}/>)
            const newPopup = new Popup(
                new google.maps.LatLng(ponto.lat, ponto.lng),
                content
            )
            setPopup(newPopup)
            newPopup.setMap(map)
        }
    }

    return <>
    {
        points.map(point => <AdvancedMarker 
            position={point} 
            key={point.key}
            ref={marker => {
                // A função callback do atributo 'ref' recebe como argumento o própro elemento que o 'ref' está referenciando. É uma forma de acessá-lo em outra função diretamente
                setMarkerRef(marker, point.key)}}
            onClick={() => openPopup(point)}> 

                <span style={{
                    width: '50rem',
                    height: '50rem'
                }}>
                    <img src={`https://quickchart.io/wordcloud?text=${point.depo}&fontScale=16&maxNumWords=20&fontWeight=bold&fontFamily=sanf&colors=["000"]&padding=8&case=upper&rotation=0&width=330&height=180`} alt="Depoimento" />
                </span>
        </AdvancedMarker>)
    }
    </>
}