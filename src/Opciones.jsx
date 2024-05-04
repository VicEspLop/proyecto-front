import {useState} from 'react'

function Opciones({ tarea, toggleTodo, borrarTarea }) {

    //se define inicialment el valor de edición como false y editando nos servirá para controlar si estamos o no en modo edición
    let [editando,setEditando] = useState(false);

    let [estado,setEstado] = useState(false);
    
    //establecemos editando en true indicando que estamos en modo edición
    let handleEditar = () => {
        setEditando(true);
    }

    //llamamos a la función borrarTarea con el id de la tarea
    let handleBorrar = () => {
        borrarTarea(tarea.id);
    }

    //llamamos a la función toggle pasando  el id de la tarea y el estado opuesto
    let handleToggleTodo = () => {
        toggleTodo(tarea.id, !tarea.terminada);
    }

    return (
        <>
            {/* boton para editar la tarea con un evento onClick que llama a la función handleEditar */}
            <button className="boton" onClick={handleEditar}>Editar</button>

            {/* boton para borrar la tarea con un evento onClick que llama a la función handleBorrar */}
            <button className="boton" onClick={handleBorrar}>Borrar</button>

            {/* boton para cambiar el estado de la tarea con un evento onClick que llama a la función handleToggleTodo */}
            <button className="estado" onClick={handleToggleTodo}>
                <span className={`estado ${estado ? "terminada" : ""}`}></span>
            </button>
        </>
    )

}

export default Opciones;