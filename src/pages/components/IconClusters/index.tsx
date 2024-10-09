import { useState } from 'react';
import WordCloud from 'react-d3-cloud';

interface props {
    data: {text:string, value:number}[]
}

const IconClusters = ({data}:props) => {
    const [wordTarget, setWordTarget] = useState(null)
    const [popupStatus, setPopupStatus] = useState(false)
    const colors = ['#333333', '#000000', '#131212', '#222221'];

    return <div style={{position:'relative'}}>
    <WordCloud 
    data={data} 
    height={200} 
    width={350}
    fontSize={()=> 24}
    fontWeight={()=> 'bold'}
    onWordClick={(_, b)=> {
        console.log(b)
        setWordTarget(b)
        setPopupStatus(!popupStatus)
    }}
    rotate={()=>0}
    random={() => 0.5}
    padding={()=> 4}
    fill={() => colors[Math.floor(Math.random() * colors.length)]} 
    />
    {
        popupStatus && <div style={{backgroundColor: '#FEF1EE', width: '350px', height: '250px', position:'absolute', top: wordTarget.y+120, left: wordTarget.x}}>
            <h1>{wordTarget?.text}</h1>
        </div>
    }
</div>
}

export default IconClusters