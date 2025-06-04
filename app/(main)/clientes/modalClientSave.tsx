"use client"; //Para renderizar no lado do cliente Obrigatório ter o "use client"

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { searchEnumSex, searchEnumStatus } from "../service/cliente-service/cliente-service";
import { useEffect, useState } from "react";
import { StatusValues } from "../interface/enum-inteface/enum-interface";
import { RadioButton } from "primereact/radiobutton";



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

    const renderFields = () => {
        return (
            <div className='flex flex-column gap-2'>



                <InputText placeholder="Nome" />

                <InputText placeholder="Telefone Principal" />

                <InputText placeholder="Telefone Secundario" />

                <InputText placeholder="Email" />

                <Dropdown  
                options={status} //dados do backend
                placeholder="Status" 
                
                onChange={(e) => setStatusSelected(e.value)} //setando o status selecionado
                value={statusSelected} //Exibindo o status selecionado
                />


                <Dropdown  
                options={sex} //dados do backend
                placeholder="Genero" 
                
                onChange={(e) => setSexSelected(e.value)} //setando o status selecionado
                value={sexSelected} //Exibindo o status selecionado
                />



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
        enumSex();
    }, []);

    //Principal render
    return (
        <Dialog header="Clientes" visible={visible} onHide={() => {setVisible(false)}} style={{ width: '50vw' }}>
               

                <div className="flex align-items-left">
                    <RadioButton inputId="ingredient1" name="fisica" value="Fisica" />
                    <label htmlFor="ingredient1" className="ml-2">Juridica</label>
                </div>

                <div className="flex align-items-left">
                    <RadioButton inputId="ingredient1" name="juridica" value="Juridica" />
                    <label htmlFor="ingredient2" className="ml-2">Fisica</label>
                </div>

               {renderFields()}

               {renderButtons()}
        </Dialog>

        

    );
}
export default ModalClientSave;