import { useEffect, useState } from 'react'
import './index.css'
import Formulario from './Formulario'
import Tarea from './Tarea'

function App() {
  let [tareas, setTareas] = useState([])

  useEffect(() => {
    fetch("https://proyecto-back-r3em.onrender.com/api-todo")
    .then(respuesta => respuesta.json())
    .then(tareas => setTareas(tareas))
  },[])

  function crearTarea(tarea){
    setTareas([...tareas,tarea])
    
  }

  function borrarTarea(id){
    fetch(`https://proyecto-back-r3em.onrender.com/api-todo/borrar/${id}`, {
      method : "DELETE"
    })
    .then(respuesta => respuesta.json())
    .then(({resultado}) => {
      if(resultado == "ok"){
        return setTareas(tareas.filter(tarea => tarea.id != id))
      }
      console.log("error usuario")
    })
  }
  
  function toggleEstado(id){
    return fetch(`https://proyecto-back-r3em.onrender.com/api-todo/actualizar/${id}/2`, {
      method : "PUT"
    })
    .then(respuesta => respuesta.json())
    .then(({resultado}) => {
      if(resultado == "ok"){
        setTareas(tareas => 
          tareas.map(tarea => {
            if (tarea.id === id) {
              return { ...tarea, terminada: !tarea.terminada };
            }
            return tarea;
          })
        );
      }
    })
  }

  function editarTexto(nuevaTarea){
    setTareas([...tareas,nuevaTarea])
    console.log(nuevaTarea)
  }

  return (
    <>
      <Formulario  crearTarea={crearTarea} />
      <section className='tareas'>
        { tareas.length > 0 ? tareas.map(tarea => <Tarea key={tarea.id}
                                    id={tarea.id}
                                    tarea={tarea.tarea}
                                    terminada={tarea.terminada}
                                    borrarTarea={borrarTarea}
                                    toggleEstado={toggleEstado}
                                    editarTexto={editarTexto} />) : <p>No hay Tareas</p>}
      </section>
    </>
  )
}

export default App
