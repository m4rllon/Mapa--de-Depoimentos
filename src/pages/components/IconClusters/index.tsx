import { useState } from 'react';
import WordCloud from 'react-d3-cloud';
import { School } from '../../../data/schools';

interface props {
    data: {text:string, value:number}[]
    points: School[]
    colors: string[]
}

type wordCloudProps = {
    font?: string,
    hasText?: boolean,
    height?: number,
    padding?: number,
    rotate?: number,
    size?: number,
    style?: string,
    text?:string,
    value?:number,
    weight?: string,
    width?: number,
    x?: number,
    x0?: number,
    x1?: number,
    xoff?: number,
    y?: number,
    y0?: number,
    y1?: number,
    yoff?: number,
}

const IconClusters = ({data, points, colors}:props) => {
    const [wordTarget, setWordTarget] = useState<wordCloudProps | null>(null)
    const [popupStatus, setPopupStatus] = useState(false)
    const [index, setIndex] = useState(0)

    const antes = () => {
      if(index - 1 >= 0) {
        const newIndex = index - 1
        setIndex(newIndex)
      }
    }
  
    const depois = () => {
      if(index+1 < points.length){
        const newIndex = index + 1
        setIndex(newIndex)
      }
    }

    return <div style={{position:'relative'}}>
    <WordCloud 
    data={data} 
    height={200} 
    width={350}
    fontSize={()=> 24}
    fontWeight={()=> 'bold'}
    onWordClick={(_, b)=> {
        setWordTarget(b)
        setPopupStatus(!popupStatus)
    }}
    rotate={()=>0}
    random={() => 0.5}
    padding={()=> 4}
    fill={() => colors[Math.floor(Math.random() * colors.length)]} 
    />

    {
        popupStatus && wordTarget && <div 
        style={
            {
                backgroundColor: '#FEF1EE', 
                width: '350px', 
                height: 'auto', 
                position:'absolute', 
                top: (wordTarget.y) ? wordTarget.y+120 : 120, 
                left: wordTarget.x,
                borderRadius: '16px',
                padding: '16px',
                zIndex: 9999, /* Valor alto para sobrepor as outras divs */
            }
        }>
            <span>
                <button onClick={() => setPopupStatus(!popupStatus)}>X</button>
                <h1>A palavra "{wordTarget?.text}" apareceu {wordTarget?.value} vezes!</h1>
            </span>
            <span>
              <h1>"</h1>
              <h1>{points[index].depo}</h1>
            </span>
            <span>
              <span>
                <button onClick={antes}>{'<'}</button>
                <button onClick={depois}>{'>'}</button>
              </span>
              <p>{points[index].name}</p>
            </span>
        </div>
    }
</div>
}

export default IconClusters