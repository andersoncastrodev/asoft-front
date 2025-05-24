import { BreadCrumb } from 'primereact/breadcrumb';
import React from 'react';

const Product= () => {

    
    return (
        <div className="grid">
            <div className="col-12">
                <BreadCrumb home={{ icon: 'pi pi-home', url: '/' }} model={[{ label: 'Produtos' }]} />
                <div className="card">
                    {/* <h5>Pagina de Clientes</h5>
                    <p>Aqui vai a lista de clientes</p> */}
                </div>
            </div>
        </div>
    );
};

export default Product;