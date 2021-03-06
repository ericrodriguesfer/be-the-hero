import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import './style.css'
import '../../global.css';
import logoImg from '../../assets/logo.svg';

toast.configure();

function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const history = useHistory();

    const notify = () => {
        toast.success('Erro no cadastro, tente novamente.', { className: 'toastify' });
    };

    const notifySuccess = (id) => {
        toast.success(`Seu ID de acesso: ${id}.`, { className: 'toastify', autoClose: false });
    };

    async function hangleRegister(e){
        e.preventDefault();

        const data = {name,  email, whatsapp, city, uf,};

        try{
            const response = await api.post('ongs', data);
            notifySuccess(response.data.id);
            history.push('/');
        } catch(err) {
            notify();
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem casos da sua ONG.</p>

                    <Link to="/" className="back-link"><FiArrowLeft size={16} color="#e02041"></FiArrowLeft>Já tenho cadastro</Link>
                </section>

                <form onSubmit={hangleRegister}>
                    <input required placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)}/>
                    <input required type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input required placeholder="Whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>

                    <div className="group-input">
                        <input required placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/>
                        <input required placeholder="UF" style={{ width: 80 }} value={uf} onChange={e => setUf(e.target.value)}/>
                    </div>

                    <button className="button" type="submit">Registrar</button>
                </form>
            </div>
        </div>
    );
}

export default Register;