async function listarRegiones() {

    const url = "https://gist.githubusercontent.com/juanbrujo/0fd2f4d126b3ce5a95a7dd1f28b3d8dd/raw/b8575eb82dce974fd2647f46819a7568278396bd/comunas-regiones.json";
    const method = 'GET';
    
    console.log('CALL SERVICE: ', url);
    const resp = await fetch(url, {
        method: method,
    }).then((response) => {
        console.log(`response: ${response.status}`)
        
        if (response.status == 200) {
            console.log('RESPUESTA CORRECTA.');
            
            return response.json();
        } else {
            console.log('ERROR EN LA RESPUESTA DE LA API DPA');
            
        }
    }).then((data) => {
        
        console.log(`regiones: ${data.regiones}`);
        selectOneRegion = `<select id="lista-regiones" 
                          class="form-select my-3" aria-label="Select region" onclick="listarComunas()">`;
        for (i = 0; i < data.regiones.length; i++) {
            console.log(`region: ${data.regiones[i].region}`);
            console.log(`comunas: ${data.regiones[i].comunas}`);
            nombre = data.regiones[i].region;
            selectOneRegion = `${selectOneRegion} 
                               <option value="${i}">${nombre}</option>`;
        }
        labelRegion = `<label for="lista-regiones" 
                        class="form-label">SELECCIONA TU REGION</label>`;
        selectOneRegion = `${labelRegion} ${selectOneRegion} </select>`;
        console.log(`selectOneRegion: ${selectOneRegion}`);
        document.getElementById('regiones').innerHTML = selectOneRegion;

    }).catch((err) => {
        
        console.log(`ERROR:  ${err.message}`);
    });
}

async function listarComunas(region_id) {

    try{
        region_id = document.getElementById('lista-regiones').value;
    }catch(e){
        region_id = 1;
    }

    console.log(`region_id: ${region_id}`);
    const url = "https://gist.githubusercontent.com/juanbrujo/0fd2f4d126b3ce5a95a7dd1f28b3d8dd/raw/b8575eb82dce974fd2647f46819a7568278396bd/comunas-regiones.json";
    const method = 'GET';
    /* LLAMADO A API REST LISTAR COMUNAS DIVISIÓN POLITICO ADMINISTRATIVA (DPA) */
    console.log('CALL SERVICE: ', url);
    const resp = await fetch(url, {
        method: method,
    }).then((response) => {
        console.log(`response: ${response.status}`)
        /* SECCIÓN PARA VERIFICAR LA RESPUESTA */
        if (response.status == 200) {
            console.log('RESPUESTA CORRECTA.');
            /* RETORNANDO RESPUESTA EN FORMATO JSON*/
            return response.json();
        } else {
            console.log('ERROR EN LA RESPUESTA DE LA API DPA');
            /* EN CASO DE ERROR SE PROPAGA Y ES CAPTURADO POR EL BLOQUE CATCH*/
            //throw new Exception('ERROR EN LA RESPUESTA DE LA API DPA');
        }
    }).then((data) => {
        /* SECCIÓN PARA LEER data.json */
        selectOneComuna = `<select id="lista-comunas" class="form-select 
                            my-3" aria-label="Select comunas">`;
        comunas = data.regiones[region_id].comunas.sort();
        console.log(`comunas: ${comunas}`);
        for (i = 0; i < comunas.length; i++) {
            console.log(`comuna: ${comunas[i]}`);
            nombre = comunas[i];
            selectOneComuna = `${selectOneComuna} 
                               <option value="${i}">${nombre}</option>`;
        }
        labelComuna = `<label for="lista-comunas" 
                        class="form-label">SELECCIONA TU COMUNA</label>`;
        selectOneComuna = `${labelComuna} ${selectOneComuna} </select>`;
        console.log(`selectOneComuna: ${selectOneComuna}`);
        document.getElementById('comunas').innerHTML = selectOneComuna;

    }).catch((err) => {
        /* SECCIÓN PARA CAPTURAR ERRORES */
        console.log(`ERROR:  ${err.message}`);
    });
}

listarRegiones();
listarComunas();