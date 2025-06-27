"use client"; //Para renderizar no lado do cliente Obrigatório ter o "use client"

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { StatusValues } from "../interface/enum-inteface/enum-interface";
import { searchEnumSex, searchEnumStatus } from "../service/cliente-service/cliente-service";


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

    const [ sex, setSex ] = useState <StatusValues[]> ();
    const [ sexSelected, setSexSelected ] = useState <StatusValues> ();
 
    const enumStatus = async() => {
        const enumStatus = await searchEnumStatus();
        setStatus(enumStatus);
        console.log(status);
    }

    const enumSex = async() => {
        const enumSex = await searchEnumSex();
        setSex(enumSex);
    }


    const [selectedPerson, setSelectedPerson] = useState(null);
    const persons: any[] = [
        { name: 'Pessoa', code: 'PESSOA' },
        { name: 'Fisica', code: 'FISICA' },
        { name: 'Juridica', code: 'JURIDICA' }
    ];

    const renderFields = () => {
        return (
            <div className='grid flex flex-column gap-2 w-full h-full'>
                <div className='col-12 md:col-12 sm:col-6 flex flex-row gap-3'>
                    <Dropdown value={selectedPerson} onChange={(e: DropdownChangeEvent) => setSelectedPerson(e.value)} options={persons} optionLabel="name"
                        placeholder="Pessoa" style={{width: '50%'}} />
                    <InputText placeholder="Nome" style={{width: '50%'}} />
                </div>
                <div className='md:col-12 sm:col-6'>
                    <InputText placeholder="Telefone Principal" style={{width: '100%'}} />
                </div>
                <div className='md:col-12 sm:col-6'>
                    <InputText placeholder="Telefone Secundario"  style={{width: '100%'}}   />
                </div>
                <div className='md:col-12 sm:col-6'>
                    <InputText placeholder="Email"   style={{width: '100%'}} />
                </div>
                <div className='md:col-12 sm:col-6'>
                    <Dropdown  
                        options={status}
                        placeholder="Status" 
                        onChange={(e) => setStatusSelected(e.value)}
                        value={statusSelected}
                        style={{width: '100%'}}
                        
                    />
                </div>
                <div className='md:col-12 sm:col-6'>
                    <Dropdown  
                        options={sex}
                        placeholder="Genero" 
                        onChange={(e) => setSexSelected(e.value)}
                        value={sexSelected}
                        style={{width: '100%'}}
                    />
                </div>
                
            </div>
        );
    };

    const renderButtons = () => {
        return (
            <div className='flex flex-column sm:flex-row sm:justify-content-end mt-4 w-full gap-3'>
                <Button label="Salvar" icon="pi pi-check" className="p-button-success" />
                <Button label="Fechar" icon="pi pi-times" className="p-button-danger" onClick={() => {setVisible(false)}} />
            </div>
        );
    };

    useEffect(() => {
        enumStatus();
        enumSex();
    }, []);

    //Principal render
    return (
        <Dialog header="Clientes" visible={visible} onHide={() => {setVisible(false)}} style={{width: window.innerWidth < 640 ? '' : '50vw'}}>
               
               {renderFields()}

               {renderButtons()}

        </Dialog>
    );
}
export default ModalClientSave;