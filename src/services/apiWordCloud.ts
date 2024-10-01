import axios from "axios";

const url = 'https://api.textkit.ai/generate/wordcloud?colormap=Blues'
const payload = 'This is a test of the TextKit wordcloud API endpoint'
const headers = {
    'X-API-Key': 'your_api_key_here',
    'Content-Type': 'text/plain'
}

export const makeRequest = async () => {
    try{
        const response = await axios.get(url, {
            headers: headers,
            data: payload
        })

        console.log(response.data)
    } catch (err){
        console.log('Ocorreu um erro', err)
    }
}