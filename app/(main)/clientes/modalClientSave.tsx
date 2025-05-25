"use client"; //Para renderizar no lado do cliente Obrigatório ter o "use client"

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";


interface ModalClientSaveProps { //Declaração das propriedades da Props
    visible: boolean
    setVisible: (visible: boolean) => void
}

const ModalClientSave = ({ //Usando os parâmetros passados via Props
    visible,
    setVisible  
} : ModalClientSaveProps ) => {

    const renderFields = () => {
        return (
            <div className='flex flex-column gap-2'>
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

    //Principal render
    return (
        <Dialog header="Clientes" visible={visible} onHide={() => {setVisible(false)}} style={{ width: '50vw' }}>
               
               {renderFields()}

               {renderButtons()}
        </Dialog>

        

    );
}
export default ModalClientSave;