import WordCloud from 'react-d3-cloud';

const data = [
  { text: 'Hey', value: 1000 },
  { text: 'lol', value: 200 },
  { text: 'first impression', value: 800 },
  { text: 'very cool', value: 1000000 },
  { text: 'duck', value: 10 },
];

const IconClusters = () => {
    return <div style={{width: '100px', height: '100px'}}>
        {/* <h1>novo cluster</h1> */}
        <WordCloud data={data} height={100} width={100}/>
    </div>
}

export default IconClusters