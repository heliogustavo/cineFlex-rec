import styled from "styled-components";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Assento from "../../components/Assento";


export default function SeatsPage() {

    const [dadosAssentos, setDadosAssentos] = useState(null);
    const [listaDeAssentos, setListaDeAssentos] = useState([]);
    const cor = {
        indisponivel: ' #FBE192',
        bordaIndisponivel: '#F7C52B',
        disponivel: '#C3CFD9',
        bordaDisponivel: '#7B8B99',
        selecionado: '#1AAE9E',
        bordaSelecionado: '#0E7D71',
    };
    const [name, setName] = useState("");
	const [cpf, setCpf] = useState("");
    const params = useParams();
    const [assentoSelecionado, setAssentoSelecionado] = useState([])


    useEffect(() => {
        const requisicao = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${params.idSessao}/seats`)

        requisicao.then(dados => {
            setDadosAssentos(dados.data)
            setListaDeAssentos(dados.data.seats)

        })
    }, []);




    function reserva (event) {
        console.log("oi")
		event.preventDefault(); 
        if(assentoSelecionado.length>0){
            const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", {
                ids: assentoSelecionado,
                name: name,
                cpf: Number(cpf)
            });

            promise.then((response)=>{
                let inforDaReserva = {
                    title: movieTitle,
                    day: movieDay,
                    hour: movieHour,
                    seats: seatName,
                    costumer: name,
                    costumerCpf: cpf
                };
                navigate("/sucesso", {state: {bookingInfo}});
            })
        } else{
            alert("Selecione pelo menos um assento!");
        }
    }

    



    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {listaDeAssentos.map(cadaAssento =>
                    
                        <Assento cadaAssento={cadaAssento} assentoSelecionado={assentoSelecionado} setAssentoSelecionado={setAssentoSelecionado} key={cadaAssento.id}></Assento>
                )
                }

            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircleSelecionado theme={cor} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircleDisponivel theme={cor} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircleIndisponivel theme={cor} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

                 <FormContainer onSubmit={reserva}>
                        <span> Comprador:</span>
                        <input type="text" 
                               value={name} 
                               required 
                               onChange={e => setName(e.target.value)}
                               placeholder="Digite seu nome..." 
                        /> 
                        <span>CPF do Comprador:</span>
                        <input type="text" 
                               value={cpf} 
                               required 
                               onChange={e => setCpf(e.target.value)}
                               placeholder="Digite seu CPF..."
                        /> 
                        <button type="submit">Reservar Assento(s)</button> 
                </FormContainer>

            {dadosAssentos ?

                <FooterContainer>

                    <div>
                        <img src={dadosAssentos.movie.posterURL} alt="poster" />
                    </div>
                    <div>
                        <p>{dadosAssentos.movie.title}</p>
                        <p>{dadosAssentos.day.weekday} - {dadosAssentos.day.date}</p>
                    </div>
                </FooterContainer> 
         :
         <></>   
}
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
        width:225px;
        height: 42px;
        border-Radius: 3px;
        background-color:#E8833A;
    }
    input {
        Width: 327px;
        Height: 51px;
        ::placeholder{
            font-weight: 400;
            font-style: italic;
            font-size: 18px;
            line-height: 21.09px;
        }
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;                            
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircleSelecionado = styled.div`
    border: 1px #0E7D71;         // Essa cor deve mudar
    background-color: #1AAE9E;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionCircleDisponivel = styled.div`
    border: 1px  #7B8B99;         // Essa cor deve mudar
    background-color: #C3CFD9;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionCircleIndisponivel = styled.div`
    border: 1px #F7C52B;         // Essa cor deve mudar
    background-color:   #FBE192;    // Essa cor deve mudar 
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`