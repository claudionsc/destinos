import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { FormStyle, FormS } from "./Styles";
import { Card } from "./Card";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

function Form(){

    // SELECIONANDO HOOK PARA CONTROLE DOS FORMULÁRIOS

    const {formState: { errors }, register, handleSubmit} = useForm()

    // HOOKS PARA CONTROLE DE ESTADO DA REQUISIÇÃO À API
    const [paises, setPaises] = useState([])
    const [cidades, setCidades] = useState([]);

    // HOOK PARA VALIDAR ERRO
    const [error, setError] = useState("");

    // HOOK PARA RENDERIZAÇÃO CONDICIONAL DO CARD
    const [card, setCard] = useState(false)

    // HOOOKS PARA EXIBIR DADOS NO CARD
    const [getPais, setGetPaís] = useState(null)
    const [getCidades, setGetCidades] = useState(null)
    const [getNome, setGetNome] = useState(null)

    // MÉTODOS GET PARA API
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


    // FUNÇÃO PARA ESCOLHA DO PAÍS/CIDADE, ALTERAR ESTADO DO CARD E ADICIONAR NOME PARA SER EXIBIDO NO CARD
  const onSubmit = (e) => {
    if ( getPais === null | getCidades === null) {
        setError("Preencha todos os campos");
        
        
    }else{
        setCard(true)
        setGetNome(() => e.nome)
        setError("")
    }  
  }

//   FORMULÁRIOS

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
                        />
                        {errors.nome && <p className="errors">{errors.nome.message}</p>}
                        <input className="input" type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Inserir email",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: "endereço de email inválido"
                            }
                          })}
                        />
                        {errors.email && <p className="errors">{errors.email.message}</p>}
                        <InputMask className="input" type="tel" 
                        pattern="(\([0-9]{2}\))\s([9]{1})?([0-9]{5})-([0-9]{4})"
                        placeholder="Telefone"
                        mask="(99) 99999-9999"
                        {...register("fone", {
                            required: "Inserir telefone",
                            pattern: {
                              message: "Telefone inválido"
                            }
                          })}
                        />
                        {errors.fone && <p className="errors">{errors.fone.message}</p>}
                        <InputMask className="input" type="text"
                        placeholder="CPF"
                        pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" 
                        mask="999.999.999-99"
                        {...register("cpf", {
                            required: "Inserir o cpf",
                            pattern: {
                              message: "Cpf inválido"
                            }
                          })}
                          />
                          {errors.cpf && <p className="errors">{errors.cpf.message}</p>}
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
                                {...register("país", {
                                    required: "Selecione o país",
                                  })}
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
                                {...register("cidade", {
                                    required: "Selecione a cidade",
                                  })}
                                >
                                   {cidade.name_ptbr}
                                </option>
                                )})
                        }
                        </select>
                    </div>

                {card === true &&
                    <Card >
                        <h3>Boa escolha, {getNome}! Destinos escolhidos: {getPais} para país ou {getCidades} para cidade.</h3>
                        <button className="btn2" onClick={() => setCard(false)}>x</button>
                    </Card>
                }
                </div>
                    <label className="errors label-err"><h3>{error}</h3></label>
                    <input className="btn" type="submit" placeholder="Enviar" />
            </FormS>
        </FormStyle>


    )
    
}

export default Form