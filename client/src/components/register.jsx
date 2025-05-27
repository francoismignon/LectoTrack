import React, {useState} from "react";
import axios from "axios";

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/register", {
                username,
                password
            });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Nom'
                    value={username}
                    name='username'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="Enregistrer" />
            </form>
        </div>
    );
}
export default Register;