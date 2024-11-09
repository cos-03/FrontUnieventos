import { LocalidadDTO } from "./localidad-dto"

export interface EditarEventoDTO {
    id: String,
    nombre: String ,
    descripcion: String ,
    imagenLocalidades: String ,
    tipo: string ,
    fechaEvento: Date ,
    ciudad: String ,
    localidades: LocalidadDTO[] ,
    imagenImportada:String 

   
}