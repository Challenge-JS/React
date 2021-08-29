import { Button, Select, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useContext, useEffect } from 'react'
import { useOperacion } from '../hooks/useOperacion';
import { operacionContext } from '../provider/OperacionContext';
import { NavBar } from '../ui/NavBar'
import './index.css';
export const HomePage = () => {
  const {getOperaciones, dispatch, state} = useContext(operacionContext);
  const {operaciones, ingresos, egresos} = state;
  useEffect(() => {
    getOperaciones();
  }, []);
  const {
    columns,
    data,
    onClick,
    close,
    onSubmit,
    open,
    bool,
    form,
    setForm,
    onChange
    } = useOperacion({operaciones,dispatch});
    const {concepto, monto, tipo} = form;
    const select = [
      {
          value:'INGRESO',
          name:'ingreso'
      },
      {
          value:'EGRESO',
          name:'egreso'
      },
  ];
  const changeTipo = (e)=>{
    setForm({
        ...form,
        tipo:e
    })


 }
    return (
        <div className="fondo">
            <NavBar/>
            <Modal
                centered
                visible={open}
                closable={true}
                onCancel={close}
                okButtonProps={{block:true}}
                footer={null}
                width={350}
            >
           <form className="formulario" >
                {
                    (bool) ?<h1>Editar</h1> :<h1>Nuevo</h1>
                }

              
               <input type="text" name="concepto" value={concepto} onChange={onChange}  autoComplete="off"  placeholder="Concepto"  />
               <input type="number" name="monto" value={monto} onChange={onChange}  autoComplete="off"  placeholder="Monto"  />
               {
                    (!bool) && <Select value={tipo}  defaultValue='Seleccione' key={'123'} onChange={changeTipo}   style={{ width: 240 }}  name="tipo" >
                        {select.map(s=>(
                            <Select.Option  key={s.value}   value={s.value}  >{s.value}</Select.Option>  
                        ))}   
                    </Select>
                }
                <br/>
               
               

              <Button onClick={()=>onSubmit(concepto, monto, tipo)} type='primary'>Guardar</Button>
           </form>
           
                </Modal>
            <div className="contenedor">
              <div className="flex">
                <div className="column">
                  <h1>Balance actual</h1>
                  <div className="row">
                    <h2>Ingreso :</h2>
                    <h2> {ingresos} </h2>
                  </div>
                  <div className="row">
                    <h2>Egreso :</h2>
                    <h2>{egresos}</h2>
                  </div>
                </div>
                <Button style={{backgroundColor:'#009432', color:'white'}}    onClick={onClick} >Agregar</Button>
         
              </div>
                <Table  scroll={{ x: 300 }}  columns={columns} dataSource={data} size="small"  pagination={{pageSize : 10}} />
            </div>
        </div>
    )
}
