import styles from '../../styles/FormContainer.module.css'

type FormContainerProps = {
    children: React.ReactNode,
    title: string,
}

export default function FormContainer({ children, title }: FormContainerProps) {
    return (
        <>
            <form className={styles.container}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.subtitle}>
                    <p>StaffShare helps you connect and have access to the latest sheet music ranging from
                        choral, classical, jazz, and many others.</p>
                    <br />
                    <p>Join today and have access to the millions of sheets on our platform.</p>
                </div>
                {children}
            </form>
        </>
    )
}