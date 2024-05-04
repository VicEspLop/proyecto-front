import { useState } from 'react'

function Formulario() {

    //almacenamos el valor del texto introducido en el formulario
    let [textoTemporal, setTextoTemporal] = useState("")

    let [tareas, setTareas] = useState([]);

    return (
        <>
            {/* cuando se envíe el formulario se ejecutará la functión handleSubmit */}
            <form onSubmit={evento => {
                evento.preventDefault()

                fetch("https://proyecto-back-r3em.onrender.com/todo/crear", {
                    method: "POST",
                    body: JSON.stringify({ tarea: textoTemporal }),
                    headers: { "Content-type": "application/json" }
                })
                    .then(respuesta => respuesta.json())
                    .then(({ id }) => {
                        if (id) {
                            setTareas([...tareas, { id, tarea: textoTemporal }])
                            return setTextoTemporal("")
                        }
                        console.log("error")
                    })

            }}
            >
                <input type="text" placeholder="¿Qué hay que hacer?" value={textoTemporal} onChange={evento => setTextoTemporal(evento.target.value)} />
                <input type="submit" value="Crear tarea" />
            </form>
        </>
    )
}

export default Formulario;


