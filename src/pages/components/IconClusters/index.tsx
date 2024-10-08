import WordCloud from 'react-d3-cloud';

interface props {
    data: {text:string, value:number}[]
}

const IconClusters = ({data}:props) => {
    return <div style={{width: '100px', height: '100px'}}>
        {/* <h1>novo cluster</h1> */}
        <WordCloud data={data} height={100} width={100}/>
    </div>
}

export default IconClusters