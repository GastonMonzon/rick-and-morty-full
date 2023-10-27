import styles from './Select.module.css';

export default function Select({ value, title, options, handleChange }) {
    return (
        <select className={styles.selector} key={title} name={title} id={title} value={value} onChange={handleChange} >
            {
                options.map((name, index) => {
                    return <option key={index} className={styles.option} value={name} >{name}</option>
                })
            }
        </select>
    )
}