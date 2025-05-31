"use client"; //Para renderizar no lado do cliente Obrigatório ter o "use client"

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { searchEnumStatus } from "../service/cliente-service/cliente-service";
import { use, useEffect, useState } from "react";
import { StatusValues } from "../interface/cliente-interface/client-inteface";


interface ModalClientSaveProps { //Declaração das propriedades da Props
    visible: boolean
    setVisible: (visible: boolean) => void
}

const ModalClientSave = ({ //Usando os parâmetros passados via Props
    visible,
    setVisible  
} : ModalClientSaveProps ) => {

    const [ status, setStatus ] = useState <StatusValues[]> (); 
    const [ statusSelected, setStatusSelected ] = useState <StatusValues> ();
 
    const enumStatus = async() => {
        const enumStatus = await searchEnumStatus();
        setStatus(enumStatus);
        console.log(status);
    }

    const renderFields = () => {
        return (
            <div className='flex flex-column gap-2'>

                <Dropdown  
                options={status} //dados do backend
                placeholder="Status" 
                
                onChange={(e) => setStatusSelected(e.value)} //setando o status selecionado
                value={statusSelected} //Exibindo o status selecionado
                />
                
                <InputText placeholder="Nome" />

                <InputText placeholder="Telefone" />

                <InputText placeholder="Email" />

            </div>
        );
    };

    const renderButtons = () => {
        return (
            <div className='flex flex-row gap-2'>
                <Button label="Salvar" icon="pi pi-check" className="p-button-success" />
                <Button label="Fechar" icon="pi pi-times" className="p-button-danger" onClick={() => {setVisible(false)}} />
            </div>
        );
    };

    useEffect(() => {
        enumStatus();
    }, []);

    //Principal render
    return (
        <Dialog header="Clientes" visible={visible} onHide={() => {setVisible(false)}} style={{ width: '50vw' }}>
               
               {renderFields()}

               {renderButtons()}
        </Dialog>

        

    );
}
export default ModalClientSave;