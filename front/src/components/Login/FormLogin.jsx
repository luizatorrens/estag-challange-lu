import styles from "./FormLogin.module.css"
import { useState, useEffect } from "react";

export default function FormLogin() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        setTimeout(function(){
            setMsg("");
        }, 5000);
    }, [msg]);


    const handleInputChange  = (e, type) => {
        switch(type){
            case "user":
                setError("");
                setUser(e.target.value);
                if(e.target.value === ""){
                    setError("Username has left blank");
                }
                break;
            case "pass":
                setError("");
                setPass(e.target.value);
                if(e.target.value === ""){
                    setError("Password has left blank");
                }
                break;
            default:
        }
    }

    function loginSubmit() {
        if(user !== "" && pass != ""){
            var url = "";
            var headers = {
            "Accept": "application/json",
            "Content-type": "application/json"
            };
            var Data = {
                user: user,
                pass: pass
            };
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(Data)
            }).then((response) => response.json())
            .then((response) => {
                setMsg(response[0].result);
            }).catch((err) => {
                setError(err);
                console.log(err);
            })
        }
        else{
            setError("All field are required!")
        }
    }





    return (
        <>
            <div className={styles.container}>
                <div className={styles.heading}>Login</div>
                <form className={styles.form} action="">
                    <p>
                        {
                            error !== "" ?
                            <span className="error">{error}</span> :
                            <span className="success">{msg}</span> 
                        }
                    </p>
                    <input
                        placeholder="Usuário"
                        id="usuario"
                        name="usuario"
                        value={user}
                        type="text"
                        onChange={(e) => handleInputChange(e, "user")}
                        className={styles.input}
                        required
                    />
                    <input
                        placeholder="Senha"
                        id="senha"
                        name="senha"
                        value={pass}
                        onChange={(e) => handleInputChange(e, "pass")}
                        type="password"
                        className={styles.input}
                        required
                    />
                    <input value="Login" type="submit" className={styles.login} defaultValue="Login" onClick={loginSubmit} />
                </form>
                
            </div>

        </>
    );
}