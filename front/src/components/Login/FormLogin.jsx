import styles from "./FormLogin.module.css"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function FormLogin() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    const users = JSON.parse(localStorage.getItem("user"));


    const Login = async (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append("username", user);
        data.append("pass", pass);
        const res = fetch("http://localhost/routes/users.php", {
            method: "POST",
            body: data,
        }).then(async (res) => {
            let user = await res.json()
            localStorage.setItem("user", JSON.stringify(user))
            const users = JSON.parse(localStorage.getItem("user")) || {}
            if (user.error) {
                alert(res.error)
                return
            }
            navigate('/home')
            return
        });
    };



    // navigate('/home');

    return (
        <>
            <div className={styles.container}>
                <div className={styles.heading}>Login</div>
                <form className={styles.form} onSubmit={(e) => { Login(e) }} action="">

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
                    <input value="Login" type="submit" className={styles.login} />

                    <p className={styles.signup}>
                        No account?
                        <Link to="/register">Sign up</Link>
                    </p>
                </form>

            </div>

        </>
    );
}