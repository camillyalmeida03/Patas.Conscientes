// Este documento é responsável por formatar data e hora

export function formatarDataHoraBR(dataISO) {
  const data = new Date(dataISO);

  return data.toLocaleString("pt-BR");
}