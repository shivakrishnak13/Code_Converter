const express = require("express");
const cors = require("cors");
require('dotenv').config();
const {Configuration,OpenAIApi} = require("openai");

const port = process.env.PORT || 5001;

const app=express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("<h2>Code Converter</h2>");
});

const configuration = new Configuration({
    apiKey:process.env.OPEN_AI_APIKEY,
});

const openai = new OpenAIApi(configuration);

app.use("/converter",async (req,res)=> {
    const {language,code} = req.body;
    const prompt = `convert the below code into  ${language} language without explaination ${code}`

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages : [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });
        const convertedCode = response.data.choices[0].message;
        return res.status(200).json({code: convertedCode});
    } catch (error) {
        console.log({error: error.message})
    }
});

app.use("/debugger",async (req,res)=> {
    const {code} = req.body;
    const prompt = `Help me to Debogg this code and expalin the code line by line with clear cut in smaller and shows errors apart . code :  ${code}`

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages : [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });
        const convertedCode = response.data.choices[0].message;
        return res.status(200).json({code: convertedCode});
    } catch (error) {
        console.log({error: error.message})
    }
});

app.use("/quality",async (req,res)=> {
    const {code} = req.body;
    const prompt = `Help me to check quality of this code and check the code in all aspects with quality percentage  . code :  ${code}`

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages : [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });
        const convertedCode = response.data.choices[0].message;
        return res.status(200).json({code: convertedCode});
    } catch (error) {
        console.log({error: error.message})
    }
});



app.listen(port , ()=>{
    try {
        console.log(`server is connected and running on http://localhost:${port}`)
    } catch (error) {
        console.log(error.message)
    }
});