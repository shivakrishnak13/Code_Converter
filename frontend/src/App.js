import { useState } from 'react';
import './App.css';
import MyAceEditor from './components/MyAceEditor';
import { Box, Button, Flex, Select, Spacer, Text } from '@chakra-ui/react';
import axios from "axios"


function App() {

let URL = "http://localhost:8080"


  const [code, setCode] = useState("console.log('Hello World')");
  const [presentLang, setLang] = useState(null); // Fixed the variable name here
  const [convertlang,setconvertLang] = useState("");
  const [convertedcode ,setconvertedocde] = useState("")
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const enteredLanguage = (e) => {
    setLang(e.target.value);
    console.log(`The language is ${e.target.value}`); 
  };

  //Code Code converting 

  const handleConvert = () =>{
      axios.post(`${URL}/converter`,{language: convertlang,code: code}).then((res)=>{
         console.log(res.data)
         setconvertedocde(res.data.code.content)
      }).catch((err)=> console.log(err))
  }

  //code debugger
  const handleDebugger = () =>{
    axios.post(`${URL}/debugger`,{code: code}).then((res)=>{
      console.log(res.data)
      setconvertedocde(res.data.code.content)
   }).catch((err)=> console.log(err))
}
  

// quality checker
const handleQuality = () =>{
  axios.post(`${URL}/quality`,{code: code}).then((res)=>{
    console.log(res.data)
    setconvertedocde(res.data.code.content)
 }).catch((err)=> console.log(err))
}


  return (
    <div>
      <Flex mt={10}>
        <Spacer/>
      <Select onChange={enteredLanguage} width={"200px"}>
        <option value={"text"}>select language</option>
        <option value={"python"}>Python</option>
        <option value={"java"}>Java</option>
        <option value={"text"}>JavaScript</option>
        <option value={"csharp"}>C#</option>
        <option value={"c_cpp"}>C++</option>
        <option value={"php"}>php</option>
      </Select>
      <Spacer/>
      <Select onChange={(e)=> setconvertLang(e.target.value)}  width={"200px"}>
        <option value={""}>convert to </option>
        <option value={"Python"}>Python</option>
        <option value={"Java"}>Java</option>
        <option value={"JavaScript"}>JavaScript</option>
        <option value={"Php"}>php</option>
        <option value={"C++"}>C++</option>
        <option value={"C#"}>C#</option>
      </Select>
      <Spacer/>
      <Button colorScheme={'cyan'} onClick={handleConvert}>Convert</Button>
      <Spacer/>
      <Button colorScheme={'facebook'} onClick={handleDebugger}>Debugger</Button>
      <Spacer/>
      <Button colorScheme={"purple"} onClick={handleQuality}>Quality Checker</Button>
      <Spacer/>
      </Flex>
     
       <Flex mt={5}>
      <MyAceEditor code={code} onChange={handleCodeChange} language={presentLang} />

      <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      bg="gray.50"
      minHeight="200px"
      width={"50%"}
      overflowWrap={"hidden"}
      >
       <pre style={{overflowWrap:"hidden"}}>
        <code style={{overflowWrap:"break-word"}} >{convertedcode}</code>
      </pre>
    </Box>

       </Flex>
    </div>
  );
}

export default App;
