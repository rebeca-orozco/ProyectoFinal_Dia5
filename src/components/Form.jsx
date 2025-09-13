import React, { useState, useEffect } from 'react';

const API= "https://wme20zzgy5.execute-api.us-east-2.amazonaws.com/guestbook";

const Form = () => {
    const [nombreLibro, setNombreLibro] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch(API, { method: 'GET' })
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error("Error GET:", err));
    }, []);

    const handleNombreLibro = e => setNombreLibro(e.target.value);
    const handleMensaje = e => setMensaje(e.target.value);

    const handleClick = async (e) => {
        e.preventDefault();

        if (nombreLibro.trim() === '' || mensaje.trim() === '') {
            alert('Debes ingresar el nombre del libro y el mensaje');
            return;
        }

        try {
            const res = await fetch(API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombreLibro, mensaje })
            });

            if (res.ok) {
                const newEntry = await res.json();
                setTodos(prev => [newEntry, ...prev]);
                setNombreLibro('');
                setMensaje('');
            } else {
                alert('Error al guardar el mensaje');
            }
        } catch (err) {
            console.error("Error POST:", err);
            alert("No se pudo conectar con la API");
        }
    };

    const deleteTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <form onSubmit={e => e.preventDefault()}>
                <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                    <input 
                        type="text" 
                        placeholder="Nombre del libro" 
                        value={nombreLibro}
                        onChange={handleNombreLibro}
                        style={{ flex: 1, padding: "8px", borderRadius: "4px" }}
                    />
                    <input 
                        type="text" 
                        placeholder="Escribe tu mensaje" 
                        value={mensaje}
                        onChange={handleMensaje}
                        style={{ flex: 2, padding: "8px", borderRadius: "4px" }}
                    />
                    <button 
                        onClick={handleClick}
                        style={{ padding: "8px 16px", borderRadius: "4px", cursor: "pointer", background: "#69db34ff", color: "#fff", border: "none" }}
                    >+</button>
                </div>
            </form>

            <h3 style={{ textAlign: "center" }}>Guestbook de Libros</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {todos.map((value, index) => (
                    <div 
                        key={index} 
                        style={{
                            background: "#f3f3f3",
                            padding: "12px",
                            borderRadius: "8px",
                            position: "relative"
                        }}
                    >
                        <span><b>Libro:</b> {value.nombreLibro}</span><br/>
                        <span><b>Mensaje:</b> {value.mensaje}</span>
                        <button 
                            onClick={() => deleteTodo(index)}
                            style={{
                                position: "absolute",
                                top: "8px",
                                right: "8px",
                                background: "#e74c3c",
                                color: "#fff",
                                border: "none",
                                borderRadius: "50%",
                                width: "24px",
                                height: "24px",
                                cursor: "pointer"
                            }}
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Form;
