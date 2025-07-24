const { PrismaClient } = require('@prisma/client');
const xlsx = require('xlsx');
const path = require('path');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://wallstreet_user:wallstreet2025DbX1@localhost:5432/wallstreet_db',
    },
  },
});

async function atualizarPrecos() {
  const arquivo = path.join(__dirname, 'Wall Street Corporate - Valores JUNHO  2025 - PARA PDF.xlsx');
  const workbook = xlsx.readFile(arquivo);
  const planilha = workbook.Sheets['Tabela de Vendas'];
  const linhas = xlsx.utils.sheet_to_json(planilha, { header: 1 });

  console.log(`📄 Total de linhas: ${linhas.length}`);

  for (let i = 2; i < linhas.length; i++) { // começa da linha 2
    const linha = linhas[i];
    const numero = String(linha[0]).trim(); // coluna A
    const valorStr = String(linha[1]).replace(/\./g, '').replace(',', '.'); // coluna B
    const preco = parseFloat(valorStr);

    if (!numero || isNaN(preco)) {
      console.log(`⚠️ Linha ${i + 1} ignorada: numero="${numero}", preco="${valorStr}"`);
      continue;
    }

    const sala = await prisma.sala.findFirst({ where: { numero } });

    if (!sala) {
      console.log(`❌ Sala com numero=${numero} não encontrada`);
      continue;
    }

    console.log(`🔍 Sala ID=${sala.id} | numero=${numero} | preco atual=R$ ${sala.preco}`);
    console.log(`➡️ Novo preco: R$ ${preco}`);

    await prisma.sala.update({
      where: { id: sala.id },
      data: { preco },
    });

    console.log(`✅ Sala ${numero} atualizada com sucesso\n`);
  }

  await prisma.$disconnect();
}

atualizarPrecos();
