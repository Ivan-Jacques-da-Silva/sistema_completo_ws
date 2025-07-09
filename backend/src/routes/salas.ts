
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Interfaces
interface SalaQuery {
  andar?: string;
}

interface SalaResponse {
  produtos: Array<{
    variacoes: Array<{
      atributos: {
        andar?: Array<{ valor: number }>;
        nome?: Array<{ valor: string }>;
        area?: Array<{ valor: string }>;
        posicao?: Array<{ valor: string }>;
        disponibilidade?: Array<{ valor: boolean }>;
      };
      variacoes?: Array<any>;
      precos?: {
        de: Array<{ valor: string }>;
      };
      arquivos?: {
        imagens: Array<{ baixar: string }>;
        plantas: Array<{ baixar: string }>;
      };
    }>;
  }>;
}

// Buscar todas as salas (público)
router.get('/', async (req: Request<{}, any, any, SalaQuery>, res: Response) => {
  try {
    const { andar } = req.query;
    
    const where = andar ? { andar: parseInt(andar) } : {};
    
    const salas = await prisma.sala.findMany({
      where,
      orderBy: [
        { andar: 'asc' },
        { numero: 'asc' }
      ]
    });

    if (salas.length === 0) {
      return res.json({
        produtos: [{
          variacoes: []
        }]
      });
    }

    const response: SalaResponse = {
      produtos: [{
        variacoes: salas.reduce((acc: any[], sala) => {
          let andarExistente = acc.find(a => a.atributos?.andar?.[0]?.valor === sala.andar);
          
          if (!andarExistente) {
            andarExistente = {
              atributos: {
                andar: [{ valor: sala.andar }]
              },
              variacoes: []
            };
            acc.push(andarExistente);
          }
          
          andarExistente.variacoes.push({
            atributos: {
              nome: [{ valor: sala.nome }],
              area: [{ valor: sala.area.toString() }],
              posicao: [{ valor: sala.posicao }],
              disponibilidade: [{ valor: sala.disponivel }]
            },
            precos: {
              de: [{ valor: sala.preco.toString() }]
            },
            arquivos: {
              imagens: sala.imagem ? [{ baixar: `/uploads/${sala.imagem}` }] : [],
              plantas: sala.planta ? [{ baixar: `/uploads/${sala.planta}` }] : []
            }
          });
          
          return acc;
        }, [])
      }]
    };

    res.json(response);
  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro interno do servidor' 
    });
  }
});

// Buscar sala específica
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const sala = await prisma.sala.findUnique({
      where: { id: parseInt(id) }
    });

    if (!sala) {
      return res.status(404).json({ 
        sucesso: false, 
        mensagem: 'Sala não encontrada' 
      });
    }

    res.json(sala);
  } catch (error) {
    console.error('Erro ao buscar sala:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro interno do servidor' 
    });
  }
});

export default router;
