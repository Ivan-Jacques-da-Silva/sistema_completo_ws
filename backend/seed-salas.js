
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Andar 19
  await prisma.sala.create({
    data: {
      numero: "1901",
      andar: 19,
      nome: "Sala 1 - 1901",
      area: 67.61,
      posicao: "FRENTE SUL",
      preco: 872169.0,
      disponivel: false,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1902",
      andar: 19,
      nome: "Sala 2 - 1902",
      area: 56.21,
      posicao: "LATERAL SUL",
      preco: 725109.0,
      disponivel: false,
      imagem: "seedImg/sala2.png",
      planta: "seedPlanta/planta-sala-2.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1903",
      andar: 19,
      nome: "Sala 3 - 1903",
      area: 67.28,
      posicao: "LATERAL NORTE",
      preco: 867912.0,
      disponivel: false,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1904",
      andar: 19,
      nome: "Sala 4 - 1904",
      area: 54.08,
      posicao: "FRENTE NORTE",
      preco: 697632.0,
      disponivel: false,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1905",
      andar: 19,
      nome: "Sala 5 - 1905",
      area: 58.58,
      posicao: "LATERAL OESTE",
      preco: 755682.0,
      disponivel: false,
      imagem: "seedImg/sala5.png",
      planta: "seedPlanta/planta-sala-5.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1906",
      andar: 19,
      nome: "Sala 6 - 1906",
      area: 55.77,
      posicao: "FRENTE OESTE",
      preco: 719433.0,
      disponivel: false,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1907",
      andar: 19,
      nome: "Sala 7 - 1907",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      preco: 1008780.0,
      disponivel: false,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1908",
      andar: 19,
      nome: "Sala 8 - 1908",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      preco: 852174.0,
      disponivel: false,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
    },
  });

  // Andar 18
  await prisma.sala.create({
    data: {
      numero: "1801",
      andar: 18,
      nome: "Sala 1 - 1801",
      area: 67.61,
      posicao: "FRENTE SUL",
      preco: 872169.0,
      disponivel: false,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1802",
      andar: 18,
      nome: "Sala 2 - 1802",
      area: 56.21,
      posicao: "LATERAL SUL",
      preco: 725109.0,
      disponivel: false,
      imagem: "seedImg/sala2.png",
      planta: "seedPlanta/planta-sala-2.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1803",
      andar: 18,
      nome: "Sala 3 - 1803",
      area: 67.28,
      posicao: "LATERAL NORTE",
      preco: 867912.0,
      disponivel: false,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1804",
      andar: 18,
      nome: "Sala 4 - 1804",
      area: 54.08,
      posicao: "FRENTE NORTE",
      preco: 697632.0,
      disponivel: false,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1805",
      andar: 18,
      nome: "Sala 5 - 1805",
      area: 58.58,
      posicao: "LATERAL OESTE",
      preco: 755682.0,
      disponivel: false,
      imagem: "seedImg/sala5.png",
      planta: "seedPlanta/planta-sala-5.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1806",
      andar: 18,
      nome: "Sala 6 - 1806",
      area: 55.77,
      posicao: "FRENTE OESTE",
      preco: 719433.0,
      disponivel: false,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1807",
      andar: 18,
      nome: "Sala 7 - 1807",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      preco: 1008780.0,
      disponivel: false,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1808",
      andar: 18,
      nome: "Sala 8 - 1808",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      preco: 852174.0,
      disponivel: false,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
    },
  });

  // Andar 17
  await prisma.sala.create({
    data: {
      numero: "1701",
      andar: 17,
      nome: "Sala 1 - 1701",
      area: 67.61,
      posicao: "FRENTE SUL",
      preco: 872169.0,
      disponivel: false,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1702",
      andar: 17,
      nome: "Sala 2 - 1702",
      area: 56.21,
      posicao: "LATERAL SUL",
      preco: 725109.0,
      disponivel: false,
      imagem: "seedImg/sala2.png",
      planta: "seedPlanta/planta-sala-2.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1703",
      andar: 17,
      nome: "Sala 3 - 1703",
      area: 67.28,
      posicao: "LATERAL NORTE",
      preco: 867912.0,
      disponivel: false,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1704",
      andar: 17,
      nome: "Sala 4 - 1704",
      area: 54.08,
      posicao: "FRENTE NORTE",
      preco: 697632.0,
      disponivel: false,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1705",
      andar: 17,
      nome: "Sala 5 - 1705",
      area: 58.58,
      posicao: "LATERAL OESTE",
      preco: 755682.0,
      disponivel: false,
      imagem: "seedImg/sala5.png",
      planta: "seedPlanta/planta-sala-5.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1706",
      andar: 17,
      nome: "Sala 6 - 1706",
      area: 55.77,
      posicao: "FRENTE OESTE",
      preco: 719433.0,
      disponivel: false,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1707",
      andar: 17,
      nome: "Sala 7 - 1707",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      preco: 1008780.0,
      disponivel: false,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1708",
      andar: 17,
      nome: "Sala 8 - 1708",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      preco: 852174.0,
      disponivel: false,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
    },
  });

  // Andar 16
  await prisma.sala.create({
    data: {
      numero: "1601",
      andar: 16,
      nome: "Sala 1 - 1601",
      area: 67.61,
      posicao: "FRENTE SUL",
      preco: 872169.0,
      disponivel: true,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
      proposta_pdf: "uploads/proposta-1601.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1602",
      andar: 16,
      nome: "Sala 2 - 1602",
      area: 56.21,
      posicao: "LATERAL SUL",
      preco: 725109.0,
      disponivel: false,
      imagem: "seedImg/sala2.png",
      planta: "seedPlanta/planta-sala-2.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1603",
      andar: 16,
      nome: "Sala 3 - 1603",
      area: 67.28,
      posicao: "LATERAL NORTE",
      preco: 867912.0,
      disponivel: false,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1604",
      andar: 16,
      nome: "Sala 4 - 1604",
      area: 54.08,
      posicao: "FRENTE NORTE",
      preco: 697632.0,
      disponivel: false,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1605",
      andar: 16,
      nome: "Sala 5 - 1605",
      area: 58.58,
      posicao: "LATERAL OESTE",
      preco: 755682.0,
      disponivel: false,
      imagem: "seedImg/sala5.png",
      planta: "seedPlanta/planta-sala-5.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1606",
      andar: 16,
      nome: "Sala 6 - 1606",
      area: 55.77,
      posicao: "FRENTE OESTE",
      preco: 719433.0,
      disponivel: false,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1607",
      andar: 16,
      nome: "Sala 7 - 1607",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      preco: 1008780.0,
      disponivel: false,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1608",
      andar: 16,
      nome: "Sala 8 - 1608",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      preco: 852174.0,
      disponivel: false,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
    },
  });

  // Andar 15
  await prisma.sala.create({
    data: {
      numero: "1501",
      andar: 15,
      nome: "Sala 1 - 1501",
      area: 67.61,
      posicao: "FRENTE SUL",
      preco: 872169.0,
      disponivel: true,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
      proposta_pdf: "uploads/proposta-1501.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1502",
      andar: 15,
      nome: "Sala 2 - 1502",
      area: 56.21,
      posicao: "LATERAL SUL",
      preco: 725109.0,
      disponivel: false,
      imagem: "seedImg/sala2.png",
      planta: "seedPlanta/planta-sala-2.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1503",
      andar: 15,
      nome: "Sala 3 - 1503",
      area: 67.28,
      posicao: "LATERAL NORTE",
      preco: 867912.0,
      disponivel: false,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1504",
      andar: 15,
      nome: "Sala 4 - 1504",
      area: 54.08,
      posicao: "FRENTE NORTE",
      preco: 697632.0,
      disponivel: false,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1505",
      andar: 15,
      nome: "Sala 5 - 1505",
      area: 58.58,
      posicao: "LATERAL OESTE",
      preco: 755682.0,
      disponivel: false,
      imagem: "seedImg/sala5.png",
      planta: "seedPlanta/planta-sala-5.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1506",
      andar: 15,
      nome: "Sala 6 - 1506",
      area: 55.77,
      posicao: "FRENTE OESTE",
      preco: 719433.0,
      disponivel: false,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1507",
      andar: 15,
      nome: "Sala 7 - 1507",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      preco: 1008780.0,
      disponivel: false,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1508",
      andar: 15,
      nome: "Sala 8 - 1508",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      preco: 852174.0,
      disponivel: false,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
    },
  });

  // Andar 14
  await prisma.sala.create({
    data: {
      numero: "1401",
      andar: 14,
      nome: "Sala 1 - 1401",
      area: 67.61,
      posicao: "FRENTE SUL",
      preco: 872169.0,
      disponivel: true,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
      proposta_pdf: "uploads/proposta-1401.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1402",
      andar: 14,
      nome: "Sala 2 - 1402",
      area: 56.21,
      posicao: "LATERAL SUL",
      preco: 725109.0,
      disponivel: false,
      imagem: "seedImg/sala2.png",
      planta: "seedPlanta/planta-sala-2.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1403",
      andar: 14,
      nome: "Sala 3 - 1403",
      area: 67.28,
      posicao: "LATERAL NORTE",
      preco: 867912.0,
      disponivel: false,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1404",
      andar: 14,
      nome: "Sala 4 - 1404",
      area: 54.08,
      posicao: "FRENTE NORTE",
      preco: 697632.0,
      disponivel: false,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1405",
      andar: 14,
      nome: "Sala 5 - 1405",
      area: 58.58,
      posicao: "LATERAL OESTE",
      preco: 755682.0,
      disponivel: true,
      imagem: "seedImg/sala5.png",
      planta: "seedPlanta/planta-sala-5.png",
      proposta_pdf: "uploads/proposta-1405.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1406",
      andar: 14,
      nome: "Sala 6 - 1406",
      area: 55.77,
      posicao: "FRENTE OESTE",
      preco: 719433.0,
      disponivel: false,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1407",
      andar: 14,
      nome: "Sala 7 - 1407",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      preco: 1008780.0,
      disponivel: false,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1408",
      andar: 14,
      nome: "Sala 8 - 1408",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      preco: 852174.0,
      disponivel: false,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
    },
  });

  // Andar 13
  await prisma.sala.create({
    data: {
      numero: "1301",
      andar: 13,
      nome: "Sala 1 - 1301",
      area: 67.61,
      posicao: "FRENTE SUL",
      preco: 872169.0,
      disponivel: false,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1302",
      andar: 13,
      nome: "Sala 2 - 1302",
      area: 56.21,
      posicao: "LATERAL SUL",
      preco: 725109.0,
      disponivel: false,
      imagem: "seedImg/sala2.png",
      planta: "seedPlanta/planta-sala-2.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1303",
      andar: 13,
      nome: "Sala 3 - 1303",
      area: 67.28,
      posicao: "LATERAL NORTE",
      preco: 867912.0,
      disponivel: false,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1304",
      andar: 13,
      nome: "Sala 4 - 1304",
      area: 54.08,
      posicao: "FRENTE NORTE",
      preco: 697632.0,
      disponivel: false,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1305",
      andar: 13,
      nome: "Sala 5 - 1305",
      area: 58.58,
      posicao: "LATERAL OESTE",
      preco: 755682.0,
      disponivel: true,
      imagem: "seedImg/sala5.png",
      planta: "seedPlanta/planta-sala-5.png",
      proposta_pdf: "uploads/proposta-1305.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1306",
      andar: 13,
      nome: "Sala 6 - 1306",
      area: 55.77,
      posicao: "FRENTE OESTE",
      preco: 719433.0,
      disponivel: true,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
      proposta_pdf: "uploads/proposta-1306.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1307",
      andar: 13,
      nome: "Sala 7 - 1307",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      preco: 1008780.0,
      disponivel: true,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
      proposta_pdf: "uploads/proposta-1307.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1308",
      andar: 13,
      nome: "Sala 8 - 1308",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      preco: 852174.0,
      disponivel: true,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
      proposta_pdf: "uploads/proposta-1308.pdf",
    },
  });

  // Andar 12
  await prisma.sala.create({
    data: {
      numero: "1201",
      andar: 12,
      nome: "Sala 1 - 1201",
      area: 67.61,
      posicao: "FRENTE SUL",
      preco: 872169.0,
      disponivel: false,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1202",
      andar: 12,
      nome: "Sala 2 - 1202",
      area: 56.21,
      posicao: "LATERAL SUL",
      preco: 725109.0,
      disponivel: false,
      imagem: "seedImg/sala2.png",
      planta: "seedPlanta/planta-sala-2.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1203",
      andar: 12,
      nome: "Sala 3 - 1203",
      area: 67.28,
      posicao: "LATERAL NORTE",
      preco: 867912.0,
      disponivel: false,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1204",
      andar: 12,
      nome: "Sala 4 - 1204",
      area: 54.08,
      posicao: "FRENTE NORTE",
      preco: 697632.0,
      disponivel: false,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1205",
      andar: 12,
      nome: "Sala 5 - 1205",
      area: 58.58,
      posicao: "LATERAL OESTE",
      preco: 755682.0,
      disponivel: true,
      imagem: "seedImg/sala5.png",
      planta: "seedPlanta/planta-sala-5.png",
      proposta_pdf: "uploads/proposta-1205.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1206",
      andar: 12,
      nome: "Sala 6 - 1206",
      area: 55.77,
      posicao: "FRENTE OESTE",
      preco: 719433.0,
      disponivel: true,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
      proposta_pdf: "uploads/proposta-1206.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1207",
      andar: 12,
      nome: "Sala 7 - 1207",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      preco: 1008780.0,
      disponivel: false,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1208",
      andar: 12,
      nome: "Sala 8 - 1208",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      preco: 852174.0,
      disponivel: true,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
      proposta_pdf: "uploads/proposta-1208.pdf",
    },
  });

  // Andar 11
  await prisma.sala.create({
    data: {
      numero: "1101",
      andar: 11,
      nome: "Sala 1 - 1101",
      area: 67.61,
      posicao: "FRENTE SUL",
      preco: 872169.0,
      disponivel: false,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1102",
      andar: 11,
      nome: "Sala 2 - 1102",
      area: 56.21,
      posicao: "LATERAL SUL",
      preco: 725109.0,
      disponivel: false,
      imagem: "seedImg/sala2.png",
      planta: "seedPlanta/planta-sala-2.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1103",
      andar: 11,
      nome: "Sala 3 - 1103",
      area: 67.28,
      posicao: "LATERAL NORTE",
      preco: 867912.0,
      disponivel: false,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1104",
      andar: 11,
      nome: "Sala 4 - 1104",
      area: 54.08,
      posicao: "FRENTE NORTE",
      preco: 697632.0,
      disponivel: false,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1105",
      andar: 11,
      nome: "Sala 5 - 1105",
      area: 58.58,
      posicao: "LATERAL OESTE",
      preco: 755682.0,
      disponivel: true,
      imagem: "seedImg/sala5.png",
      planta: "seedPlanta/planta-sala-5.png",
      proposta_pdf: "uploads/proposta-1105.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1106",
      andar: 11,
      nome: "Sala 6 - 1106",
      area: 55.77,
      posicao: "FRENTE OESTE",
      preco: 719433.0,
      disponivel: true,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
      proposta_pdf: "uploads/proposta-1106.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1107",
      andar: 11,
      nome: "Sala 7 - 1107",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      preco: 1008780.0,
      disponivel: true,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
      proposta_pdf: "uploads/proposta-1107.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1108",
      andar: 11,
      nome: "Sala 8 - 1108",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      preco: 852174.0,
      disponivel: true,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
      proposta_pdf: "uploads/proposta-1108.pdf",
    },
  });

  // Andar 10
  await prisma.sala.create({
    data: {
      numero: "1001",
      andar: 10,
      nome: "Sala 1 - 1001",
      area: 67.61,
      posicao: "FRENTE SUL",
      preco: 872169.0,
      disponivel: true,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
      proposta_pdf: "uploads/proposta-1001.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1002",
      andar: 10,
      nome: "Sala 2 - 1002",
      area: 56.21,
      posicao: "LATERAL SUL",
      preco: 725109.0,
      disponivel: false,
      imagem: "seedImg/sala2.png",
      planta: "seedPlanta/planta-sala-2.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1003",
      andar: 10,
      nome: "Sala 3 - 1003",
      area: 67.28,
      posicao: "LATERAL NORTE",
      preco: 867912.0,
      disponivel: false,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1004",
      andar: 10,
      nome: "Sala 4 - 1004",
      area: 54.08,
      posicao: "FRENTE NORTE",
      preco: 697632.0,
      disponivel: false,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1005",
      andar: 10,
      nome: "Sala 5 - 1005",
      area: 58.58,
      posicao: "LATERAL OESTE",
      preco: 755682.0,
      disponivel: false,
      imagem: "seedImg/sala5.png",
      planta: "seedPlanta/planta-sala-5.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1006",
      andar: 10,
      nome: "Sala 6 - 1006",
      area: 55.77,
      posicao: "FRENTE OESTE",
      preco: 719433.0,
      disponivel: false,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1007",
      andar: 10,
      nome: "Sala 7 - 1007",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      preco: 1008780.0,
      disponivel: true,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
      proposta_pdf: "uploads/proposta-1007.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "1008",
      andar: 10,
      nome: "Sala 8 - 1008",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      preco: 852174.0,
      disponivel: true,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
      proposta_pdf: "uploads/proposta-1008.pdf",
    },
  });

  // Andar 9
  await prisma.sala.create({
    data: {
      numero: "901",
      andar: 9,
      nome: "Sala 1 - 901",
      area: 67.61,
      posicao: "FRENTE SUL",
      preco: 804559.0,
      disponivel: true,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
      proposta_pdf: "uploads/proposta-901.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "902",
      andar: 9,
      nome: "Sala 2 - 902",
      area: 56.21,
      posicao: "LATERAL SUL",
      preco: 668899.0,
      disponivel: false,
      imagem: "seedImg/sala2.png",
      planta: "seedPlanta/planta-sala-2.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "903",
      andar: 9,
      nome: "Sala 3 - 903",
      area: 67.28,
      posicao: "LATERAL NORTE",
      preco: 800632.0,
      disponivel: true,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
      proposta_pdf: "uploads/proposta-903.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "904",
      andar: 9,
      nome: "Sala 4 - 904",
      area: 54.08,
      posicao: "FRENTE NORTE",
      preco: 643552.0,
      disponivel: false,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "905",
      andar: 9,
      nome: "Sala 5 - 905",
      area: 58.58,
      posicao: "LATERAL OESTE",
      preco: 697102.0,
      disponivel: false,
      imagem: "seedImg/sala5.png",
      planta: "seedPlanta/planta-sala-5.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "906",
      andar: 9,
      nome: "Sala 6 - 906",
      area: 55.77,
      posicao: "FRENTE OESTE",
      preco: 663663.0,
      disponivel: true,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
      proposta_pdf: "uploads/proposta-906.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "907",
      andar: 9,
      nome: "Sala 7 - 907",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      preco: 930580.0,
      disponivel: true,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
      proposta_pdf: "uploads/proposta-907.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "908",
      andar: 9,
      nome: "Sala 8 - 908",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      preco: 786114.0,
      disponivel: false,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
    },
  });

  // Andar 8
  await prisma.sala.create({
    data: {
      numero: "801",
      andar: 8,
      nome: "Sala 1 - 801",
      area: 67.61,
      posicao: "FRENTE SUL",
      preco: 804559.0,
      disponivel: true,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
      proposta_pdf: "uploads/proposta-801.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "802",
      andar: 8,
      nome: "Sala 2 - 802",
      area: 56.21,
      posicao: "LATERAL SUL",
      preco: 668899.0,
      disponivel: false,
      imagem: "seedImg/sala2.png",
      planta: "seedPlanta/planta-sala-2.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "803",
      andar: 8,
      nome: "Sala 3 - 803",
      area: 67.28,
      posicao: "LATERAL NORTE",
      preco: 800632.0,
      disponivel: false,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "804",
      andar: 8,
      nome: "Sala 4 - 804",
      area: 54.08,
      posicao: "FRENTE NORTE",
      preco: 643552.0,
      disponivel: false,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "805",
      andar: 8,
      nome: "Sala 5 - 805",
      area: 58.58,
      posicao: "LATERAL OESTE",
      preco: 697102.0,
      disponivel: false,
      imagem: "seedImg/sala5.png",
      planta: "seedPlanta/planta-sala-5.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "806",
      andar: 8,
      nome: "Sala 6 - 806",
      area: 55.77,
      posicao: "FRENTE OESTE",
      preco: 663663.0,
      disponivel: false,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "807",
      andar: 8,
      nome: "Sala 7 - 807",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      preco: 930580.0,
      disponivel: true,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
      proposta_pdf: "uploads/proposta-807.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "808",
      andar: 8,
      nome: "Sala 8 - 808",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      preco: 786114.0,
      disponivel: true,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
      proposta_pdf: "uploads/proposta-808.pdf",
    },
  });

  // Andar 7
  await prisma.sala.create({
    data: {
      numero: "701",
      andar: 7,
      nome: "Sala 1 - 701",
      area: 67.61,
      posicao: "FRENTE SUL",
      preco: 804559.0,
      disponivel: true,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
      proposta_pdf: "uploads/proposta-701.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "702",
      andar: 7,
      nome: "Sala 2 - 702",
      area: 56.21,
      posicao: "LATERAL SUL",
      preco: 668899.0,
      disponivel: false,
      imagem: "seedImg/sala2.png",
      planta: "seedPlanta/planta-sala-2.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "703",
      andar: 7,
      nome: "Sala 3 - 703",
      area: 67.28,
      posicao: "LATERAL NORTE",
      preco: 800632.0,
      disponivel: false,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "704",
      andar: 7,
      nome: "Sala 4 - 704",
      area: 54.08,
      posicao: "FRENTE NORTE",
      preco: 643552.0,
      disponivel: false,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "705",
      andar: 7,
      nome: "Sala 5 - 705",
      area: 58.58,
      posicao: "LATERAL OESTE",
      preco: 697102.0,
      disponivel: true,
      imagem: "seedImg/sala5.png",
      planta: "seedPlanta/planta-sala-5.png",
      proposta_pdf: "uploads/proposta-705.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "706",
      andar: 7,
      nome: "Sala 6 - 706",
      area: 55.77,
      posicao: "FRENTE OESTE",
      preco: 663663.0,
      disponivel: true,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
      proposta_pdf: "uploads/proposta-706.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "707",
      andar: 7,
      nome: "Sala 7 - 707",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      preco: 930580.0,
      disponivel: true,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
      proposta_pdf: "uploads/proposta-707.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "708",
      andar: 7,
      nome: "Sala 8 - 708",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      preco: 786114.0,
      disponivel: true,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
      proposta_pdf: "uploads/proposta-708.pdf",
    },
  });

  // Andar 6
  await prisma.sala.create({
    data: {
      numero: "601",
      andar: 6,
      nome: "Sala 1 - 601",
      area: 67.61,
      posicao: "FRENTE SUL",
      preco: 804559.0,
      disponivel: false,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "602",
      andar: 6,
      nome: "Sala 2 - 602",
      area: 56.21,
      posicao: "LATERAL SUL",
      preco: 668899.0,
      disponivel: false,
      imagem: "seedImg/sala2.png",
      planta: "seedPlanta/planta-sala-2.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "603",
      andar: 6,
      nome: "Sala 3 - 603",
      area: 67.28,
      posicao: "LATERAL NORTE",
      preco: 800632.0,
      disponivel: true,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
      proposta_pdf: "uploads/proposta-603.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "604",
      andar: 6,
      nome: "Sala 4 - 604",
      area: 54.08,
      posicao: "FRENTE NORTE",
      preco: 643552.0,
      disponivel: false,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "605",
      andar: 6,
      nome: "Sala 5 - 605",
      area: 58.58,
      posicao: "LATERAL OESTE",
      preco: 697102.0,
      disponivel: false,
      imagem: "seedImg/sala5.png",
      planta: "seedPlanta/planta-sala-5.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "606",
      andar: 6,
      nome: "Sala 6 - 606",
      area: 55.77,
      posicao: "FRENTE OESTE",
      preco: 663663.0,
      disponivel: true,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
      proposta_pdf: "uploads/proposta-606.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "607",
      andar: 6,
      nome: "Sala 7 - 607",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      preco: 930580.0,
      disponivel: true,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
      proposta_pdf: "uploads/proposta-607.pdf",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "608",
      andar: 6,
      nome: "Sala 8 - 608",
      area: 66.06,
      posicao: "FRENTE NORDESTE",
      preco: 786114.0,
      disponivel: true,
      imagem: "seedImg/sala8.png",
      planta: "seedPlanta/planta-sala-8.png",
      proposta_pdf: "uploads/proposta-608.pdf",
    },
  });

  // Andar 5 - Salas Prime (Reservadas)
  await prisma.sala.create({
    data: {
      numero: "Prime 501",
      andar: 5,
      nome: "Prime 501",
      area: 56.12,
      posicao: "PRIME",
      preco: 1010160.0,
      disponivel: false,
      imagem: "seedImg/sala1.png",
      planta: "seedPlanta/planta-sala-1.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "Prime 502",
      andar: 5,
      nome: "Prime 502",
      area: 67.18,
      posicao: "PRIME",
      preco: 1209240.0,
      disponivel: false,
      imagem: "seedImg/sala2.png",
      planta: "seedPlanta/planta-sala-2.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "Prime 503",
      andar: 5,
      nome: "Prime 503",
      area: 53.90,
      posicao: "PRIME",
      preco: 970200.0,
      disponivel: false,
      imagem: "seedImg/sala3.png",
      planta: "seedPlanta/planta-sala-3.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "Prime 504",
      andar: 5,
      nome: "Prime 504",
      area: 58.50,
      posicao: "PRIME",
      preco: 1053000.0,
      disponivel: false,
      imagem: "seedImg/sala4.png",
      planta: "seedPlanta/planta-sala-4.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "Prime 505",
      andar: 5,
      nome: "Prime 505",
      area: 55.69,
      posicao: "PRIME",
      preco: 1002420.0,
      disponivel: false,
      imagem: "seedImg/sala5.png",
      planta: "seedPlanta/planta-sala-5.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "Prime 506",
      andar: 5,
      nome: "Prime 506",
      area: 77.34,
      posicao: "PRIME",
      preco: 1392120.0,
      disponivel: false,
      imagem: "seedImg/sala6.png",
      planta: "seedPlanta/planta-sala-6.png",
    },
  });
  await prisma.sala.create({
    data: {
      numero: "Prime 507",
      andar: 5,
      nome: "Prime 507",
      area: 66.06,
      posicao: "PRIME",
      preco: 1189080.0,
      disponivel: false,
      imagem: "seedImg/sala7.png",
      planta: "seedPlanta/planta-sala-7.png",
    },
  });

  console.log("✅ Todas as salas foram criadas com os dados atualizados!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
