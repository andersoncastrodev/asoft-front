/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '../types/types';
import { LayoutContext } from './context/layoutcontext';
import { Menu } from 'primereact/menu';
import api from '../lib/api';
import { useRouter } from 'next/navigation';


const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    const router = useRouter();

    //Função de logout para limpar os cookies e tokens
    const handelLogout = async () => {
        try {
            //logout para limpar cookies antigos
            await api.post('/auth/logout', {}, {
            withCredentials: true // Importante para envio de cookies
            });
            router.push('/login');  

        }catch (err) {
            console.error('Logout error:', err);
        }

    }

    const items = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Editar',
                    icon: 'pi pi-refresh'
                },
                {
                    label: 'Sair',
                    icon: 'pi pi-upload',
                    command: () => { handelLogout(); } // Execute a função de logout
                }
            ]
        }
    ];

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" />
                <span>Asoft Sistemas</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>

                <Menu model={items} popup ref={topbarmenubuttonRef} id="popup_menu" className='mt-4' />

                <button type="button" className="p-link layout-topbar-button" onClick={(event) => (topbarmenubuttonRef.current as unknown as Menu).toggle(event)}>
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>
                
                <Link href="/adjustment">
                    <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-cog"></i>
                        <span>Settings</span>
                    </button>
                </Link>
 
            </div>

        </div>
        
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
