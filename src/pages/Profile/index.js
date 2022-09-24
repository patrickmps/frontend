import React, {useState, useEffect} from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import '../../reset.css';
import './style.css'
import api from "../../services/api";

export default function Profile() {
    const {id} = useParams();
    const navigate = useNavigate();
    const initUser = {
        name: '',
        email: '',
        idade: 0,
        empresa: ''
    }

    const [user, setUser] = useState(initUser);

    useEffect(() => {
        if(id){
            api.get(`/users/${id}`).then(response => {
                setUser(...response.data);
            });
        }
    }, []);

    function onSubmit(ev) {
        ev.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id ? `/users/${id}` : '/users';
        api[method](url, user).then((response) => {
            navigate('/') 
            navigate(0)
        });
    }

    function onChange(ev) {
        const {name, value} = ev.target;
        setUser({...user, [name]:value});
    }

    return (
        <div id="profile-container">
            <h1>Cadastro</h1>
            <form onSubmit={onSubmit}>
                <strong>Nome:</strong>
                <input name="name" type={"text"} onChange={onChange} value={user.name} />

                <strong>Email:</strong>
                <input name="email" type={"email"} onChange={onChange} value={user.email}/>

                <strong>Idade:</strong>
                <input name="idade" type={"number"} onChange={onChange} value={user.idade}/>

                <strong>Empresa:</strong>
                <input name="empresa" type={"text"} onChange={onChange} value={user.empresa}/>

                <div className="actions">
                    <Link className="button"  onClick={()=>{
                        navigate('/')
                        navigate(0)
                        }}>Voltar</Link>
                    <button className="button" type="submit">Salvar</button>
                </div>
            </form>
        </div>
    );
}