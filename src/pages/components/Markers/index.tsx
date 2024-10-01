import { Marker, MarkerClusterer, SuperClusterAlgorithm } from "@googlemaps/markerclusterer"
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps"
import { useEffect, useRef, useState } from "react"
import { renderToString } from "react-dom/server"
import { getPointsWithCluster } from "../../../utils/getPointsWithCluster"
import { getStringFiltered } from "../../../utils/filterStrings"
import { setStringDepo } from "../../../utils/setStringDepo"
import { Popup } from "../../../classes/Popup"

type point = google.maps.LatLngLiteral & {key:string, name:string, depo:string}
type Props = {points: point[]}

export default function Markers({points}:Props){
    const map = useMap() //Acessar o próprio mapa
    const [marcadores, setMarcadores] = useState<{[key:string]: Marker}>({}) //Acessar todos os marcadores presentes no mapa
    const clusterer = useRef<MarkerClusterer | null>(null) //Acessar o cluster de marcadores
    const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null)
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

    useEffect(()=>{

        clusterer.current?.clearMarkers() //Sempre que os 'markers' mudarem, vamos excluir os markers que estavam apresentes no cluster e...
        
        clusterer.current = new MarkerClusterer(
            {map,

            algorithm: new SuperClusterAlgorithm({
                radius: 310, // Aumente o valor para expandir o range de agrupamento
            }),

            onClusterClick: (_, cluster) => {
                const infoWindowInstance = new google.maps.InfoWindow()
                setInfoWindow(infoWindowInstance)

                if(cluster.markers){
                    // class Popup extends google.maps.OverlayView {
                    //     position: google.maps.LatLng;
                    //     containerDiv: HTMLDivElement;
                    
                    //     constructor(position: google.maps.LatLng, content: HTMLElement) {
                    //       super();
                    //       this.position = position;
                    
                    //       content.classList.add("popup-bubble");
                    
                    //       // This zero-height div is positioned at the bottom of the bubble.
                    //       const bubbleAnchor = document.createElement("div");
                    
                    //       bubbleAnchor.classList.add("popup-bubble-anchor");
                    //       bubbleAnchor.appendChild(content);
                    
                    //       // This zero-height div is positioned at the bottom of the tip.
                    //       this.containerDiv = document.createElement("div");
                    //       this.containerDiv.classList.add("popup-container");
                    //       this.containerDiv.appendChild(bubbleAnchor);
                    
                    //       // Optionally stop clicks, etc., from bubbling up to the map.
                    //       Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
                    //     }
                    
                    //     /** Called when the popup is added to the map. */
                    //     onAdd() {
                    //       this.getPanes()!.floatPane.appendChild(this.containerDiv);
                    //     }
                    
                    //     /** Called when the popup is removed from the map. */
                    //     onRemove() {
                    //       if (this.containerDiv.parentElement) {
                    //         this.containerDiv.parentElement.removeChild(this.containerDiv);
                    //       }
                    //     }
                    
                    //     /** Called each frame when the popup needs to draw itself. */
                    //     draw() {
                    //       const divPosition = this.getProjection().fromLatLngToDivPixel(
                    //         this.position
                    //       )!;
                    
                    //       // Hide the popup when it is far out of view.
                    //       const display =
                    //         Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
                    //           ? "block"
                    //           : "none";
                    
                    //       if (display === "block") {
                    //         this.containerDiv.style.left = divPosition.x + "px";
                    //         this.containerDiv.style.top = divPosition.y + "px";
                    //       }
                    
                    //       if (this.containerDiv.style.display !== display) {
                    //         this.containerDiv.style.display = display;
                    //       }
                    //     }
                    // }

                    const content = document.createElement("div");
                    content.innerText = "Hello World!";
                    content.id = "content";

                    const popup = new Popup(
                        new google.maps.LatLng(-15.810712, -47.930336),
                        content
                    )
                    popup.setMap(map)
                    // const pontosDoCluster = getPointsWithCluster(points, cluster.markers)
                    // const contentInfoWindow = renderToString( <div style={{ display:'flex', flexDirection:'column' }}>
                    //     {
                    //         pontosDoCluster.map(ponto => (<div style={{ display:'flex', flexDirection:'column' }}>
                    //             <h1>"</h1>
                    //             <span style={{display:'flex', flexDirection: 'column'}}>
                    //                 <p>{ponto.name}</p>
                    //                 <p>{ponto.depo}</p>
                    //             </span>
                    //         </div>))
                    //     }
                    // </div>);

                    // infoWindowInstance.setContent(contentInfoWindow)
                    // infoWindowInstance.setPosition(cluster.position)
                    // infoWindowInstance.open(map)
                }
            },

            renderer: { //Criando novo cluster com ícone personalizado
                render: ({ position, markers }) => {
                    const listaDePontosDoCluster = getPointsWithCluster(points, markers)
                    const depoimento = setStringDepo(listaDePontosDoCluster)
                    const depoimentoFormatado = getStringFiltered(depoimento)
                    return new google.maps.Marker({
                        position,
                        icon: {
                            url: `https://quickchart.io/wordcloud?text=${depoimentoFormatado}&fontScale=16&maxNumWords=20&fontWeight=bold&colors=["000"]&padding=3&case=upper&rotation=0&width=140&height=140`,
                            origin: new google.maps.Point(0, 0),
                        },
                        optimized:false,
                    });
                }
            },
        })
        
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
                <span style={{
                    width: '50rem',
                    height: '50rem'
                }}>
                    <img src={`https://quickchart.io/wordcloud?text=${point.depo}&maxNumWords=20&width=120&height=120&fontWeight=bold&colors=["000"]&padding=0&case=upper&rotation=0`} alt="" />
                </span>
        </AdvancedMarker>)
    }
    </>
}