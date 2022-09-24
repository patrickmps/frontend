import React, {useState, useEffect} from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import api from "../../services/api";
import '../../reset.css';
import './style.css';

export default function User(){
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        api.get('users').then(response => {
            setUsers(response.data);
        });
    }, []);

    async function handleDelete(id) {
        try {
            await api.delete(`/users/${id}`);
            setUsers(users.filter(user => user.id != id));
        } catch (error) {
            alert(error)
        }
    }

    const navigate = useNavigate();

    return (
        <div id="user-container">
            <div id="container-title">
                <h1>LISTA DE USUÁRIOS</h1>
                <Link id="create-link" onClick={()=>{
                    navigate('/create')
                    navigate(0)
                    }}>+</Link>
            </div>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id}>
                        <div id="content">
                            <div>
                                <strong>Nome</strong>
                                <p>{user.name}</p>
                                <strong>Idade</strong>
                                <p>{user.idade}</p>
                            </div>
                            
                            <div>
                                <strong>Email</strong>
                                <p>{user.email}</p>
                                <strong>Empresa</strong>
                                <p>{user.empresa}</p>
                            </div>
                        </div>

                        <div className="actions">
                            <button className="button" type="button" onClick={() => handleDelete(user.id)}>Deletar</button>
                            <Link className="button" onClick={()=>{
                                navigate(`/update/${user.id}`)
                                navigate(0)
                            }}>Acessar</Link>
                        </div>
                    </li>
                 ))}

                
            </ul>
        </div>
    );
}