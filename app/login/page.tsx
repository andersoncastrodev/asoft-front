/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import React, { useContext, useState } from 'react';
import { LayoutContext } from '../../layout/context/layoutcontext';
import api from '../../lib/api';

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter() // nativo do React e Next.js

    const { layoutConfig } = useContext(LayoutContext);
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            // Fazendo login
            const loginRequest = { username, password };
            const response = await api.post('/auth/login', loginRequest, {
                withCredentials: true // Importante para envio de cookies
            });

            // 3. Redireciona apenas se o login foi bem-sucedido
            if (response.status === 200) {
                router.push('/dashboard');
            }
        } catch (err) {
            console.error('Login error:', err);
        }

        // Melhorar a tratativa de erros

    };
    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Asoft logo" className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            {/* <img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" /> */}
                            <div className="text-900 text-3xl font-medium mb-3">Asoft Sistemas</div>
                            {/* <span className="text-600 font-medium">Sign in to continue</span> */}
                        </div>

                        <div>
                            <label htmlFor="username1" className="block text-900 text-xl font-medium mb-2">
                                Usuario
                            </label>
                            <InputText id="username1" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Senha
                            </label>

                            <Password inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                {/* <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Remember me</label>
                                </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Forgot password?
                                </a> */}
                            </div>
                            {/* <Button label="Entrar" className="w-full p-3 text-xl" onClick={() => router.push('/dashboard')}></Button> */}
                            <Button label="Entrar" className="w-full p-3 text-xl" onClick={(e) => handleSubmit(e)}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
