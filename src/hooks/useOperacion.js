import { FormOutlined,DeleteOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { operacionContext } from '../provider/OperacionContext';

import { useEdit } from './useEdit';
import { useForm } from './useForm';
const initialState = {
    concepto:'',
    monto:'',
    tipo:'',
    id:''
}
export const useOperacion = ({operaciones, dispatch}) => {
    const {newOperacion,deleteOperacion,editOperacion} = useContext(operacionContext);
  const [form, onChange,,setForm] = useForm({
    concepto:'',
    monto:'',
    tipo:'',
  });
  const {id} = form;
  const {edit, setEdit, visible, setVisible, onClick, onEdit, close} = useEdit({setForm,initialState});
  const {open} = visible;
  const {bool} = edit;
  const onSubmit = (concepto,monto,tipo) => {
    if(bool){
        editOperacion({concepto,monto,tipo,id});
    }else{
        newOperacion({concepto,monto,tipo});
    }
      setVisible({open:false});
  }
  const onDelete = (operacion) => {
    deleteOperacion(operacion);
      setVisible({open:false});
  }
  const editar = (o)=>{
    setEdit({
      bool:true
    });
    setForm({
      concepto:o.concepto,
      monto:o.monto,
      tipo:o.tipo,
      id:o.id
    });
    
    onEdit();
  }
      
    
  const columns = [
      {
        title: 'Usuario',
        dataIndex: 'usuario',
      },
      {
        title: 'Concepto',
        dataIndex: 'concepto',
      },
      {
        title: 'Monto',
        dataIndex: 'monto',
      },
      {
        title: 'Tipo',
        dataIndex: 'tipo',
      },
      {
        title: 'Fecha',
        dataIndex: 'fecha',
      },
      {
        title: 'Acción',
        dataIndex: 'accion',
      },
      
  ];
  

      
  const data =operaciones.map(o=>({
    key: o.id,
    usuario:o.Usuario.email,
    concepto: o.concepto,
    monto: o.monto,
    tipo: o.tipo,
    fecha:o.createdAt.split('T')[0],
    accion:[<FormOutlined key={o.id} onClick={()=>editar(o)}   className="mr"  style={{color : "#1ED760"}} />,<DeleteOutlined key={o.concepto} onClick={()=>onDelete(o)}  style={{color : "#FF0000"}} />,]

  }));

 

  return {
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
  };
}
