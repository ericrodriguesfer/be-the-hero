import React, {useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import './style.css';
import hereoesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg';

function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();
    localStorage.setItem('ongId', '');

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        }catch(err){
            alert('Falha no login, tente novamente.');
        }
    }

    return(
        <div className="container-Logon">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input required placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>

                    <Link to="/register" className="back-link"><FiLogIn size={16} color="#e02041"></FiLogIn>Não tenho cadastro</Link>
                </form>
            </section>

            <img src={hereoesImg} alt="heroes"/>
        </div>
    );
}

export default Logon;