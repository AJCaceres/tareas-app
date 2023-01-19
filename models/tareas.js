const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach( key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado
    }

    constructor(){
        this._listado= {}
    }

    borrarTareas( id = '') {
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    crearTarea( desc=""){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea
    }
    cargarTareasFromArray(arr=[]){
        arr.forEach(tarea => {
            this._listado[tarea.id] = tarea
        });
    }
    listadoCompleto(){
        console.log()
        for (let index = 0; index < this.listadoArr.length; index++) {
            if(this.listadoArr[index].completadoEn){
                console.log(`${index+1}. ${this.listadoArr[index].desc} :: ${this.listadoArr[index].completadoEn.green}`);
            }else{
                console.log(`${index+1}. ${this.listadoArr[index].desc} :: ${'Pendiente'.red}`);
            }   
        }
    }
    listarPendientesCompletadas( completadas = true) {
        let contador = 0
        console.log()
        for (let index = 0; index < this.listadoArr.length; index++) {
            if(this.listadoArr[index].completadoEn && completadas){
                contador += 1
                console.log(`${(contador +'.').green} ${this.listadoArr[index].desc} :: ${this.listadoArr[index].completadoEn.green}`);
            }else if(!completadas && !this.listadoArr[index].completadoEn){
                contador += 1
                console.log(`${(contador +'.').green} ${this.listadoArr[index].desc} :: ${'Pendiente'.red}`);
            }   
        }
    }
    toggleCompletadas(ids =[]){
        ids.forEach( id =>{
            const tarea = this._listado[id];
            if( !tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null
            }
        })
    }

}


module.exports = Tareas;