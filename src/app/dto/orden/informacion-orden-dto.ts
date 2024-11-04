import { DetalleOrdenDTO } from "./detalleOrden-dto";

export interface InformacionOrdenDTO {
    id: String ,
    idCliente: String ,
    fechaVencimiento: Date ,
    codigoPasarela: String ,
    total: number ,
    items: DetalleOrdenDTO [],
    idCupon:string
}