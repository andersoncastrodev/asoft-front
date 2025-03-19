"use client";
/* eslint-disable @next/next/no-sync-scripts */

import { PrimeReactContext } from 'primereact/api';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { useContext, useEffect, useState } from 'react';
import { AppConfigProps, LayoutConfig, LayoutState } from '../../../types/layout';
import { LayoutContext } from '../../../layout/context/layoutcontext';

const ConfigLayout = (props: AppConfigProps) => {

    const [scales] = useState([12, 13, 14, 15, 16, 17, 18]);
    const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    const { setRipple, changeTheme } = useContext(PrimeReactContext);

    const onConfigButtonClick = () => {
        setLayoutState((prevState: LayoutState) => ({ ...prevState, configSidebarVisible: true }));
    };

    const _changeTheme = (theme: string, colorScheme: string) => {
        changeTheme?.(layoutConfig.theme, theme, 'theme-css', () => {
            setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, theme, colorScheme }));
        });
    };

    const decrementScale = () => {
        setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, scale: prevState.scale - 1 }));
    };

    const incrementScale = () => {
        setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, scale: prevState.scale + 1 }));
    };

    const applyScale = () => {
        document.documentElement.style.fontSize = layoutConfig.scale + 'px';
    };

    useEffect(() => {
        applyScale();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layoutConfig.scale]);

    return (
        <>
            <div className="grid">
                <div className="col-12">
                    <div className="card docs">
                    
                        <h5>Tamanho da Fonte</h5>
                        <div className="flex align-items-center">
                            <Button icon="pi pi-minus" type="button" onClick={decrementScale} rounded text className="w-2rem h-2rem mr-2" disabled={layoutConfig.scale === scales[0]}></Button>
                            <div className="flex gap-2 align-items-center">
                                {scales.map((item) => {
                                    return <i className={classNames('pi pi-circle-fill', { 'text-primary-500': item === layoutConfig.scale, 'text-300': item !== layoutConfig.scale })} key={item}></i>;
                                })}
                            </div>
                            <Button icon="pi pi-plus" type="button" onClick={incrementScale} rounded text className="w-2rem h-2rem ml-2" disabled={layoutConfig.scale === scales[scales.length - 1]}></Button>
                        </div>

                        <h5>Modos de Tema</h5>
                        <div className="grid">
                           
                            <div className="col-3">
                                <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('lara-light-blue', 'light')}> 
                                    <img src="/layout/images/themes/lara-light-blue.png" className="w-2rem h-2rem" alt="Lara Light Blue" />Light
                                </button>
                            </div>

                            <div className="col-3">
                                <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('lara-dark-blue', 'dark')}>
                                    <img src="/layout/images/themes/lara-dark-blue.png" className="w-2rem h-2rem" alt="Lara Dark Blue" />Dark
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ConfigLayout;
