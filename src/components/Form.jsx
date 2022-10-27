import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { FormStyle, FormS } from "./Styles";

import { Card } from "./Card";
import { useForm } from "react-hook-form";

function Form(props){

    const {register, handleSubmit} = useForm()

    const [paises, setPaises] = useState([])
    const [cidades, setCidades] = useState([])

    // const [nome, setNome] = useState("");
    // const [email, setEmail] = useState("");
    // const [fone, setFone] = useState("");
    // const [cpf, setCpf] = useState("");
    const [error, setError] = useState("");

    const [info, setInfo] = useState(false)

    


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
            // console.log(cidades)
        })

    }, [])

    const [codigo, setCodigo] = useState(null)

    var lista = []
    const VerificaCodigo = (codigo, cidades) => {
        {cidades.map(cidade => {
                if(codigo === cidade.country_code){
                lista.push(cidade)
            }
            })
            }
        return lista
    }
    VerificaCodigo(codigo, cidades)
    // console.log(lista)

    let card = {}
  const onSubmit = (e) => {
    if ( !e.nome | !e.email | !e.fone | !e.cpf) {
        setError("Preencha todos os campos");
        
        
    }else{
        setInfo(true)
        setError("")
        card = {
            nome: e.nome,
            cidade: e.cidades,
            // pais: e.target.value
        }

    }
    
    console.log(e)
  }  


  

    return(
        <FormStyle>
            <FormS onSubmit={handleSubmit(onSubmit)}>
                <div className="form-g">
                    <div className="dados">
                        <p>Dados Pessoais</p>
                        <input className="input" type="text"
                        placeholder="Nome"
                        {...register("nome")}
                        // value={nome}
                        />
                        <input className="input" type="email"
                        placeholder="Email"
                        {...register("email")}
                        // value={email}
                        />
                        <input className="input" type="text" 
                        placeholder="Telefone"
                        {...register("fone")}
                        // value={fone}
                        />
                        <input className="input" type="text"
                        placeholder="CPF"
                        {...register("cpf")}
                        // value={cpf}
                        />
                    </div>

                    <div className="destinos">

                        <p>Destinos de interesse</p>
                        <select onChange={(e) => setCodigo(e.target.value)} >
                        <option title={"name"} key={"select"} value={"select"}>Selecione o país</option>
                            {paises.map(país => {
                                return (
                                <option
                                key={país.id} 
                                value={país.code}
                                name={"pais"}
                                // {...register(this.país.name_ptbr)}
                                
                                >
                                {país.name_ptbr}
                                </option>
                                )})
                            }
                        </select>


                        <select name="cidade">
                        {lista.map(list => {
                            return (
                                <option 
                                key={list.id} 
                                value={list.name}
                                {...register("listacidade")}
                                >
                                    {list.name !== null ? 
                                     <>{list.name}</> 
                                    :<>{list.name_ptbr}</> }
                                </option>
                                )})
                        }
                        </select>
                    </div>

                {info === true &&
                    <Card >{card.nome}</Card>
                }
                </div>
                    <label>{error}</label>
                    <input className="btn" type="submit" placeholder="Enviar" />
            </FormS>
        </FormStyle>


    )
    
}

export default Form