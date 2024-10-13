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

export default getWordCloudDataWithString