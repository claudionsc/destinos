import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { FormStyle, FormS } from "./Styles";
import { Card } from "./Card";
import { useForm } from "react-hook-form";

function Form(){

    const {formState: { errors }, register, handleSubmit} = useForm()

    const [paises, setPaises] = useState([])
    const [cidades, setCidades] = useState([])

    // const [nome, setNome] = useState("");
    // const [email, setEmail] = useState("");
    // const [fone, setFone] = useState("");
    // const [cpf, setCpf] = useState("");
    const [error, setError] = useState("");

    const [info, setInfo] = useState(false)

    const [getPais, setGetPaís] = useState(null)
    const [getCidades, setGetCidades] = useState(null)
    const [getNome, setGetNome] = useState(null)

    


    useEffect(() => {
        axios.get("https://amazon-api.sellead.com/country")
        .then(response => {
            setPaises(response.data)
        })

    }, [])
    useEffect(() => {
        axios.get("https://amazon-api.sellead.com/city")
        .then(response => {
            setCidades(response.data)
        })

    }, [])



  const onSubmit = (e) => {
    // if ( !e.nome | !e.email | !e.fone | !e.cpf | getPais === null | getCidades === null) {
    //     setError("Preencha todos os campos");
        
        
    // }else{
        setInfo(true)
        setGetNome(() => e.nome)
        setError("")
    // }  
    
    console.log(getPais)
    console.log(getCidades)
    console.log(getNome)
  }



  

    return(
        <FormStyle>
            <FormS onSubmit={handleSubmit(onSubmit)}>
                <div className="form-g">
                    <div className="dados">
                        <p>Dados Pessoais</p>
                        <input className="input" type="text"
                        placeholder="Nome"
                        {...register("nome", {
                            required: "Inserir nome",
                          })}
                        // value={nome}
                        />
                        {errors.nome && <p className="errors">{errors.nome.message}</p>}
                        <input className="input" type="email"
                        // name="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Inserir email",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: "endereço de email inválido"
                            }
                          })}
                        // value={email}
                        />
                        {errors.email && <p className="errors">{errors.email.message}</p>}
                        <input className="input" type="text" 
                        placeholder="Telefone"
                        {...register("fone", {
                            required: "Inserir telefone",
                            pattern: {
                              value: /^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/i,
                              message: "Telefone inválido"
                            }
                          })}
                        // value={fone}
                        />
                        {errors.fone && <p className="errors">{errors.fone.message}</p>}
                        <input className="input" type="text"
                        placeholder="CPF"
                        {...register("cpf")}
                        // value={cpf}
                        />
                    </div>

                    <div className="destinos">

                        <p>Destinos de interesse</p>
                        <select onChange={(e) => setGetPaís(e.target.value)}>
                        <option title={"name"} key={"select"} value={"select"}></option>
                            {paises.map(país => {
                                return (
                                <option
                                key={país.code} 
                                value={país.name_ptbr}
                                
                                >
                                {país.name_ptbr}
                                </option>
                                )})
                            }
                        </select>


                        <select name="cidade" onChange={(e) => setGetCidades(e.target.value)}>
                        <option title={"name"} key={"select"} value={"select"}></option>
                        {cidades.map(cidade => {
                            return (
                                <option 
                                key={cidade.id} 
                                value={cidade.name}
                                >
                                   {cidade.name_ptbr}
                                </option>
                                )})
                        }
                        </select>
                    </div>

                {info === true &&
                    <Card >
                        <h3>Parabéns, {getNome}! O destino escolhido foi {getPais} para país ou {getCidades} para cidade.</h3>
                        <button className="btn" onClick={() => setInfo(false)}>x</button>
                    </Card>
                }
                </div>
                    <label>{error}</label>
                    <input className="btn" type="submit" placeholder="Enviar" />
            </FormS>
        </FormStyle>


    )
    
}

export default Form