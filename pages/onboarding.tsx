import { getSession, useSession } from 'next-auth/react';
import styles from '../styles/Onboarding.module.css';
import { PiConfettiDuotone } from 'react-icons/pi'
import Input from './__components/input';
import Button from './__components/button';
import { useEffect, useState } from 'react';
import { connectAPI } from './api/services';
import { useRouter } from 'next/router';
import { use } from 'chai';
import Prompt from './__components/prompt';

export default function Onboarding({session}: any) {
    const { push } = useRouter();
    const {user} = session;
    const [username, setUsername] = useState(session?.user?.name as string);
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptMessage, setPromptMessage] = useState('');
    const [promptType, setPromptType] = useState<'success' | 'error' | 'warning'>('success');

    const [loading, setLoading] = useState(false);

    const validateInput = () => {
        if (!username) {
            setPromptMessage('Username cannot be empty');
            setShowPrompt(true);
            setPromptType('error');
            return false;
        }
        return true;
    }
    const handleEnjoy = async () => {
        try {

            if (!validateInput()) return;
            setShowPrompt(false);
            setLoading(true);

            const res = await connectAPI('/oauth/create', 'POST', {
                id: user?.id,
                name: user?.name,
                email: user?.email,
                username,
                picture: user?.image,
                provider: user?.provider,
            })

            if (res.status === 200) {
                // redirect to dashboard
                push('/dashboard');
            }
        } catch (e) {
            setLoading(false);
        }
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.welcome}>
                    <h1 className={`${styles.center} super-big`}>Welcome to StaffShare <PiConfettiDuotone size={28} style={{
                        marginLeft: "0.2rem",
                    }} /></h1>

                    <p ><b>{user?.name}
                    </b>, the StaffShare family is thrilled to have you join.</p>

                    <p>Let's get you started with a few steps.</p>

                    <div>
                        <p>StaffShare.co</p>
                        <p className={`${styles.center} light-grey`}>Made with Love from Paris ❤️</p>
                    </div>
                </div>
                <div className={styles.inputSection}>
                    <Prompt
                        show={showPrompt}
                        setShow={setShowPrompt}
                        type={promptType}
                        message={promptMessage}
                    />
                    <Input type='text'
                        placeholder='Enter your username'
                        title='Username'
                        required
                        wrapperStyle={{ width: '18rem' }}
                        value={username}
                        setValue={(e) => setUsername(e.target.value)}

                    />
                    <div className={styles.pushRight}>
                        <Button bgColor='#5B716D' style={{ border: 0, margin: 0, width: '8rem' }} loading={loading} onClick={handleEnjoy}>Enjoy 🥂</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);

    return {
        props: {
            session,
        },
    };
}