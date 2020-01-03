import React, { useState, useEffect } from 'react';
import Error from './Error';

function Buscador({setBusqueda})
{

    const [ terminoBusqueda, setTerminoBusqueda] = useState('');
    const [ error, setError] = useState(false);

    const buscarImagen = e => 
    {
        e.preventDefault();

        //VALIDAR
        if(terminoBusqueda === '')
        {
            setError(true);
            return;
        }

        //ENVIAR AL COMPONENTE PRINCIPAL
        setError(false);
        setBusqueda(terminoBusqueda);

    }

    return (
                <form
                    onSubmit={buscarImagen}
                >
                    <div className="row">
                        <div className="form-group col-md-8">
                            <input 
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Buscar una imágen, ejemplo: fútbol o café."
                                    onChange={e => setTerminoBusqueda(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <input 
                                    type="submit"
                                    className="btn btn-lg btn-danger btn-block"
                                    value="Buscar"
                            />
                        </div>
                    </div>

                    { (error) ? <Error mensaje="Agrega un término de búsqueda" /> : null }

                </form>
           

    )
}

export default Buscador;
