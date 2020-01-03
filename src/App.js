import React, { useState, useEffect } from 'react';
import Buscador from './componentes/Buscador';
import Listado from './componentes/Listado';



function App() 
{

  const [busqueda, setBusqueda ] = useState('');
  const [imagenes, setImagenes ] = useState([]);
  const [paginaActual, guardarPaginaActual ] = useState(1);
  const [totalPaginas, guardarTotalPaginas ] = useState(1);
  
  
  useEffect(() =>
  {
      const ConsultarAPI = async () => 
      {
          if(busqueda === '') return;
          
          const imagenesPorPagina = 8;
          const key = '14803454-8995465d609063a7484d139a6';

          const url =`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

          //FETCH
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();

          setImagenes(resultado.hits);

          //CALCULAR EL TOTAL DE PAGINAS
          const CalcularTotalPaginas = ( Math.ceil(resultado.totalHits / imagenesPorPagina));
          guardarTotalPaginas(CalcularTotalPaginas);

          // MOVER LA PANTALLA A LA PARTE SUPERIOR
          const jumbotron = document.querySelector('.jumbotron');
          jumbotron.scrollIntoView({behavior : 'smooth', block: 'end'});
      

      }
      ConsultarAPI();

  }, [busqueda, paginaActual]);

  const paginaAnterior = () =>
  {
    let nuevaPaginaAnterior = paginaActual-1;
    //Colocalo en el state
    guardarPaginaActual(nuevaPaginaAnterior);

  }

  const paginaSiguiente = () =>
  {
    let nuevaPaginaSiguiente = paginaActual + 1;
    guardarPaginaActual(nuevaPaginaSiguiente);
  }

  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
          <Buscador 
              setBusqueda={setBusqueda}
          />
      </div>
     
     <div className="row justify-content-center">
          <Listado 
            imagenes={imagenes}
          />
          
          {(paginaActual === 1) ? null : (               
           <button onClick={paginaAnterior} type="button" className="btn btn-info mr-1">Anterior &laquo;</button>              
           )}

         {(paginaActual === totalPaginas) ? null : (
          <button onClick={paginaSiguiente} type="button" className="btn btn-info mr-1">Siguiente &raquo;</button>
         )}
          
     </div>
    </div>
  );
}

export default App;
