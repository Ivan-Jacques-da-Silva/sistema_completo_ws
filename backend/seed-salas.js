
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

  await prisma.sala.create({
    data: {
      numero: "1501",
      andar: 15,
      nome: "Sala 1 - 1501",
      area: 67.61,
      posicao: "FRENTE SUL",
      orientacao: "Sul",
      preco: 804559.0,
      disponivel: false,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
      valorizacao: 64365,
      lucro: 96547,
      aluguel: 4827,
      condominio: 450.0,
      iptu: 805
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1502",
      andar: 15,
      nome: "Sala 2 - 1502",
      area: 56.21,
      posicao: "LATERAL SUL",
      orientacao: "Sul",
      preco: 618310.0,
      disponivel: false,
      imagem: "seedImg/sala2.png",
      planta: "seedPlanta/planta-sala-2.png",
      valorizacao: 49465,
      lucro: 74197,
      aluguel: 3710,
      condominio: 450.0,
      iptu: 618
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1503",
      andar: 15,
      nome: "Sala 3 - 1503",
      area: 67.28,
      posicao: "LATERAL NORTE",
      orientacao: "Norte",
      preco: 800632.0,
      disponivel: true,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
      valorizacao: 64051,
      lucro: 96076,
      aluguel: 4804,
      condominio: 450.0,
      iptu: 801
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1504",
      andar: 15,
      nome: "Sala 4 - 1504",
      area: 54.08,
      posicao: "FRENTE NORTE",
      orientacao: "Norte",
      preco: 594880.0,
      disponivel: true,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
      valorizacao: 47590,
      lucro: 71386,
      aluguel: 3569,
      condominio: 450.0,
      iptu: 595
    }
  });
  await prisma.sala.create({
    data: {
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
  });
  await prisma.sala.create({
    data: {
      numero: "1506",
      andar: 15,
      nome: "Sala 6 - 1506",
      area: 66.06,
      posicao: "FRENTE OESTE",
      orientacao: "Oeste",
      preco: 663663.0,
      disponivel: true,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
      valorizacao: 53093,
      lucro: 79640,
      aluguel: 3982,
      condominio: 450.0,
      iptu: 664
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1507",
      andar: 15,
      nome: "Sala 7 - 1507",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      orientacao: "Nordeste",
      preco: 930580.0,
      disponivel: true,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
      valorizacao: 74446,
      lucro: 111670,
      aluguel: 5583,
      condominio: 450.0,
      iptu: 931
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1601",
      andar: 16,
      nome: "Sala 1 - 1601",
      area: 67.61,
      posicao: "FRENTE SUL",
      orientacao: "Sul",
      preco: 804559.0,
      disponivel: true,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
      valorizacao: 64365,
      lucro: 96547,
      aluguel: 4827,
      condominio: 450.0,
      iptu: 805
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1602",
      andar: 16,
      nome: "Sala 2 - 1602",
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
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1603",
      andar: 16,
      nome: "Sala 3 - 1603",
      area: 67.28,
      posicao: "LATERAL NORTE",
      orientacao: "Norte",
      preco: 800632.0,
      disponivel: false,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
      valorizacao: 64051,
      lucro: 96076,
      aluguel: 4804,
      condominio: 450.0,
      iptu: 801
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1604",
      andar: 16,
      nome: "Sala 4 - 1604",
      area: 54.08,
      posicao: "FRENTE NORTE",
      orientacao: "Norte",
      preco: 594880.0,
      disponivel: true,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
      valorizacao: 47590,
      lucro: 71386,
      aluguel: 3569,
      condominio: 450.0,
      iptu: 595
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1605",
      andar: 16,
      nome: "Sala 5 - 1605",
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
  });
  await prisma.sala.create({
    data: {
      numero: "1606",
      andar: 16,
      nome: "Sala 6 - 1606",
      area: 66.06,
      posicao: "FRENTE OESTE",
      orientacao: "Oeste",
      preco: 663663.0,
      disponivel: true,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
      valorizacao: 53093,
      lucro: 79640,
      aluguel: 3982,
      condominio: 450.0,
      iptu: 664
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1607",
      andar: 16,
      nome: "Sala 7 - 1607",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      orientacao: "Nordeste",
      preco: 930580.0,
      disponivel: true,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
      valorizacao: 74446,
      lucro: 111670,
      aluguel: 5583,
      condominio: 450.0,
      iptu: 931
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1608",
      andar: 16,
      nome: "Sala 8 - 1608",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      orientacao: "Nordeste",
      preco: 786114.0,
      disponivel: true,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
      valorizacao: 62889,
      lucro: 94334,
      aluguel: 4717,
      condominio: 450.0,
      iptu: 786
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1701",
      andar: 17,
      nome: "Sala 1 - 1701",
      area: 67.61,
      posicao: "FRENTE SUL",
      orientacao: "Sul",
      preco: 804559.0,
      disponivel: true,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
      valorizacao: 64365,
      lucro: 96547,
      aluguel: 4827,
      condominio: 450.0,
      iptu: 805
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1702",
      andar: 17,
      nome: "Sala 2 - 1702",
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
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1703",
      andar: 17,
      nome: "Sala 3 - 1703",
      area: 67.28,
      posicao: "LATERAL NORTE",
      orientacao: "Norte",
      preco: 800632.0,
      disponivel: true,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
      valorizacao: 64051,
      lucro: 96076,
      aluguel: 4804,
      condominio: 450.0,
      iptu: 801
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1704",
      andar: 17,
      nome: "Sala 4 - 1704",
      area: 54.08,
      posicao: "FRENTE NORTE",
      orientacao: "Norte",
      preco: 594880.0,
      disponivel: false,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
      valorizacao: 47590,
      lucro: 71386,
      aluguel: 3569,
      condominio: 450.0,
      iptu: 595
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1705",
      andar: 17,
      nome: "Sala 5 - 1705",
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
  });
  await prisma.sala.create({
    data: {
      numero: "1706",
      andar: 17,
      nome: "Sala 6 - 1706",
      area: 66.06,
      posicao: "FRENTE OESTE",
      orientacao: "Oeste",
      preco: 663663.0,
      disponivel: true,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
      valorizacao: 53093,
      lucro: 79640,
      aluguel: 3982,
      condominio: 450.0,
      iptu: 664
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1707",
      andar: 17,
      nome: "Sala 7 - 1707",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      orientacao: "Nordeste",
      preco: 930580.0,
      disponivel: true,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
      valorizacao: 74446,
      lucro: 111670,
      aluguel: 5583,
      condominio: 450.0,
      iptu: 931
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1708",
      andar: 17,
      nome: "Sala 8 - 1708",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      orientacao: "Nordeste",
      preco: 786114.0,
      disponivel: true,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
      valorizacao: 62889,
      lucro: 94334,
      aluguel: 4717,
      condominio: 450.0,
      iptu: 786
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1801",
      andar: 18,
      nome: "Sala 1 - 1801",
      area: 67.61,
      posicao: "FRENTE SUL",
      orientacao: "Sul",
      preco: 804559.0,
      disponivel: true,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
      valorizacao: 64365,
      lucro: 96547,
      aluguel: 4827,
      condominio: 450.0,
      iptu: 805
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1802",
      andar: 18,
      nome: "Sala 2 - 1802",
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
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1803",
      andar: 18,
      nome: "Sala 3 - 1803",
      area: 67.28,
      posicao: "LATERAL NORTE",
      orientacao: "Norte",
      preco: 800632.0,
      disponivel: true,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
      valorizacao: 64051,
      lucro: 96076,
      aluguel: 4804,
      condominio: 450.0,
      iptu: 801
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1804",
      andar: 18,
      nome: "Sala 4 - 1804",
      area: 54.08,
      posicao: "FRENTE NORTE",
      orientacao: "Norte",
      preco: 594880.0,
      disponivel: true,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
      valorizacao: 47590,
      lucro: 71386,
      aluguel: 3569,
      condominio: 450.0,
      iptu: 595
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1805",
      andar: 18,
      nome: "Sala 5 - 1805",
      area: 58.58,
      posicao: "LATERAL OESTE",
      orientacao: "Oeste",
      preco: 644380.0,
      disponivel: false,
      imagem: "seedImg/sala5.png",
      planta: "seedPlanta/planta-sala-5.png",
      valorizacao: 51550,
      lucro: 77326,
      aluguel: 3866,
      condominio: 450.0,
      iptu: 644
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1806",
      andar: 18,
      nome: "Sala 6 - 1806",
      area: 66.06,
      posicao: "FRENTE OESTE",
      orientacao: "Oeste",
      preco: 663663.0,
      disponivel: true,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
      valorizacao: 53093,
      lucro: 79640,
      aluguel: 3982,
      condominio: 450.0,
      iptu: 664
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1807",
      andar: 18,
      nome: "Sala 7 - 1807",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      orientacao: "Nordeste",
      preco: 930580.0,
      disponivel: true,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
      valorizacao: 74446,
      lucro: 111670,
      aluguel: 5583,
      condominio: 450.0,
      iptu: 931
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1808",
      andar: 18,
      nome: "Sala 8 - 1808",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      orientacao: "Nordeste",
      preco: 786114.0,
      disponivel: true,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
      valorizacao: 62889,
      lucro: 94334,
      aluguel: 4717,
      condominio: 450.0,
      iptu: 786
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1901",
      andar: 19,
      nome: "Sala 1 - 1901",
      area: 67.61,
      posicao: "FRENTE SUL",
      orientacao: "Sul",
      preco: 804559.0,
      disponivel: true,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
      valorizacao: 64365,
      lucro: 96547,
      aluguel: 4827,
      condominio: 450.0,
      iptu: 805
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1902",
      andar: 19,
      nome: "Sala 2 - 1902",
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
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1903",
      andar: 19,
      nome: "Sala 3 - 1903",
      area: 67.28,
      posicao: "LATERAL NORTE",
      orientacao: "Norte",
      preco: 800632.0,
      disponivel: true,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
      valorizacao: 64051,
      lucro: 96076,
      aluguel: 4804,
      condominio: 450.0,
      iptu: 801
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1904",
      andar: 19,
      nome: "Sala 4 - 1904",
      area: 54.08,
      posicao: "FRENTE NORTE",
      orientacao: "Norte",
      preco: 594880.0,
      disponivel: true,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
      valorizacao: 47590,
      lucro: 71386,
      aluguel: 3569,
      condominio: 450.0,
      iptu: 595
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1905",
      andar: 19,
      nome: "Sala 5 - 1905",
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
  });
  await prisma.sala.create({
    data: {
      numero: "1906",
      andar: 19,
      nome: "Sala 6 - 1906",
      area: 66.06,
      posicao: "FRENTE OESTE",
      orientacao: "Oeste",
      preco: 663663.0,
      disponivel: false,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
      valorizacao: 53093,
      lucro: 79640,
      aluguel: 3982,
      condominio: 450.0,
      iptu: 664
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1907",
      andar: 19,
      nome: "Sala 7 - 1907",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      orientacao: "Nordeste",
      preco: 930580.0,
      disponivel: true,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
      valorizacao: 74446,
      lucro: 111670,
      aluguel: 5583,
      condominio: 450.0,
      iptu: 931
    }
  });
  await prisma.sala.create({
    data: {
      numero: "1908",
      andar: 19,
      nome: "Sala 8 - 1908",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      orientacao: "Nordeste",
      preco: 786114.0,
      disponivel: true,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
      valorizacao: 62889,
      lucro: 94334,
      aluguel: 4717,
      condominio: 450.0,
      iptu: 786
    }
  });
  console.log("✅ Todas as salas foram criadas!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
