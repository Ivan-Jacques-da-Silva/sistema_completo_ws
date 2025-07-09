import FormularioData from "../api/FormulariosData";
import Salas from "./../api/Salas.jsx";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Offcanvas } from "react-bootstrap";
import "../styles/Andares.css";
import logo from "../img/logo.png";
import Config from "../Config";

const salasCom = [
    603, 606, 607, 608, 701, 705, 706, 707, 708, 801, 807, 808, 901, 903, 906,
    907, 1001, 1007, 1008, 1105, 1106, 1107, 1108, 1205, 1206, 1208, 1305, 1306,
    1307, 1308, 1401, 1405, 1501, 1601,
];

const Andares = () => {
    const [searchParams] = useSearchParams();
    const andarUrl = searchParams.get("andar");
    const [larguraTela, setLarguraTela] = useState(window.innerWidth);
    const [andarSelecionado, setAndarSelecionado] = useState("15° andar");
    const [salaSelecionada, setSalaSelecionada] = useState(1);
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const [dadosProduto, setDadosProduto] = useState(null);
    const [mostrarProposta, setMostrarProposta] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const andares = Array.from({ length: 15 }, (_, i) => `${19 - i}° andar`);

    useEffect(() => {
        if (andarUrl) setAndarSelecionado(`${andarUrl}° andar`);
    }, [andarUrl]);

    useEffect(() => {
        const handleResize = () => setLarguraTela(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const response = await fetch(`${Config.api_url}/api/salas`);
                if (!response.ok) {
                    throw new Error(
                        `Erro ${response.status}: ${response.statusText}`,
                    );
                }
                const data = await response.json();
                console.log("Dados recebidos das salas:", data); // Debug

                if (data.sucesso && data.produtos) {
                    setDadosProduto(data);
                } else {
                    console.error("Estrutura de dados inválida:", data);
                    setDadosProduto({
                        produtos: [
                            {
                                variacoes: [],
                            },
                        ],
                    });
                }
            } catch (error) {
                console.error("Erro ao buscar salas:", error.message);
                // Dados de fallback para demonstração
                setDadosProduto({
                    produtos: [
                        {
                            variacoes: [],
                        },
                    ],
                });
            }
        };
        fetchProduto();
    }, []);

    const variacoesAndares = dadosProduto?.produtos[0]?.variacoes || [];
    const andarAtual = variacoesAndares.find(
        (v) => v.atributos?.andar?.[0]?.valor === parseInt(andarSelecionado),
    );
    const salasDinamicas = andarAtual?.variacoes || [];
    const salaAtual = salasDinamicas[salaSelecionada - 1];

    // Se não há dados de produto, mostrar loading
    if (!dadosProduto) {
        return (
            <div className="andares-page bg-white">
                <Container
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100vh" }}
                >
                    <div className="text-center">
                        <div
                            className="spinner-border text-primary mb-3"
                            role="status"
                        ></div>
                        <h5>Carregando informações das salas...</h5>
                    </div>
                </Container>
            </div>
        );
    }

    const valorSala = parseFloat(salaAtual?.precos?.de?.[0]?.valor || 0);
    const valorGaragem = 60000;
    const descontoFixo = 36801.63;
    const valorTotalSemDesconto = valorSala + valorGaragem;
    const valorTotal = valorTotalSemDesconto - descontoFixo;
    const entrada = valorTotalSemDesconto * 0.3;
    const reforco2025 = valorTotalSemDesconto * 0.1;
    const reforco2026 = valorTotalSemDesconto * 0.1;
    const reforco2027 = valorTotalSemDesconto * 0.1;
    const valorParcelamento =
        valorTotalSemDesconto -
        (entrada + reforco2025 + reforco2026 + reforco2027);
    const parcelaCub = valorParcelamento / 55;
    const valorizacaoEntrega = valorTotalSemDesconto * 1.9;
    const lucro = valorizacaoEntrega - valorTotalSemDesconto;
    const valorAluguel = valorTotalSemDesconto * 0.0095;

    const handlePagamento = async (sala) => {
        try {
            setIsSubmitting(true);
            console.log("🔄 Iniciando pagamento para sala:", sala.id);

            // TODO: Configurar o priceId no seu painel Stripe
            // Você pode usar um priceId fixo ou calcular dinamicamente
            const priceId = "price_XXXXXXXXX"; // TODO: Substituir pelo seu price_id real

            const session = await fetch(
                `${Config.api_url}/stripe/create-checkout-session`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        salaId: sala.id,
                        nomeSala: sala.atributos.nome[0].valor,
                        preco: parseFloat(sala.precos?.de?.[0]?.valor || 0),
                        // priceId: priceId, // TODO: Descomentar se usar price_id fixo
                        // TODO: Adicionar outros dados se necessário
                        // andar: sala.andar,
                        // area: sala.atributos.area[0].valor
                    }),
                },
            );

            if (!session.ok) {
                throw new Error(
                    `Erro ${session.status}: ${session.statusText}`,
                );
            }

            const data = await session.json();

            if (data.url) {
                console.log("✅ Redirecionando para checkout:", data.sessionId);
                window.location.href = data.url;
            } else {
                throw new Error("URL de checkout não recebida");
            }
        } catch (error) {
            console.error("❌ Erro ao iniciar pagamento:", error);
            alert("Erro ao processar pagamento. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="andares-page bg-white">
            <header className="ws-header py-3">
                <Container>
                    <Row className="align-items-center justify-content-between">
                        <Col xs="auto">
                            <Link to="/">
                                <img
                                    src={logo}
                                    alt="Wall Street Corporate"
                                    className="ws-logo-img"
                                />
                            </Link>
                        </Col>
                        <Col xs="auto">
                            <div className="d-none d-md-flex justify-content-end align-items-center">
                                <Link to="/" className="ws-nav-link mx-3">
                                    INÍCIO
                                </Link>
                                <a
                                    href="https://tour360.meupasseiovirtual.com/067962/278515/tourvirtual/index.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ws-nav-link mx-3"
                                >
                                    TOUR VIRTUAL
                                </a>

                                {/* <a href="#" className="ws-nav-link mx-3">CONTATO</a> */}
                                <Button
                                    as="a"
                                    href="https://front.wallstreetnr.com.br/folder-wall-street-corporate.pdf"
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        backgroundColor: "#fff",
                                        border: "none",
                                        color: "#001A47",
                                    }}
                                    className="ws-pdf-button mx-3"
                                >
                                    BAIXAR PDF
                                </Button>
                            </div>
                            <div className="d-block d-md-none">
                                <Button
                                    onClick={() => setMostrarMenu(true)}
                                    style={{
                                        backgroundColor: "transparent",
                                        border: "1px solid #ccc",
                                        color: "#6c757d",
                                        fontSize: "22px",
                                        padding: "6px 12px",
                                        lineHeight: 1,
                                        borderRadius: "8px",
                                    }}
                                >
                                    ☰
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Offcanvas
                        show={mostrarMenu}
                        onHide={() => setMostrarMenu(false)}
                        placement="top"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title className="fw-bold">
                                Menu
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="d-flex flex-column p-3 text-center">
                            <Link
                                to="/"
                                className="btn btn-outline-dark mb-1 fw-semibold"
                                onClick={() => setMostrarMenu(false)}
                            >
                                INÍCIO
                            </Link>
                            <a
                                href="#"
                                className="btn btn-outline-dark mb-1 fw-semibold"
                                onClick={() => setMostrarMenu(false)}
                            >
                                TOUR VIRTUAL
                            </a>
                            <a
                                href="#"
                                className="btn btn-outline-dark mb-1 fw-semibold"
                                onClick={() => setMostrarMenu(false)}
                            >
                                CONTATO
                            </a>
                            <a
                                href="#"
                                className="btn fw-bold"
                                style={{
                                    backgroundColor: "#FFF",
                                    color: "#001A47",
                                }}
                                onClick={() => setMostrarMenu(false)}
                            >
                                BAIXAR PDF
                            </a>
                        </Offcanvas.Body>
                    </Offcanvas>
                </Container>
            </header>

            <Container fluid className="mt-4">
                <Row className={larguraTela < 1199 ? "" : "flex-nowrap"}>
                    <Col xs={12} md={2} xl={2} className="px-2 col-andares">
                        <h2 className="text-center mb-4">
                            ESCOLHA O SEU ANDAR
                        </h2>
                        <div className="d-none d-xl-flex flex-column px-3">
                            {andares.map((andar, index) => (
                                <Button
                                    key={index}
                                    variant={
                                        andar === andarSelecionado
                                            ? "dark"
                                            : "outline-dark"
                                    }
                                    className="mb-1 text-start"
                                    onClick={() => setAndarSelecionado(andar)}
                                >
                                    {andar}
                                </Button>
                            ))}
                        </div>
                        <div className="d-flex d-xl-none flex-wrap justify-content-center gap-2">
                            {andares.map((andar, index) => (
                                <Button
                                    key={index}
                                    size="sm"
                                    variant={
                                        andar === andarSelecionado
                                            ? "dark"
                                            : "outline-dark"
                                    }
                                    style={{ minWidth: "70px" }}
                                    onClick={() => setAndarSelecionado(andar)}
                                >
                                    {andar}
                                </Button>
                            ))}
                        </div>
                    </Col>
                    <Col xs={12} md={4} xl={3} className="px-0 col-salas">
                        <div className="d-flex justify-content-between align-items-center mb-3 p-2">
                            <div>
                                <small className="text-muted d-block">
                                    {andarSelecionado}
                                </small>
                                <h3
                                    className="mb-0 fw-bold text-uppercase"
                                    style={{
                                        fontSize:
                                            larguraTela < 992
                                                ? "1.1rem"
                                                : "1.5rem",
                                    }}
                                >
                                    Escolha
                                    <br /> sua sala
                                </h3>
                            </div>
                            <div className="d-flex flex-wrap align-items-center gap-1 pl-3">
                                <span className="d-flex align-items-center gap-1">
                                    <i className="bi bi-check-circle-fill text-success"></i>
                                    <span className="fw-semibold text-dark mx-1">
                                        DISPONÍVEL{" "}
                                    </span>
                                </span>
                                <span className="d-flex align-items-center gap-1">
                                    <i className="bi bi-x-circle-fill text-danger"></i>
                                    <span className="fw-semibold text-dark mx-1">
                                        RESERVADO
                                    </span>
                                </span>
                            </div>
                        </div>
                        <Salas
                            salas={salasDinamicas}
                            salaSelecionada={salaSelecionada}
                            setSalaSelecionada={setSalaSelecionada}
                            larguraTela={larguraTela}
                            andarSelecionado={andarSelecionado}
                            salasCom={salasCom}
                            setMostrarProposta={setMostrarProposta}
                        />
                    </Col>
                    <Col xs={12} md={3} xl={3} className="px-0 col-planta">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key="planta"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.4 }}
                                className="d-flex align-items-start justify-content-center"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    overflowY: "auto",
                                    zIndex: 1,
                                }}
                            >
                                {salaAtual?.arquivos?.plantas?.[0]?.baixar ? (
                                    <img
                                        src={
                                            salaAtual?.arquivos?.plantas?.[0]
                                                ?.baixar
                                                ? `${Config.api_url}${salaAtual.arquivos.plantas[0].baixar}`
                                                : ""
                                        }
                                        alt={`Planta da Sala ${salaSelecionada}`}
                                        className="img-fluid justify-content-center px-3 planta-img"
                                        style={{ height: "auto" }}
                                        onError={(e) =>
                                            (e.target.style.display = "none")
                                        }
                                    />
                                ) : (
                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{ height: "200px" }}
                                    >
                                        <div
                                            className="spinner-border text-primary"
                                            role="status"
                                        />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </Col>
                    <Col xs={12} md={3} xl={4} className="px-0 col-proposta">
                        <div
                            className="d-flex flex-column bg-light p-4 rounded"
                            style={{ overflowY: "auto" }}
                        >
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ duration: 0.4 }}
                            >
                                <h4 className="fw-bold text-center mb-4">
                                    PROPOSTA ABAIXO
                                </h4>
                                <div className="bg-dark text-white p-3 rounded text-center mb-3">
                                    <div className="fw-bold fs-5">
                                        WALL STREET CORPORATE
                                    </div>
                                    <div className="fw-bold text-white mt-2">
                                        {salaAtual?.atributos?.nome?.[0]?.valor
                                            ? `Sala Comercial ${salaAtual.atributos.nome[0].valor}`
                                            : "Selecione uma sala"}
                                    </div>
                                    <div>
                                        {salaAtual?.atributos?.area?.[0]?.valor
                                            ? `${salaAtual.atributos.area[0].valor}m² de área privativa`
                                            : "Área: -- m²"}
                                    </div>
                                </div>
                                <table className="table table-sm mb-3">
                                    <tbody>
                                        <tr>
                                            <td>Valor da Sala</td>
                                            <td className="text-end">
                                                R${" "}
                                                {valorSala.toLocaleString(
                                                    "pt-BR",
                                                    {
                                                        minimumFractionDigits: 2,
                                                    },
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>01 Vaga de garagem</td>
                                            <td className="text-end">
                                                R$ 60.000,00
                                            </td>
                                        </tr>
                                        <tr className="fw-bold">
                                            <td>Valor Total</td>
                                            <td className="text-end">
                                                R${" "}
                                                {valorTotalSemDesconto.toLocaleString(
                                                    "pt-BR",
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Desconto aplicado</td>
                                            <td className="text-end text-success">
                                                - R${" "}
                                                {descontoFixo.toLocaleString(
                                                    "pt-BR",
                                                )}
                                            </td>
                                        </tr>
                                        <tr className="fw-bold">
                                            <td>Valor Final</td>
                                            <td className="text-end">
                                                R${" "}
                                                {valorTotal.toLocaleString(
                                                    "pt-BR",
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h6 className="fw-bold text-center">
                                    Forma de Pagamento Sugerida
                                </h6>
                                <table className="table table-sm">
                                    <tbody>
                                        <tr>
                                            <td>Entrada</td>
                                            <td className="text-end">
                                                R${" "}
                                                {entrada.toLocaleString(
                                                    "pt-BR",
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Dezembro 2025**</td>
                                            <td className="text-end">
                                                R${" "}
                                                {reforco2025.toLocaleString(
                                                    "pt-BR",
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Dezembro 2026**</td>
                                            <td className="text-end">
                                                R${" "}
                                                {reforco2026.toLocaleString(
                                                    "pt-BR",
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Dezembro 2027(Entrega)**</td>
                                            <td className="text-end">
                                                R${" "}
                                                {reforco2027.toLocaleString(
                                                    "pt-BR",
                                                )}
                                            </td>
                                        </tr>
                                        {/* <tr><td>Valor Parcelamento</td><td className="text-end">R$ {valorParcelamento.toLocaleString('pt-BR')}</td></tr> */}
                                        <tr>
                                            <td>55x**</td>
                                            <td className="text-end">
                                                R${" "}
                                                {parcelaCub.toLocaleString(
                                                    "pt-BR",
                                                    {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    },
                                                )}
                                            </td>
                                        </tr>
                                        <tr className="fw-bold">
                                            <td>Total</td>
                                            <td className="text-end">
                                                R${" "}
                                                {valorTotal.toLocaleString(
                                                    "pt-BR",
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h5 className="text-center fw-bold mt-4 mb-3">
                                    VALORIZAÇÃO ESTIMADA
                                </h5>
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>Valorização até Entrega*</td>
                                            <td className="fw-bold text-end">
                                                R${" "}
                                                {valorizacaoEntrega.toLocaleString(
                                                    "pt-BR",
                                                    {
                                                        minimumFractionDigits: 2,
                                                    },
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Rendimento obtido (Lucro)*</td>
                                            <td className="fw-bold text-end">
                                                R${" "}
                                                {lucro.toLocaleString("pt-BR", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Valor do Aluguel*</td>
                                            <td className="text-end">
                                                R${" "}
                                                {(
                                                    valorTotalSemDesconto *
                                                    0.0095
                                                ).toLocaleString("pt-BR", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Valor Condomínio*</td>
                                            <td className="text-end">
                                                R$ 800,00
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Valor IPTU* (12x)</td>
                                            <td className="text-end">
                                                R$ 166,67
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="small text-center text-muted mb-0">
                                    *Valores aproximados do mercado atual.
                                </p>
                                <p className="small text-center text-muted mb-0">
                                    **Atualizado via cub e após a entrega da
                                    obra o índice de reajuste é outro, confira
                                    direto conosco.
                                </p>

                                <div className="d-flex flex-column gap-2 mt-4">
                                    <FormularioData
                                        codigo="wall_street_pre_reserva"
                                        salaAtual={salaAtual}
                                        onPagamento={handlePagamento}
                                        isSubmittingPayment={isSubmitting}
                                    />
                                    <FormularioData codigo="wall_street_contraproposta" />
                                    <FormularioData codigo="wall_street_agendar_reuniao" />

                                    {salaAtual?.arquivos?.proposta_pdf?.[0]
                                        ?.baixar &&
                                        salaAtual?.atributos
                                            ?.disponibilidade?.[0]?.valor && (
                                            <Button
                                                onClick={async () => {
                                                    const url = `${Config.api_url}${salaAtual.arquivos.proposta_pdf[0].baixar}`;
                                                    const response = await fetch(url);
                                                    const blob = await response.blob();

                                                    const link = document.createElement("a");
                                                    link.href = URL.createObjectURL(blob);
                                                    link.download = `proposta-${salaAtual?.atributos?.nome?.[0]?.valor || "sala"}.pdf`;
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                    URL.revokeObjectURL(link.href);
                                                }}
                                                className="fw-bold text-dark btn-warning"
                                            >
                                                BAIXAR PROPOSTA
                                            </Button>
                                        )}
                                </div>
                            </motion.div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Andares;
