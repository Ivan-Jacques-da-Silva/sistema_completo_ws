-- CreateTable
CREATE TABLE "pre_reservas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "visualizado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pre_reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contrapropostas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "proposta" TEXT NOT NULL,
    "visualizado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contrapropostas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agendamentos_reuniao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "visualizado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agendamentos_reuniao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "usuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salas" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "andar" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "posicao" TEXT NOT NULL,
    "orientacao" TEXT,
    "preco" DOUBLE PRECISION NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "imagem" TEXT,
    "planta" TEXT,
    "proposta" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "salas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico_alteracoes" (
    "id" SERIAL NOT NULL,
    "tabela" TEXT NOT NULL,
    "operacao" TEXT NOT NULL,
    "registro_id" INTEGER,
    "dados_antes" JSONB,
    "dados_depois" JSONB,
    "usuario" TEXT NOT NULL,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historico_alteracoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_usuario_key" ON "admins"("usuario");
