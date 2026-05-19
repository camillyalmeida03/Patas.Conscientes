// Este arquivo é responsável por formatar a idade do pet em anos para o front, pois o banco salva em meses

export function formatarIdade(idadeEmMeses) {
    if (idadeEmMeses < 12) {
        return `${idadeEmMeses} ${idadeEmMeses === 1 ? "mês" : "meses"}`;
    } else {
        const anos = Math.floor(idadeEmMeses / 12);
        return `${anos} ${anos === 1 ? "ano" : "anos"}`;
    }
}

