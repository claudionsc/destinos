import React from "react";
import styled from "styled-components";


const FormStyle = styled.div`
    width: 90vw;
    height: 90vh;
    display: flex;
    background-color: blueviolet;

`

const FormS= styled.form`
    width: 60%;
    height: 90%;
    display: flex;
    flex-direction: column;
    margin: auto;
    background-color: yellowgreen;


`

function Form(){

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
                        <select name="país">
                            <option value="1">País 1</option>
                            <option value="2">País 2</option>
                            <option value="3">País 3</option>
                            <option value="4">País 4</option>
                            <option value="5">País 5</option>
                        </select>
                        <select name="cidade">
                            <option value="1">cidade 1</option>
                            <option value="2">cidade 2</option>
                            <option value="3">cidade 3</option>
                            <option value="4">cidade 4</option>
                            <option value="5">cidade 5</option>
                        </select>

                    </div>
                </div>
                    <input className="btn" type="submit" placeholder="nada" />
            </FormS>
        </FormStyle>


    )
    
}

export default Form