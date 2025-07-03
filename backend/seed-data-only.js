const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Andar 15
  await prisma.sala.create({
    data: {
      numero: "1501",
      andar: 15,
      nome: "Sala 1 - 1501",
      area: 67.61,
      posicao: "FRENTE SUL",
      preco: 804559.0,
      disponivel: false,
      imagem: "sala1.png",
      planta: "planta-sala-1.png",
    }
  });

  await prisma.sala.create({
    data: {
      numero: "1502",
      andar: 15,
      nome: "Sala 2 - 1502",
      area: 56.21,
      posicao: "LATERAL SUL",
      preco: 618310.0,
      disponivel: true,
      imagem: "sala2.png",
      planta: "planta-sala-2.png",
    }
  });

  await prisma.sala.create({
    data: {
      numero: "1503",
      andar: 15,
      nome: "Sala 3 - 1503",
      area: 67.28,
      posicao: "LATERAL NORTE",
      preco: 800632.0,
      disponivel: true,
      imagem: "sala3.png",
      planta: "planta-sala-3.png",
    }
  });

  await prisma.sala.create({
    data: {
      numero: "1504",
      andar: 15,
      nome: "Sala 4 - 1504",
      area: 54.08,
      posicao: "FRENTE NORTE",
      preco: 594880.0,
      disponivel: true,
      imagem: "sala4.png",
      planta: "planta-sala-4.png",
    }
  });

  await prisma.sala.create({
    data: {
      numero: "1505",
      andar: 15,
      nome: "Sala 5 - 1505",
      area: 58.58,
      posicao: "LATERAL OESTE",
      preco: 644380.0,
      disponivel: true,
      imagem: "sala5.png",
      planta: "planta-sala-5.png",
    }
  });

  await prisma.sala.create({
    data: {
      numero: "1506",
      andar: 15,
      nome: "Sala 6 - 1506",
      area: 66.06,
      posicao: "FRENTE OESTE",
      preco: 663663.0,
      disponivel: false,
      imagem: "sala6.png",
      planta: "planta-sala-6.png",
    }
  });

  await prisma.sala.create({
    data: {
      numero: "1507",
      andar: 15,
      nome: "Sala 7 - 1507",
      area: 78.2,
      posicao: "LATERAL NORDESTE",
      preco: 930580.0,
      disponivel: true,
      imagem: "sala7.png",
      planta: "planta-sala-7.png",
    }
  });

  // Andar 16
  await prisma.sala.create({
    data: {
      numero: "1601",
      andar: 16,
      nome: "Sala 1 - 1601",
      area: 67.61,
      posicao: "FRENTE SUL",
      preco: 804559.0,
      disponivel: true,
      imagem: "sala1.png",
      planta: "planta-sala-1.png",
    }
  });

  await prisma.sala.create({
    data: {
      numero: "1602",
      andar: 16,
      nome: "Sala 2 - 1602",
      area: 56.21,
      posicao: "LATERAL SUL",
      preco: 618310.0,
      disponivel: true,
      imagem: "sala2.png",
      planta: "planta-sala-2.png",
    }
  });

  await prisma.sala.create({
    data: {
      numero: "1603",
      andar: 16,
      nome: "Sala 3 - 1603",
      area: 67.28,
      posicao: "LATERAL NORTE",
      preco: 800632.0,
      disponivel: false,
      imagem: "sala3.png",
      planta: "planta-sala-3.png",
    }
  });

  await prisma.sala.create({
    data: {
      numero: "1604",
      andar: 16,
      nome: "Sala 4 - 1604",
      area: 54.08,
      posicao: "FRENTE NORTE",
      preco: 594880.0,
      disponivel: true,
      imagem: "sala4.png",
      planta: "planta-sala-4.png",
    }
  });

  console.log("✅ Salas criadas com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });