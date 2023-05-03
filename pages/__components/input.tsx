import { useEffect, useState } from 'react'
import styles from '../../styles/Commons.module.css'
type InputProps = {
    type: string,
    placeholder: string,
    required?: boolean,
    title: string,
    props?: any,
}

export default function Input({ type, title, required = false, placeholder, props }: InputProps) {
    const [requiredValue, setRequiredValue] = useState(required)
    useEffect(() => {
        setRequiredValue(required)
    }, [required])

    return (
        <>
            <div className={styles.inputWrapper}>
                <div className={styles.inputTitle}>{title}{requiredValue && <span className={styles.inputRequired}>*</span>}</div>
                <div>
                    <input className={styles.input} type={type} placeholder={placeholder} {...props} />
                </div>
            </div>
        </>
    )
}