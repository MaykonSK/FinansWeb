export class GetContasPagar {
  id: number;
  usuarioId: number;
  descricao: string;
  valor: number;
  vencimento: Date;
  recorrente: boolean
  paga: boolean;
  status: string;
}
