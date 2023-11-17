export interface Usuario{
    id?: number,
    userLogin: string,
    senha?: string,
    cargo: string
}
export interface FiltroUsuario{
    userLogin: string,
    cargo?: string
}
export interface PerfilUsuario{
    id: string,
    senha: string
}