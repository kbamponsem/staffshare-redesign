import FormContainer from "./__components/form_container";
import styles from '../styles/Commons.module.css'
import Button, { Already, AlternativeLogin } from "./__components/button";
import Input from "./__components/input";
import Link from "next/link";

export default function Register() {
    return (
        <>
            <main className={styles.formWrapper}>
                <FormContainer title='Create Your StaffShare Account'>
                    <Input title='Username' required={true} type='email' placeholder='Username' />
                    <Input title='Email' required={true} type='email' placeholder='Email' />
                    <Input title='Password' required={true} type='password' placeholder='Password' />
                    <Input title='Retype Password' required={true} type='password' placeholder='Retype Password' />

                    <Button>Register</Button>

                    <AlternativeLogin />
                    <Already to="/login" linkText="Login now">Already have an account?</Already>
                </FormContainer>
            </main>
        </>
    )
}