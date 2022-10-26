import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { FormStyle, FormS } from "./Styles";

function Form(){

    const [paises, setPaises] = useState([])
    const [cidades, setCidades] = useState([])


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
            console.log(cidades)
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
    console.log(lista)

  

    return(
        <FormStyle>
            <FormS>
                <div className="form-g">
                    <div className="dados">
                        <p>Dados Pessoais</p>
                        <input className="input" type="text"
                        placeholder="Nome" />
                        <input className="input" type="email"
                        placeholder="Email" />
                        <input className="input" type="text" 
                        placeholder="Telefone" />
                        <input className="input" type="text"
                        placeholder="CPF" />
                    </div>
                    <div className="destinos">
                        <p>Destinos de interesse</p>
                        <select name="paises" onChange={(e) => setCodigo(e.target.value)}>
                            {paises.map(país => {
                                return (
                                <option 
                                key={país.id} 
                                value={país.code}
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
                                value={list.country_code}>
                                    {list.name !== null ? 
                                     <>{list.name}</> 
                                    :<>{list.name_ptbr}</> }
                                </option>
                                )})
                            }
                          
                        
                        </select>

                    </div>
                </div>
                    <input className="btn" type="submit" placeholder="nada" />
            </FormS>
        </FormStyle>


    )
    
}

export default Form