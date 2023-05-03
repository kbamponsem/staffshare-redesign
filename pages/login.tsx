import Link from 'next/link'
import styles from '../styles/Commons.module.css'
import Button, { Already, AlternativeLogin } from './__components/button'
import FormContainer from './__components/form_container'
import Input from './__components/input'


export default function Login() {
    return (
        <>
            <main className={styles.formWrapper}>
                <FormContainer title='Log In to Your StaffShare Account'>
                    <Input title='Email/Username' required={true} type='email' placeholder='Email' />
                    <Input title='Password' required={true} type='password' placeholder='Password' />

                    <Button>Login</Button>

                    <AlternativeLogin />
                    <Already to='/register' linkText='Register now'>Don't have an account yet?</Already>

                </FormContainer>
            </main>
        </>
    )
}