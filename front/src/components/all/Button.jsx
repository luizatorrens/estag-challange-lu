import styles from "../all/Button.module.css"

export default function Button({ type, name, texto }) {
    return (
        <>
        <button
        type={type}
        className={styles.button}
        name={name}>
        {texto}
        </button>
        </>
    );
}