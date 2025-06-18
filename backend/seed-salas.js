"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Iniciando seed das salas...');
    // Limpar dados existentes se necessário
    if (process.argv.includes('--limpar')) {
        console.log('🧹 Limpando dados existentes...');
        await prisma.sala.deleteMany({});
    }
    // Dados das salas
    const salas = [
        {
            numero: "1501",
            andar: 15,
            nome: "Sala 1 - 1501",
            area: 67.61,
            posicao: "FRENTE SUL",
            orientacao: "Sul",
            preco: 743399.0,
            disponivel: true,
            imagem: "seedImg/sala1.png",
            planta: "seedPlanta/planta-sala-1.png",
            valorizacao: 59472,
            lucro: 89208,
            aluguel: 4460,
            condominio: 450.0,
            iptu: 743
        },
        {
            numero: "1502",
            andar: 15,
            nome: "Sala 2 - 1502",
            area: 56.21,
            posicao: "LATERAL SUL",
            orientacao: "Sul",
            preco: 618310.0,
            disponivel: true,
            imagem: "seedImg/sala2.png",
            planta: "seedPlanta/planta-sala-2.png",
            valorizacao: 49465,
            lucro: 74197,
            aluguel: 3710,
            condominio: 450.0,
            iptu: 618
        },
        {
            numero: "1503",
            andar: 15,
            nome: "Sala 3 - 1503",
            area: 66.06,
            posicao: "FRENTE OESTE",
            orientacao: "Oeste",
            preco: 594951.0,
            disponivel: true,
            imagem: "seedImg/sala3.png",
            planta: "seedPlanta/planta-sala-3.png",
            valorizacao: 47596,
            lucro: 71394,
            aluguel: 3571,
            condominio: 450.0,
            iptu: 595
        },
        {
            numero: "1504",
            andar: 15,
            nome: "Sala 4 - 1504",
            area: 58.58,
            posicao: "LATERAL OESTE",
            orientacao: "Oeste",
            preco: 594951.0,
            disponivel: true,
            imagem: "seedImg/sala4.png",
            planta: "seedPlanta/planta-sala-4.png",
            valorizacao: 47590,
            lucro: 71386,
            aluguel: 3569,
            condominio: 450.0,
            iptu: 595
        },
        {
            numero: "1505",
            andar: 15,
            nome: "Sala 5 - 1505",
            area: 58.58,
            posicao: "LATERAL OESTE",
            orientacao: "Oeste",
            preco: 644380.0,
            disponivel: true,
            imagem: "seedImg/sala5.png",
            planta: "seedPlanta/planta-sala-5.png",
            valorizacao: 51550,
            lucro: 77326,
            aluguel: 3866,
            condominio: 450.0,
            iptu: 644
        }
    ];
    // Inserir salas
    for (const sala of salas) {
        await prisma.sala.create({ data: sala });
        console.log(`✅ Sala ${sala.nome} criada`);
    }
    console.log('🎉 Seed concluído com sucesso!');
}
main()
    .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-salas.js.map