import styles from "./FormRegister.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormRegister() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const register = 1
    const navigate = useNavigate();
    

    const addUser = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append("username", user);
        data.append("pass", pass);
        data.append("register", register);
        fetch("http://localhost/routes/users.php", {
            method: "POST",
            body: data,
        }).then(async (res) => {
            console.log(await res.text())
        }).catch((err) => {
            console.log(err)
        })
        navigate('/')
    };


    return (
        <>
            <div className={styles.container}>
                <div className={styles.heading}>Register</div>
                <form className={styles.form} action="">
                    <input
                        placeholder="User"
                        id="usuario"
                        name="usuario"
                        value={user}
                        type="text"
                        onChange={(e) => setUser(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <input
                        placeholder="Password"
                        id="senha"
                        name="senha"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        className={styles.input}
                        required
                    />
                    {/* <input
                        placeholder="Confirm password"
                        id="senha"
                        name="senha"
                        value={pass}
                        onChange={(e) => handleInputChange(e, "pass")}
                        type="password"
                        className={styles.input}
                        required
                    /> */}
                    <input value="Register" type="submit" className={styles.login} onClick={addUser} />

                </form>

            </div>

        </>
    );
}