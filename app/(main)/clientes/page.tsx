"use client"; //Para renderizar no lado do cliente Obrigatório ter o "use client"

import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import ModalClient from './modalClient';

const Client = () => {

    const [visibleModalClient, setVisibleModalClient] = useState(false);

    const renderFilter = () => {
        return (
            <div className='w-full md:w-6 pr-2 md:pr-2 mb-2 md:mb-0'>
                <span className="p-input-icon-left w-full ">
                    <i className="pi pi-search" />
                    <InputText type="text" placeholder='Buscar' className='w-full' />
                </span>
            </div>
        );
    };

    const renderButton = () => {
        return (
            <div className='w-full md:w-6 flex flex-column md:flex-row md:justify-content-end gap-2 md:gap-4'>

                <Button label="Novo" icon="pi pi-plus" className="p-button-success" onClick={() => setVisibleModalClient(true)} />

                <Button label="Deletar" icon="pi pi-trash" className="p-button-danger" />
                
            </div>
        );
    };

    const tableClient = () => {
        return (
            <div className="card">
                <DataTable value={undefined} stripedRows tableStyle={{ minWidth: '50rem' }}>
                    <Column field="code" header="Code"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column field="quantity" header="Quantity"></Column>
                </DataTable>
            </div>

        );
    };

    //Principal
    return (
        <div className="grid">
            <div className="col-12">

                <BreadCrumb home={{ icon: 'pi pi-home', url: '/' }} model={[{ label: 'Clientes' }]} />

            {/* <div className="flex flex-column md:flex-row w-full"> */}
                <div className="card flex flex-column md:flex-row align-items-center">
                   
                    {renderFilter()}

                    {renderButton()}

                </div>

                {tableClient()}

            </div>

            <ModalClient visible={visibleModalClient} setVisible={setVisibleModalClient} />
        </div>
    );
};

export default Client;