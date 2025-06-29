"use client"; //Para renderizar no lado do cliente Obrigatório ter o "use client"

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { StatusValues } from "../interface/enum-interface";
import { searchEnumGender , searchEnumStatus } from "../service/cliente-service";
import { InputMask } from "primereact/inputmask";
import { State } from "../interface/state-interface";
import { loadState } from "../service/state-service";


interface ModalClientProps { //Declaração das propriedades da Props
    visible: boolean
    setVisible: (visible: boolean) => void
}

const ModalClient = ({ //Usando os parâmetros passados via Props
    visible,
    setVisible  
} : ModalClientProps ) => {

    const [ status, setStatus ] = useState <StatusValues[]> (); 
    const [ statusSelected, setStatusSelected ] = useState <StatusValues> ();

    const [ genero, setGenero ] = useState <StatusValues[]> ();
    const [ generoSelected, setGeneroSelected ] = useState <StatusValues> ();

    const[ state, setState ] = useState <State[]> ();    
    const[ stateSelected, setStateSelected ] = useState <StatusValues> ();  

    const enumStatus = async() => {
        const enumStatus = await searchEnumStatus();
        console.log("Status: ",enumStatus);
        setStatus(enumStatus);
        
    }

    const enumGenero = async() => {
        const enumGender = await searchEnumGender();
        console.log("Genero: ",enumGender);
        setGenero(enumGender);
    }

    const loadStates = async () => {
        const state = await loadState();
        console.log("Estado carregado:", state);
        setState(state);
    } 



    const [selectedPerson, setSelectedPerson] = useState(null);
    const persons: any[] = [
        { name: 'Fisica', code: 'FISICA' },
        { name: 'Juridica', code: 'JURIDICA' }
    ];

    const renderFields = () => {
        return (
            <div>        
                <div className="grid w-full">
                    <div className="col-12 md:col-8">
                        <label htmlFor="nome" className="block text-700 font-medium mb-2 ml-1">Nome</label>
                        <InputText id="nome" className="w-full" />
                    </div>
                    <div className="col-12 md:col-4">
                        <label htmlFor="pessoa" className="block text-700 font-medium mb-2 ml-1">Pessoa</label>
                        <Dropdown value={selectedPerson} onChange={(e: DropdownChangeEvent) => setSelectedPerson(e.value)} options={persons} optionLabel="name"
                       className="w-full"/>
                    </div>
                </div>

                <div className="grid w-full">
                    <div className="col-12 md:col-4">
                        <label htmlFor="cpf" className="block text-700 font-medium mb-2 ml-1">Cpf</label>
                        <InputMask value="" mask="999.999.999-99" className="w-full"/>
                    </div>
                    <div className="col-12 md:col-4">
                        <label htmlFor="rg" className="block text-700 font-medium mb-2 ml-1">Rg</label>
                        <InputText className="w-full"/>
                    </div>
                     <div className="col-12 md:col-4">
                        <label htmlFor="dataNascimento" className="block text-700 font-medium mb-2 ml-1">Data Nascimento</label>
                       <InputMask value="" mask="99/99/9999" className="w-full"/>
                    </div>
                </div>

                <div className="grid w-full">
                    <div className="col-12 md:col-6">
                        <label htmlFor="telefone1" className="block text-700 font-medium mb-2 ml-1">Telefone Principal</label>
                        <InputMask value="" mask="(99)99999-9999" className="w-full"/>
                    </div>
                    <div className="col-12 md:col-6">
                        <label htmlFor="telefone2" className="block text-700 font-medium mb-2 ml-1">Telefone Secundario</label>
                        <InputMask value=""  mask="(99)99999-9999" className="w-full"/>
                    </div>
                </div>

                <div className="grid w-full">
                    <div className="col-12 md:col-12 sd:col-6">
                        <label htmlFor="email" className="block text-700 font-medium mb-2 ml-1">Email</label>
                        <InputText className="w-full"/>
                    </div>
                </div>

                <div className="grid w-full">
                    <div className="col-12 md:col-6">
                        <label htmlFor="genero" className="block text-700 font-medium mb-2 ml-1">Genero</label>
                        <Dropdown
                            options={genero}
                            onChange={(e) => setGeneroSelected(e.value)}
                            value={generoSelected}
                            style={{ width: '100%' }}
                            className="w-full"
                        />
                    </div>

                     <div className="col-12 md:col-6">
                        <label htmlFor="status" className="block text-700 font-medium mb-2 ml-1">Status</label>
                        <Dropdown
                            options={status}
                            // placeholder="Status"
                            onChange={(e) => setStatusSelected(e.value)}
                            value={statusSelected}
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="grid w-full">
                    <div className="col-12 md:col-9">
                        <label htmlFor="endereco" className="block text-700 font-medium mb-2 ml-1">Rua</label>
                        <InputText className="w-full" />
                    </div>
                    <div className="col-12 md:col-3">
                        <label htmlFor="numero" className="block text-700 font-medium mb-2 ml-1">Numero</label>
                        <InputText className="w-full" />
                    </div>
                </div>

                <div className="grid w-full">
                    <div className="col-12 md:col-4">
                        <label htmlFor="endereco" className="block text-700 font-medium mb-2 ml-1">Cep</label>
                        <InputMask value=""  mask="99999-999" className="w-full"/>
                    </div>
                    <div className="col-12 md:col-4">
                        <label htmlFor="numero" className="block text-700 font-medium mb-2 ml-1">Cidade</label>
                        <InputText className="w-full" />
                    </div>
                    <div className="col-12 md:col-4">
                        <label htmlFor="numero" className="block text-700 font-medium mb-2 ml-1">Estado</label>
                          <Dropdown
                            options={state}
                            onChange={(e) => setStateSelected(e.value)}
                            value={stateSelected}
                            optionLabel="name" // nome da propriedade que será exibida no dropdown
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="grid w-full">
                    <div className="col-12 md:col-12">
                        <label htmlFor="observacao" className="block text-700 font-medium mb-2 ml-1">Observação</label>
                        <InputText className="w-full"/>
                    </div>
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
        enumGenero();
        loadStates();
    }, []);

    //Principal render
    return (
        // <Dialog header="Cadastro de Cliente" visible={visible} onHide={() => {setVisible(false)}} style={{width: window.innerWidth < 640 ? '' : '50vw'}}></Dialog>
        <Dialog header="Cadastro de Cliente" visible={visible} onHide={() => {setVisible(false)}} style={{width: typeof window !== 'undefined' && window.innerWidth < 640 ? '' : '50vw'}}>
               {renderFields()}

               {renderButtons()}

        </Dialog>
    );
}
export default ModalClient;