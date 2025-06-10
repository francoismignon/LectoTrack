import axios from "axios";

function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();



    async function handleSubmit(e){
        e.preventDefault();

        try {
            const {data} = await axios.post('http://localhost:3000/api/v1/auth/login', {
                login,
                password
            })
            //si mode de passe incorrect, l'erreur est leve dans axios
            localStorage.setItem('accessToken', data.token);
            navigate('/bibliotheque');
            
        } catch (error) {
            if(error.response.status === 401){
                alert('Identifiants incorrects');
            }
        }
    }


    function handleClick() {
        navigate('/inscription');
    }


    function handlePasswordChange(e) {
        const { name, value } = e.target;
        setPassword(value);
    }

    function handleLoginChange(e) {
        const { name, value } = e.target;
        setLogin(value);
    }

    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="login">Pseudo</label>
                <input onChange={handleLoginChange} type="text" id='login' name='login' required />

                <label htmlFor="password">Mot de passe</label>
                <input onChange={handlePasswordChange} type="password" name="password" id="password" required />
                <input type="submit" value="Connexion" />
            </form>
            <label>Pas encore inscrit ?</label>
            <input onClick={handleClick} type="button" value="Connexion" />
        </div>
    );
}
export default LoginPage;