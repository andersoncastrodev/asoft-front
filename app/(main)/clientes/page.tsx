"use client"; //Para renderizar no lado do cliente Obrigatório ter o "use client"

import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import ModalClientSave from './modalClientSave';

const Client = () => {


    const [visibleModalClient, setVisibleModalClient] = useState(false);

    // interface RepresentativeOption {
    //     name: string;
    //     image: string;
    // }

    // interface Customer {
    //     id: number;
    //     name: string;
    //     country: Country;
    //     company: string;
    //     date: string;
    //     status: string;
    //     verified: boolean;
    //     activity: number;
    //     representative: Representative;
    //     balance: number;
    // }

    // export default function BasicDemo() {
    //     const [customers, setCustomers] = useState<Customer[] | null>(null);
    //     const [filters, setFilters] = useState<DataTableFilterMeta>({
    //         global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    //         name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    //         'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    //         representative: { value: null, matchMode: FilterMatchMode.IN },
    //         status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    //     });

    //     const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    //     const representatives: RepresentativeOption[] = [
    //         { name: 'Amy Elsner', image: 'amyelsner.png' },
    //         { name: 'Anna Fali', image: 'annafali.png' },
    //         { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    //         { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    //         { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    //         { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    //         { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    //         { name: 'Onyama Limba', image: 'onyamalimba.png' },
    //         { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    //         { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    //     ];
    //     const statuses: string[] = ['unqualified', 'qualified', 'new', 'negotiation', 'renewal'];

    //     const getSeverity = (status: string) => {
    //         switch (status) {
    //             case 'unqualified':
    //                 return 'danger';

    //             case 'qualified':
    //                 return 'success';

    //             case 'new':
    //                 return 'info';

    //             case 'negotiation':
    //                 return 'warning';

    //             case 'renewal':
    //                 return null;
    //         }
    //     };

    //     useEffect(() => {
    //         CustomerService.getCustomersSmall().then((data) => setCustomers(data));
    //     }, []);

    //     const countryBodyTemplate = (rowData: Customer) => {
    //         return (
    //             <div className="flex align-items-center gap-2">
    //                 <img alt={rowData.country.code} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} />
    //                 <span>{rowData.country.name}</span>
    //             </div>
    //         );
    //     };

    //     const representativeBodyTemplate = (rowData: Customer) => {
    //         const representative = rowData.representative;

    //         return (
    //             <div className="flex align-items-center gap-2">
    //                 <img alt={representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" />
    //                 <span>{representative.name}</span>
    //             </div>
    //         );
    //     };

    //     const representativeFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    //         return <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e: MultiSelectChangeEvent) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />;
    //     };

    //     const representativesItemTemplate = (option: RepresentativeOption) => {
    //         return (
    //             <div className="flex align-items-center gap-2">
    //                 <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" />
    //                 <span>{option.name}</span>
    //             </div>
    //         );
    //     };

    //     const statusBodyTemplate = (rowData: Customer) => {
    //         return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    //     };

    //     const statusFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    //         return <Dropdown value={options.value} options={statuses} onChange={(e: DropdownChangeEvent) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
    //     };

    //     const statusItemTemplate = (option: string) => {
    //         return <Tag value={option} severity={getSeverity(option)} />;
    //     };

    //     const onGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //         const value = event.target.value;
    //         let _filters = { ...filters };

    //         _filters['global'].value = value;

    //         setFilters(_filters);
    //     };

    //     const renderHeader = () => {
    //         const value = filters['global'] ? filters['global'].value : '';

    //         return (
    //             <IconField iconPosition="left">
    //                 <InputIcon className="pi pi-search" />
    //                 <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Global Search" />
    //             </IconField>
    //         );
    //     };


    //    const header = renderHeader();

    // const renderFilter = () => {
    //     return (
    //         <div className='w-full md:w-6 pr-2 md:pr-2 mb-2 md:mb-0'>
    //             <span className="p-input-icon-left w-full ">
    //                 <i className="pi pi-search" />
    //                 <InputText type="text" placeholder='Buscar' className='w-full' />
    //             </span>
    //         </div>
    //     );
    // };

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

            // <div className="card">
            //     <DataTable value={customers} paginator rows={5} header={header} filters={filters} onFilter={(e) => setFilters(e.filters)}
            //         selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)} selectionMode="single" dataKey="id"
            //         stateStorage="session" stateKey="dt-state-demo-local" emptyMessage="No customers found." tableStyle={{ minWidth: '50rem' }}>
            //         <Column field="name" header="Name" sortable filter filterPlaceholder="Search" style={{ width: '25%' }}></Column>
            //         <Column header="Country" body={countryBodyTemplate} sortable sortField="country.name" filter filterField="country.name" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
            //         <Column header="Agent" body={representativeBodyTemplate} sortable sortField="representative.name" filter filterField="representative"
            //             showFilterMatchModes={false} filterElement={representativeFilterTemplate} filterMenuStyle={{ width: '14rem' }} style={{ width: '25%' }} ></Column>
            //         <Column field="status" header="Status" body={statusBodyTemplate} sortable filter filterElement={statusFilterTemplate} filterMenuStyle={{ width: '14rem' }} style={{ width: '25%' }}></Column>
            //     </DataTable>
            // </div>

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

            <ModalClientSave visible={visibleModalClient} setVisible={setVisibleModalClient} />
        </div>
    );
};

export default Client;