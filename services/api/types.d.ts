export interface OAuthTokenResponse {
  access_token: string
  token: string
  expirationDate: string
  refreshToken: string
  login: string
  usuarioId: number
  usuarioNome: string
  tema: string
  status: number
  contratos: Contrato[]
  favoritos: unknown[]
}

export interface Contrato {
  id: number
  empresa: Empresa
  appDeploy: AppDeploy
  periodo: Periodo
}

export interface Empresa {
  id: number
  razaoSocial: string
  nomeFantasia: string
  cnpjCpf: string
}

export interface AppDeploy {
  nome: string
  urlLogo: string
  appToken: string
  plataforma: number
}

export interface Periodo {
  inicio: string
  retorno: unknown[]
}
