import styles from "./styles.module.css";

export default function LdsRollerLoader({ maxWidth = 450 }) {
    return (
        <div className={styles['lds-roller']}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
