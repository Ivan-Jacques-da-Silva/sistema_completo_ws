import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Navbar,
    Nav,
    FloatingLabel,
    Table,
    Badge,
    Modal,
    Tab,
    Tabs,
    Pagination,
    InputGroup,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import {
    Upload,
    Image,
    FileText,
    Eye,
    Check,
    Plus,
    Edit3,
    Building,
    Search,
    Filter,
    Calendar,
    Clock,
    User,
    Mail,
    Phone,
    MapPin,
    DollarSign,
} from "lucide-react";
import Config from "../Config";
import Notification from "../components/Notification";

const Painel = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("formularios");
    const [preReservas, setPreReservas] = useState([]);
    const [contrapropostas, setContrapropostas] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);
    const [historico, setHistorico] = useState([]);
    const [historicoPage, setHistoricoPage] = useState(1);
    const [historicoTotal, setHistoricoTotal] = useState(0);
    const [salas, setSalas] = useState([]);
    const [showSalaModal, setShowSalaModal] = useState(false);
    const [salaEdicao, setSalaEdicao] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imagemPreview, setImagemPreview] = useState(null);
    const [plantaPreview, setPlantaPreview] = useState(null);
    const [permissoes, setPermissoes] = useState([]);
    const [usuario, setUsuario] = useState('');

    // Estados para paginação e filtros
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [termoPesquisa, setTermoPesquisa] = useState("");
    const [filtroDisponibilidade, setFiltroDisponibilidade] = useState("todos");
    const itensPorPagina = 10;

    useEffect(() => {
        // Carregar permissões do usuário
        const permissoesUsuario = JSON.parse(localStorage.getItem('permissoes') || '[]');
        const nomeUsuario = localStorage.getItem('usuario') || '';
        setPermissoes(permissoesUsuario);
        setUsuario(nomeUsuario);

        // Definir aba padrão baseada no usuário
        if (nomeUsuario === 'wallstreet' && permissoesUsuario.includes('salas')) {
            setActiveTab('salas');
        } else if (nomeUsuario === 'correto' && permissoesUsuario.includes('formularios')) {
            setActiveTab('formularios');
        } else if (permissoesUsuario.includes('formularios')) {
            setActiveTab('formularios');
        } else if (permissoesUsuario.includes('salas')) {
            setActiveTab('salas');
        }

        const token = localStorage.getItem("admin-token");
        if (!token) {
            navigate("/login");
            return;
        }
        carregarDados();
    }, [navigate]);

    // Renderizar loading enquanto verifica autenticação
    const token = localStorage.getItem("admin-token");
    if (!token) {
        return (
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="text-center">
                    <div
                        className="spinner-border text-primary mb-3"
                        role="status"
                    ></div>
                    <h5>Verificando acesso...</h5>
                </div>
            </Container>
        );
    }

    const temPermissao = (permissao) => {
        return permissoes.includes(permissao);
    };

    const carregarDados = async () => {
        try {
            const token = localStorage.getItem("admin-token");
            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            };

            const [preRes, contraRes, agendRes] = await Promise.all([
                fetch(`${Config.api_url}/api/formularios/admin/pre-reservas`, {
                    headers,
                }),
                fetch(
                    `${Config.api_url}/api/formularios/admin/contrapropostas`,
                    { headers },
                ),
                fetch(`${Config.api_url}/api/formularios/admin/agendamentos`, {
                    headers,
                }),
            ]);

            const preData = await preRes.json();
            const contraData = await contraRes.json();
            const agendData = await agendRes.json();

            // Verificar se alguma resposta retornou erro de autenticação
            if (
                preRes.status === 401 ||
                contraRes.status === 401 ||
                agendRes.status === 401
            ) {
                localStorage.removeItem("admin-token");
                navigate("/login");
                return;
            }

            if (preData.sucesso) setPreReservas(preData.data);
            if (contraData.sucesso) setContrapropostas(contraData.data);
            if (agendData.sucesso) setAgendamentos(agendData.data);

            // Carregar salas pela rota admin
            try {
                const salasResponse = await fetch(
                    `${Config.api_url}/api/admin/salas`,
                    { headers },
                );
                if (salasResponse.ok) {
                    const salasResult = await salasResponse.json();
                    console.log("Dados das salas (admin):", salasResult);

                    if (salasResult.sucesso && salasResult.data) {
                        // Ordenar salas do maior andar para o menor
                        const salasOrdenadas = salasResult.data.sort(
                            (a, b) => b.andar - a.andar,
                        );
                        setSalas(salasOrdenadas);
                        console.log("Salas carregadas:", salasResult.data);
                    } else {
                        console.warn("Resposta de admin salas sem sucesso");
                    }
                } else {
                    console.error(
                        "Erro ao buscar salas via admin:",
                        salasResponse.status,
                    );
                }
            } catch (error) {
                console.error("Erro ao carregar salas:", error);
            }
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            if (
                error.message.includes("401") ||
                error.message.includes("Unauthorized")
            ) {
                localStorage.removeItem("admin-token");
                navigate("/acesso-negado");
            }
        }
    };

    // Função para formatar data brasileira
    const formatarDataBrasileira = (dataISO) => {
        if (!dataISO) return "";
        const data = new Date(dataISO);
        return data.toLocaleDateString("pt-BR");
    };

    // Função para formatar data e hora brasileira
    const formatarDataHoraBrasileira = (dataString) => {
        if (!dataString) return "";
        const data = new Date(dataString);
        return data.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Função para filtrar salas
    const salasFiltradas = salas.filter((sala) => {
        const termoBusca = termoPesquisa.toLowerCase().trim();

        // Busca por aproximação em múltiplos campos
        const matchPesquisa =
            !termoBusca ||
            sala.nome.toLowerCase().includes(termoBusca) ||
            sala.andar.toString().includes(termoBusca) ||
            sala.numero.toString().toLowerCase().includes(termoBusca) ||
            `sala ${sala.numero}`.toLowerCase().includes(termoBusca) ||
            `${sala.andar}${sala.numero}`.toLowerCase().includes(termoBusca) ||
            sala.posicao.toLowerCase().includes(termoBusca);

        const matchDisponibilidade =
            filtroDisponibilidade === "todos" ||
            (filtroDisponibilidade === "disponivel" && sala.disponivel) ||
            (filtroDisponibilidade === "indisponivel" && !sala.disponivel);

        return matchPesquisa && matchDisponibilidade;
    });

    // Calcular paginação
    const totalPaginas = Math.ceil(salasFiltradas.length / itensPorPagina);
    const indiceInicio = (paginaAtual - 1) * itensPorPagina;
    const indiceFim = indiceInicio + itensPorPagina;
    const salasExibidas = salasFiltradas.slice(indiceInicio, indiceFim);

    // Reset da página quando filtros mudam
    useEffect(() => {
        setPaginaAtual(1);
    }, [termoPesquisa, filtroDisponibilidade]);

    const marcarComoVisualizado = async (tipo, id) => {
        try {
            const token = localStorage.getItem("admin-token");
            const response = await fetch(
                `${Config.api_url}/api/formularios/admin/${tipo}/${id}/visualizar`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                },
            );

            if (response.ok) {
                toast.success("Marcado como visualizado!");
                carregarDados();
            }
        } catch (error) {
            console.error("Erro ao marcar como visualizado:", error);
            toast.error("Erro ao marcar como visualizado");
        }
    };

    const abrirEdicaoSala = (sala) => {
        if (sala) {
            // Edição - preservar ID original
            setSalaEdicao({
                id: sala.id, // Garantir que o ID seja preservado
                andar: parseInt(sala.andar) || 15,
                numero: sala.numero || "",
                nome: sala.nome || "",
                area: parseFloat(sala.area) || "",
                posicao: sala.posicao || "",
                preco: parseFloat(sala.preco) || "",
                disponivel: Boolean(sala.disponivel), // Preservar estado original
                imagem: sala.imagem,
                planta: sala.planta,
                proposta_pdf: sala.proposta_pdf,
                imagemFile: null,
                plantaFile: null,
                propostaPdfFile: null,
            });
            setImagemPreview(
                sala.imagem ? `${Config.api_url}/uploads/${sala.imagem}` : null,
            );
            setPlantaPreview(
                sala.planta ? `${Config.api_url}/uploads/${sala.planta}` : null,
            );
        } else {
            // Nova sala
            setSalaEdicao({
                id: null,
                andar: 15,
                numero: "",
                nome: "",
                area: "",
                posicao: "",
                preco: "",
                disponivel: true,
                imagem: null,
                planta: null,
                proposta_pdf: null,
                imagemFile: null,
                plantaFile: null,
                propostaPdfFile: null,
            });
            setImagemPreview(null);
            setPlantaPreview(null);
        }
        setShowSalaModal(true);
    };

    const excluirSala = async (sala) => {
        if (
            !window.confirm(
                `Tem certeza que deseja excluir a sala "${sala.nome}"? Esta ação não pode ser desfeita.`,
            )
        ) {
            return;
        }

        try {
            const token = localStorage.getItem("admin-token");
            const response = await fetch(
                `${Config.api_url}/api/admin/salas/${sala.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                },
            );

            const result = await response.json();

            if (response.ok && result.sucesso) {
                toast.success(result.mensagem || "Sala excluída com sucesso!");
                carregarDados(); // Recarregar lista de salas
            } else {
                toast.error(result.mensagem || "Erro ao excluir sala");
            }
        } catch (error) {
            console.error("Erro ao excluir sala:", error);
            toast.error("Erro ao conectar com o servidor");
        }
    };

    // Refs para inputs de arquivo
    const imagemInputRef = useRef(null);
    const plantaInputRef = useRef(null);

    // Função para selecionar imagem
    const selecionarImagem = () => {
        imagemInputRef.current?.click();
    };

    // Função para selecionar planta
    const selecionarPlanta = () => {
        plantaInputRef.current?.click();
    };

    // Handler para mudança de imagem
    const handleImagemChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validar tipo de arquivo
        const tiposPermitidos = ["image/png", "image/jpeg", "image/webp"];
        if (!tiposPermitidos.includes(file.type)) {
            toast.error("Tipo de arquivo inválido! Use PNG, JPG ou WEBP.");
            return;
        }

        // Validar tamanho (10MB)
        if (file.size > 10485760) {
            toast.error("Arquivo muito grande! Máximo 10MB.");
            return;
        }

        setSalaEdicao((prev) => ({ ...prev, imagemFile: file }));
        const previewUrl = URL.createObjectURL(file);
        setImagemPreview(previewUrl);
        toast.success("Imagem selecionada com sucesso!");
    };

    // Handler para mudança de planta
    const handlePlantaChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validar tipo de arquivo
        const tiposPermitidos = ["image/png", "image/jpeg", "image/webp"];
        if (!tiposPermitidos.includes(file.type)) {
            toast.error("Tipo de arquivo inválido! Use PNG, JPG ou WEBP.");
            return;
        }

        // Validar tamanho (10MB)
        if (file.size > 10485760) {
            toast.error("Arquivo muito grande! Máximo 10MB.");
            return;
        }

        setSalaEdicao((prev) => ({ ...prev, plantaFile: file }));
        const previewUrl = URL.createObjectURL(file);
        setPlantaPreview(previewUrl);
        toast.success("Planta selecionada com sucesso!");
    };

    const salvarSala = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("numero", salaEdicao.numero);
            formData.append("andar", salaEdicao.andar);
            formData.append("nome", salaEdicao.nome);
            formData.append("area", salaEdicao.area);
            formData.append("posicao", salaEdicao.posicao);
            formData.append("preco", salaEdicao.preco);
            formData.append(
                "disponivel",
                salaEdicao.disponivel ? "true" : "false",
            );

            if (salaEdicao.imagemFile) {
                formData.append("imagem", salaEdicao.imagemFile);
            }
            if (salaEdicao.plantaFile) {
                formData.append("planta", salaEdicao.plantaFile);
            }
            if (salaEdicao.propostaPdfFile) {
                formData.append("proposta_pdf", salaEdicao.propostaPdfFile);
            }

            const token = localStorage.getItem("admin-token");
            let url, method;

            if (salaEdicao.id && salaEdicao.id !== null) {
                // Edição - garantir que está usando o ID correto
                url = `${Config.api_url}/api/admin/salas/${salaEdicao.id}`;
                method = "PUT";
                console.log("EDITANDO sala com ID:", salaEdicao.id);
            } else {
                // Criação - nova sala
                url = `${Config.api_url}/api/admin/salas`;
                method = "POST";
                console.log("CRIANDO nova sala");
            }

            console.log("Operação:", {
                operacao: salaEdicao.id ? "EDIÇÃO" : "CRIAÇÃO",
                url,
                method,
                salaId: salaEdicao.id,
                disponivel: salaEdicao.disponivel,
            });

            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();
            console.log("Resposta do servidor:", result);

            if (response.ok && result.sucesso) {
                setShowSalaModal(false);
                setSalaEdicao(null);
                carregarDados();
                toast.success(result.mensagem || "Sala salva com sucesso!");
                setImagemPreview(null);
                setPlantaPreview(null);
            } else {
                const errorMessage =
                    result.mensagem ||
                    `Erro ${response.status}: ${response.statusText}`;
                console.error("Erro na resposta:", errorMessage);
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error("Erro ao salvar sala:", error);
            toast.error(
                "Erro ao conectar com o servidor. Verifique sua conexão.",
            );
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("admin-token");
        navigate("/login");
    };

    const formatarData = (dataString) => {
        return new Date(dataString).toLocaleString("pt-BR");
    };

    const FileUploadArea = ({ preview, type, icon: Icon, onSelect }) => (
        <div
            className="border border-dashed rounded-4 p-4 text-center position-relative bg-light"
            style={{ minHeight: "200px" }}
        >
            {preview ? (
                <div className="h-100 d-flex flex-column align-items-center justify-content-center">
                    <img
                        src={preview}
                        alt={`Preview ${type}`}
                        className="img-fluid rounded mb-3"
                        style={{
                            maxHeight: "120px",
                            maxWidth: "100%",
                            objectFit: "cover",
                            border: "1px solid #dee2e6",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                    />
                    <div className="small text-muted fw-semibold mb-3">
                        <Icon size={16} className="me-1" />
                        {type} selecionada
                    </div>
                    <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={onSelect}
                        className="d-flex align-items-center rounded-pill px-3"
                    >
                        <Edit3 size={14} className="me-2" />
                        Alterar {type}
                    </Button>
                </div>
            ) : (
                <div className="d-flex flex-column align-items-center justify-content-center h-100">
                    <Icon size={48} className="mb-3 text-muted" />
                    <p className="mb-3 fw-semibold text-muted">
                        Selecionar {type.toLowerCase()}
                    </p>
                    <Button
                        variant="primary"
                        onClick={onSelect}
                        className="d-flex align-items-center mb-2 rounded-pill px-4"
                        style={{
                            background:
                                "linear-gradient(135deg, #001A47 0%, #003875 100%)",
                            border: "none",
                        }}
                    >
                        <Upload size={16} className="me-2" />
                        Escolher Arquivo
                    </Button>
                    <small className="text-muted">
                        PNG, JPG, WEBP até 10MB
                    </small>
                </div>
            )}
        </div>
    );

    const FormularioCard = ({
        title,
        items,
        tipo,
        icon,
        bgColor = "primary",
    }) => (
        <Card
            className="h-100 shadow-sm border-0 overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            }}
        >
            <Card.Header className={`bg-${bgColor} text-white border-0 py-3`}>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        {icon}
                        <h6 className="mb-0 ms-2 fw-bold">{title}</h6>
                    </div>
                    <Badge bg="light" text="dark" className="fs-6 px-3 py-2">
                        {items.length}
                    </Badge>
                </div>
            </Card.Header>
            <Card.Body
                className="p-0"
                style={{ maxHeight: "500px", overflowY: "auto" }}
            >
                {items.length === 0 ? (
                    <div className="text-center text-muted py-5">
                        <div className="mb-3 opacity-50">{icon}</div>
                        <p className="mb-0">Nenhum item encontrado</p>
                    </div>
                ) : (
                    <div className="p-3">
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                className={`p-4 mb-3 rounded-3 border ${!item.visualizado ? "border-warning bg-warning bg-opacity-10" : "border-light bg-white"} shadow-sm`}
                            >
                                <div className="d-flex justify-content-between align-items-start">
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center mb-2">
                                            <User
                                                size={16}
                                                className="text-primary me-2"
                                            />
                                            <span className="fw-bold text-dark">
                                                {item.nome}
                                            </span>
                                            {!item.visualizado && (
                                                <Badge
                                                    bg="warning"
                                                    className="ms-2"
                                                >
                                                    Novo
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="row g-2 small text-muted">
                                            <div className="col-12">
                                                <Mail
                                                    size={14}
                                                    className="me-2"
                                                />
                                                {item.email}
                                            </div>
                                            <div className="col-12">
                                                <Phone
                                                    size={14}
                                                    className="me-2"
                                                />
                                                {item.contato}
                                            </div>
                                            {item.sala && (
                                                <>
                                                    <div className="col-12">
                                                        <Building
                                                            size={14}
                                                            className="me-2"
                                                        />
                                                        {item.sala.nome} - {item.sala.andar}° andar
                                                    </div>
                                                    <div className="col-12">
                                                        <DollarSign
                                                            size={14}
                                                            className="me-2"
                                                        />
                                                        R$ {parseFloat(item.sala.preco).toLocaleString('pt-BR', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        })}
                                                    </div>
                                                </>
                                            )}
                                            {item.proposta && (
                                                <div className="col-12">
                                                    <div className="bg-light p-2 rounded mt-2">
                                                        <strong className="text-primary">
                                                            Proposta:
                                                        </strong>
                                                        <div className="mt-1">
                                                            {item.proposta}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="col-12 mt-2">
                                                <Clock
                                                    size={14}
                                                    className="me-2"
                                                />
                                                <small>
                                                    {formatarDataHoraBrasileira(
                                                        item.createdAt,
                                                    )}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms-3">
                                        <Button
                                            size="sm"
                                            variant={
                                                !item.visualizado
                                                    ? "success"
                                                    : "outline-secondary"
                                            }
                                            onClick={() =>
                                                marcarComoVisualizado(
                                                    tipo,
                                                    item.id,
                                                )
                                            }
                                            className="d-flex align-items-center rounded-pill px-3"
                                        >
                                            <Check size={14} className="me-1" />
                                            {!item.visualizado
                                                ? "Marcar"
                                                : "Visto"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card.Body>
        </Card>
    );

    const buscarAgendamentos = async () => {
        try {
            const token = localStorage.getItem("admin-token");
            const response = await fetch(
                `${Config.api_url}/api/formularios/admin/agendamentos`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            const data = await response.json();
            if (data.sucesso) {
                setAgendamentos(data.data);
            }
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
        }
    };

    const buscarHistorico = async (page = 1) => {
        try {
            const token = localStorage.getItem("admin-token");
            const response = await fetch(
                `${Config.api_url}/api/admin/historico?page=${page}&limit=20`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            const data = await response.json();
            if (data.sucesso) {
                setHistorico(data.data);
                setHistoricoTotal(data.pagination.total);
            }
        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("admin-token");
        if (activeTab === "agendamentos") {
            buscarAgendamentos();
        }
        if (activeTab === "historico") {
            buscarHistorico(historicoPage);
        }
    }, [activeTab, historicoPage]);

    return (
        <Container
            fluid
            className="p-0"
            style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
        >
            <style>
                {`
                    .card, .btn, .nav-link, .pagination .page-link, .table tr {
                        transition: none !important;
                        transform: none !important;
                    }
                    .card:hover, .btn:hover, .nav-link:hover, .pagination .page-link:hover, .table tr:hover {
                        transform: none !important;
                    }
                    .nav-pills .nav-link:not(.active) {
                        background-color: rgba(0, 0, 0, 0.05) !important;
                        border: 1px solid rgba(0, 0, 0, 0.1) !important;
                        border-radius: 20px !important;
                        color: #6c757d !important;
                    }
                    .nav-pills .nav-link.active {
                        border-radius: 20px !important;
                    }
                `}
            </style>
            <Toaster position="top-right" />

            <Navbar
                expand="lg"
                className="shadow-sm px-4 py-3 mb-4"
                style={{
                    background:
                        "linear-gradient(135deg, #001A47 0%, #003875 100%)",
                }}
            >
                <Navbar.Brand className="fw-bold text-uppercase text-white d-flex align-items-center">
                    <Building className="me-2" />
                    Painel Administrativo - Wall Street
                </Navbar.Brand>
                <Nav className="ms-auto">
                    <Link
                        to="/andares"
                        className="btn btn-outline-light me-3 rounded-pill"
                    >
                        <Building size={16} className="me-2" />
                        Ver Andares
                    </Link>
                    <Button
                        variant="outline-light"
                        onClick={logout}
                        className="rounded-pill"
                    >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Sair
                    </Button>
                </Nav>
            </Navbar>

            <Container className="pb-5">
                <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-4"
                    variant="pills"
                >
                    {temPermissao('salas') && (
                        <Tab
                            eventKey="salas"
                            title={
                                <span className="d-flex align-items-center px-3 py-2">
                                    <Building className="me-2" size={16} />
                                    Gerenciar Salas
                                </span>
                            }
                        >
                            <Card className="shadow-sm border-0 mb-4">
                                <Card.Header className="bg-white border-0 py-4">
                                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center mb-4">
                                        <div className="mb-3 mb-lg-0">
                                            <h4 className="mb-1 d-flex align-items-center">
                                                <Building className="me-2" />
                                                Salas Cadastradas
                                            </h4>
                                            <p className="text-muted mb-0">
                                                <Badge
                                                    bg="secondary"
                                                    className="me-2"
                                                >
                                                    {salasFiltradas.length}
                                                </Badge>
                                                salas encontradas
                                            </p>
                                        </div>
                                        <Button
                                            variant="primary"
                                            onClick={() => abrirEdicaoSala()}
                                            className="d-flex align-items-center rounded-pill px-4 py-2"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, #001A47 0%, #003875 100%)",
                                                border: "none",
                                            }}
                                        >
                                            <Plus size={16} className="me-2" />
                                            Nova Sala
                                        </Button>
                                    </div>

                                    {/* Filtros e Pesquisa */}
                                    <Row className="g-3">
                                        <Col md={6} lg={5}>
                                            <InputGroup className="shadow-sm">
                                                <InputGroup.Text className="bg-light border-end-0">
                                                    <Search size={16} />
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Pesquisar por nome, andar ou número..."
                                                    value={termoPesquisa}
                                                    onChange={(e) =>
                                                        setTermoPesquisa(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="border-start-0"
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col md={4} lg={3}>
                                            <InputGroup className="shadow-sm">
                                                <InputGroup.Text className="bg-light border-end-0">
                                                    <Filter size={16} />
                                                </InputGroup.Text>
                                                <Form.Select
                                                    value={filtroDisponibilidade}
                                                    onChange={(e) =>
                                                        setFiltroDisponibilidade(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="border-start-0"
                                                >
                                                    <option value="todos">
                                                        Todas as salas
                                                    </option>
                                                    <option value="disponivel">
                                                        Apenas disponíveis
                                                    </option>
                                                    <option value="indisponivel">
                                                        Apenas reservadas
                                                    </option>
                                                </Form.Select>
                                            </InputGroup>
                                        </Col>
                                        <Col
                                            md={2}
                                            lg={4}
                                            className="d-flex align-items-center justify-content-end"
                                        >
                                            <div className="text-muted small">
                                                Página {paginaAtual} de{" "}
                                                {totalPaginas}
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    <div className="table-responsive">
                                        <Table hover className="mb-0">
                                            <thead
                                                style={{
                                                    backgroundColor: "#f8f9fa",
                                                }}
                                            >
                                                <tr>
                                                    <th className="border-0 py-3 ps-4">
                                                        Andar
                                                    </th>
                                                    <th className="border-0 py-3">
                                                        Número
                                                    </th>
                                                    <th className="border-0 py-3">
                                                        Nome
                                                    </th>
                                                    <th className="border-0 py-3">
                                                        Área
                                                    </th>
                                                    <th className="border-0 py-3">
                                                        Posição
                                                    </th>
                                                    <th className="border-0 py-3">
                                                        Preço
                                                    </th>
                                                    <th className="border-0 py-3">
                                                        Status
                                                    </th>
                                                    <th className="border-0 py-3 pe-4">
                                                        Ações
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {salasExibidas.length === 0 ? (
                                                    <tr>
                                                        <td
                                                            colSpan="8"
                                                            className="text-center py-5 text-muted"
                                                        >
                                                            <Building
                                                                size={48}
                                                                className="mb-3 opacity-50"
                                                            />
                                                            <div>
                                                                Nenhuma sala
                                                                encontrada com os
                                                                filtros aplicados
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    salasExibidas.map((sala) => (
                                                        <tr
                                                            key={sala.id}
                                                            className="align-middle"
                                                        >
                                                            <td className="fw-semibold ps-4">
                                                                <Badge
                                                                    bg="light"
                                                                    text="dark"
                                                                    className="fs-6"
                                                                >
                                                                    {sala.andar}°
                                                                </Badge>
                                                            </td>
                                                            <td className="fw-medium">
                                                                {sala.numero}
                                                            </td>
                                                            <td>{sala.nome}</td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <MapPin
                                                                        size={14}
                                                                        className="me-1 text-muted"
                                                                    />
                                                                    {sala.area} m²
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="badge bg-light text-dark border fs-6">
                                                                    {sala.posicao}
                                                                </span>
                                                            </td>
                                                            <td className="fw-semibold">
                                                                <div className="d-flex align-items-center">
                                                                    <DollarSign
                                                                        size={14}
                                                                        className="me-1 text-success"
                                                                    />
                                                                    R${" "}
                                                                    {parseFloat(
                                                                        sala.preco,
                                                                    ).toLocaleString(
                                                                        "pt-BR",
                                                                        {
                                                                            minimumFractionDigits: 2,
                                                                        },
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Badge
                                                                    bg={
                                                                        sala.disponivel
                                                                            ? "success"
                                                                            : "danger"
                                                                    }
                                                                    className="px-3 py-2 fs-6"
                                                                >
                                                                    {sala.disponivel
                                                                        ? "Disponível"
                                                                        : "Reservado"}
                                                                </Badge>
                                                            </td>
                                                            <td className="pe-4">
                                                                <div className="d-flex gap-2">
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline-primary"
                                                                        onClick={() =>
                                                                            abrirEdicaoSala(
                                                                                sala,
                                                                            )
                                                                        }
                                                                        className="d-flex align-items-center rounded-pill px-3"
                                                                    >
                                                                        <Edit3
                                                                            size={
                                                                                14
                                                                            }
                                                                            className="me-1"
                                                                        />
                                                                        Editar
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline-danger"
                                                                        onClick={() =>
                                                                            excluirSala(
                                                                                sala,
                                                                            )
                                                                        }
                                                                        className="d-flex align-items-center rounded-pill px-3"
                                                                    >
                                                                        <i
                                                                            className="bi bi-trash"
                                                                            style={{
                                                                                fontSize:
                                                                                    "14px",
                                                                            }}
                                                                        ></i>
                                                                        <span className="ms-1">
                                                                            Excluir
                                                                        </span>
                                                                    </Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>

                                    {/* Paginação */}
                                    {totalPaginas > 1 && (
                                        <div className="d-flex justify-content-center p-4 border-top bg-light">
                                            <Pagination className="mb-0">
                                                <Pagination.First
                                                    onClick={() =>
                                                        setPaginaAtual(1)
                                                    }
                                                    disabled={paginaAtual === 1}
                                                />
                                                <Pagination.Prev
                                                    onClick={() =>
                                                        setPaginaAtual(
                                                            Math.max(
                                                                1,
                                                                paginaAtual - 1,
                                                            ),
                                                        )
                                                    }
                                                    disabled={paginaAtual === 1}
                                                />

                                                {Array.from(
                                                    {
                                                        length: Math.min(
                                                            5,
                                                            totalPaginas,
                                                        ),
                                                    },
                                                    (_, i) => {
                                                        let pageNum;
                                                        if (totalPaginas <= 5) {
                                                            pageNum = i + 1;
                                                        } else if (
                                                            paginaAtual <= 3
                                                        ) {
                                                            pageNum = i + 1;
                                                        } else if (
                                                            paginaAtual >=
                                                            totalPaginas - 2
                                                        ) {
                                                            pageNum =
                                                                totalPaginas -
                                                                4 +
                                                                i;
                                                        } else {
                                                            pageNum =
                                                                paginaAtual - 2 + i;
                                                        }

                                                        return (
                                                            <Pagination.Item
                                                                key={pageNum}
                                                                active={
                                                                    pageNum ===
                                                                    paginaAtual
                                                                }
                                                                onClick={() =>
                                                                    setPaginaAtual(
                                                                        pageNum,
                                                                    )
                                                                }
                                                            >
                                                                {pageNum}
                                                            </Pagination.Item>
                                                        );
                                                    },
                                                )}

                                                <Pagination.Next
                                                    onClick={() =>
                                                        setPaginaAtual(
                                                            Math.min(
                                                                totalPaginas,
                                                                paginaAtual + 1,
                                                            ),
                                                        )
                                                    }
                                                    disabled={
                                                        paginaAtual === totalPaginas
                                                    }
                                                />
                                                <Pagination.Last
                                                    onClick={() =>
                                                        setPaginaAtual(totalPaginas)
                                                    }
                                                    disabled={
                                                        paginaAtual === totalPaginas
                                                    }
                                                />
                                            </Pagination>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Tab>
                    )}

                    {temPermissao('formularios') && (
                        <Tab
                            eventKey="formularios"
                            title={
                                <span className="d-flex align-items-center px-3 py-2">
                                    <Eye className="me-2" size={16} />
                                    Propostas
                                </span>
                            }
                        >
                            <Row className="g-4">
                                <Col lg={6}>
                                    <FormularioCard
                                        title="Pré-Reservas"
                                        items={preReservas}
                                        tipo="pre-reservas"
                                        bgColor="primary"
                                        icon={
                                            <i
                                                className="bi bi-bookmark-check"
                                                style={{ fontSize: "1.2rem" }}
                                            ></i>
                                        }
                                    />
                                </Col>
                                <Col lg={6}>
                                    <FormularioCard
                                        title="Contrapropostas"
                                        items={contrapropostas}
                                        tipo="contrapropostas"
                                        bgColor="info "
                                        icon={
                                            <i
                                                className="bi bi-chat-square-text"
                                                style={{ fontSize: "1.2rem" }}
                                            ></i>
                                        }
                                    />
                                </Col>
                            </Row>
                        </Tab>
                    )}

                    {temPermissao('agendamentos') && (
                        <Tab
                            eventKey="agendamentos"
                            title={
                                <span className="d-flex align-items-center px-3 py-2">
                                    <Calendar className="me-2" size={16} />
                                    Agendamentos
                                </span>
                            }
                        >
                            <Card className="shadow-sm border-0">
                                <Card.Header className="bg-success text-White py-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <Calendar className="me-2" size={20} />
                                            <h5 className="mb-0 fw-bold">
                                                Agendamentos de Reunião
                                            </h5>
                                        </div>
                                        <Badge
                                            bg="light"
                                            text="dark"
                                            className="fs-6 px-3 py-2"
                                        >
                                            {agendamentos.length}
                                        </Badge>
                                    </div>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    {agendamentos.length === 0 ? (
                                        <div className="text-center text-muted py-5">
                                            <Calendar
                                                size={48}
                                                className="mb-3 opacity-50"
                                            />
                                            <p className="mb-0">
                                                Nenhum agendamento encontrado
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <Table hover className="mb-0">
                                                <thead
                                                    style={{
                                                        backgroundColor: "#f8f9fa",
                                                    }}
                                                >
                                                    <tr>
                                                        <th className="border-0 py-3 ps-4">
                                                            Nome
                                                        </th>
                                                        <th className="border-0 py-3">
                                                            CPF/CNPJ
                                                        </th>
                                                        <th className="border-0 py-3">
                                                            Contato
                                                        </th>
                                                        <th className="border-0 py-3">
                                                            Data
                                                        </th>
                                                        <th className="border-0 py-3">
                                                            Hora
                                                        </th>
                                                        <th className="border-0 py-3">
                                                            Status
                                                        </th>
                                                        <th className="border-0 py-3 pe-4">
                                                            Ações
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {agendamentos.map(
                                                        (agendamento) => (
                                                            <tr
                                                                key={agendamento.id}
                                                                className={`align-middle ${!agendamento.visualizado ? "table-warning" : ""}`}
                                                            >
                                                                <td className="ps-4">
                                                                    <div className="d-flex align-items-center">
                                                                        <User
                                                                            size={
                                                                                16
                                                                            }
                                                                            className="text-primary me-2"
                                                                        />
                                                                        <span className="fw-medium">
                                                                            {
                                                                                agendamento.nome
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        agendamento.cpf_cnpj
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <Phone
                                                                            size={
                                                                                14
                                                                            }
                                                                            className="text-muted me-2"
                                                                        />
                                                                        {
                                                                            agendamento.contato
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <Calendar
                                                                            size={
                                                                                14
                                                                            }
                                                                            className="text-muted me-2"
                                                                        />
                                                                        {formatarDataBrasileira(
                                                                            agendamento.data,
                                                                        )}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <Clock
                                                                            size={
                                                                                14
                                                                            }
                                                                            className="text-muted me-2"
                                                                        />
                                                                        {
                                                                            agendamento.hora
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Badge
                                                                        bg={
                                                                            agendamento.visualizado
                                                                                ? "success"
                                                                                : "warning"
                                                                        }
                                                                        className="px-3 py-2 fs-6"
                                                                    >
                                                                        {agendamento.visualizado
                                                                            ? "Visualizado"
                                                                            : "Novo"}
                                                                    </Badge>
                                                                </td>
                                                                <td className="pe-4">
                                                                    {!agendamento.visualizado && (
                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline-success"
                                                                            onClick={() =>
                                                                                marcarComoVisualizado(
                                                                                    "agendamentos",
                                                                                    agendamento.id,
                                                                                )
                                                                            }
                                                                            className="d-flex align-items-center rounded-pill px-3"
                                                                        >
                                                                            <Check
                                                                                size={
                                                                                    14
                                                                                }
                                                                                className="me-1"
                                                                            />
                                                                            Marcar
                                                                            como
                                                                            visto
                                                                        </Button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ),
                                                    )}
                                                </tbody>
                                            </Table>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Tab>
                    )}

                    {temPermissao('historico') && (
                        <Tab
                            eventKey="historico"
                            title={
                                <span className="d-flex align-items-center px-3 py-2">
                                    <i className="bi bi-clock-history me-2"></i>
                                    Histórico
                                </span>
                            }
                        >
                            <Card className="shadow-sm border-0">
                                <Card.Header className="bg-info text-white py-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0 fw-bold">
                                            Histórico de Alterações
                                        </h5>
                                        <Badge
                                            bg="light"
                                            text="dark"
                                            className="fs-6"
                                        >
                                            {historicoTotal} registros
                                        </Badge>
                                    </div>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    <div className="table-responsive">
                                        <Table hover size="sm" className="mb-0">
                                            <thead
                                                style={{
                                                    backgroundColor: "#f8f9fa",
                                                }}
                                            >
                                                <tr>
                                                    <th className="border-0 py-3">
                                                        Data/Hora
                                                    </th>
                                                    <th className="border-0 py-3">
                                                        Operação
                                                    </th>
                                                    <th className="border-0 py-3">
                                                        Tabela
                                                    </th>
                                                    <th className="border-0 py-3">
                                                        Registro ID
                                                    </th>
                                                    <th className="border-0 py-3">
                                                        Usuário
                                                    </th>
                                                    <th className="border-0 py-3">
                                                        IP
                                                    </th>
                                                    <th className="border-0 py-3">
                                                        Detalhes
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {historico.map((item) => (
                                                    <tr key={item.id}>
                                                        <td
                                                            style={{
                                                                fontSize: "12px",
                                                            }}
                                                        >
                                                            {new Date(
                                                                item.createdAt,
                                                            ).toLocaleString(
                                                                "pt-BR",
                                                            )}
                                                        </td>
                                                        <td>
                                                            <Badge
                                                                bg={
                                                                    item.operacao ===
                                                                        "CREATE"
                                                                        ? "success"
                                                                        : item.operacao ===
                                                                            "UPDATE"
                                                                            ? "warning"
                                                                            : item.operacao ===
                                                                                "DELETE"
                                                                                ? "danger"
                                                                                : "info"
                                                                }
                                                            >
                                                                {item.operacao}
                                                            </Badge>
                                                        </td>
                                                        <td>{item.tabela}</td>
                                                        <td>
                                                            {item.registro_id ||
                                                                "-"}
                                                        </td>
                                                        <td>{item.usuario}</td>
                                                        <td
                                                            style={{
                                                                fontSize: "11px",
                                                            }}
                                                        >
                                                            {item.ip_address?.substring(
                                                                0,
                                                                15,
                                                            ) || "-"}
                                                        </td>
                                                        <td>
                                                            <Button
                                                                size="sm"
                                                                variant="outline-info"
                                                                onClick={() => {
                                                                    const detalhes =
                                                                    {
                                                                        antes: item.dados_antes,
                                                                        depois: item.dados_depois,
                                                                    };
                                                                    alert(
                                                                        `Detalhes:\n${JSON.stringify(detalhes, null, 2)}`,
                                                                    );
                                                                }}
                                                                className="rounded-pill px-3"
                                                            >
                                                                Ver
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="d-flex justify-content-center p-4 border-top bg-light">
                                        <Button
                                            variant="outline-primary"
                                            onClick={() => {
                                                const newPage = historicoPage + 1;
                                                setHistoricoPage(newPage);
                                                buscarHistorico(newPage);
                                            }}
                                            disabled={historico.length < 20}
                                            className="rounded-pill px-4"
                                        >
                                            Carregar mais
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Tab>
                    )}
                </Tabs>
            </Container>

            {/* Modal de Edição de Sala - Modernizado */}
            <Modal
                show={showSalaModal}
                onHide={() => setShowSalaModal(false)}
                size="xl"
                centered
            >
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="d-flex align-items-center">
                        {salaEdicao?.id ? (
                            <Edit3 className="me-2" />
                        ) : (
                            <Plus className="me-2" />
                        )}
                        {salaEdicao?.id ? "Editar Sala" : "Nova Sala"}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={salvarSala}>
                    <Modal.Body className="px-4">
                        <Row className="g-4">
                            {/* Informações Básicas */}
                            <Col md={6}>
                                <Card
                                    className="h-100 border-0"
                                    style={{ backgroundColor: "#f8f9fa" }}
                                >
                                    <Card.Header className="bg-transparent border-0 pb-2">
                                        <h6 className="mb-0 text-muted fw-bold">
                                            INFORMAÇÕES BÁSICAS
                                        </h6>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Col md={6}>
                                                <FloatingLabel
                                                    controlId="andar"
                                                    label="Andar"
                                                    className="mb-3"
                                                >
                                                    <Form.Select
                                                        value={
                                                            salaEdicao?.andar ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            setSalaEdicao({
                                                                ...salaEdicao,
                                                                andar: parseInt(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            })
                                                        }
                                                        required
                                                    >
                                                        {Array.from(
                                                            { length: 15 },
                                                            (_, i) => 19 - i,
                                                        ).map((andar) => (
                                                            <option
                                                                key={andar}
                                                                value={andar}
                                                            >
                                                                {andar}° andar
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </FloatingLabel>
                                            </Col>
                                            <Col md={6}>
                                                <FloatingLabel
                                                    controlId="numero"
                                                    label="Número"
                                                    className="mb-3"
                                                >
                                                    <Form.Control
                                                        type="text"
                                                        value={
                                                            salaEdicao?.numero ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            setSalaEdicao({
                                                                ...salaEdicao,
                                                                numero: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        required
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md={12}>
                                                <FloatingLabel
                                                    controlId="nome"
                                                    label="Nome da Sala"
                                                    className="mb-3"
                                                >
                                                    <Form.Control
                                                        type="text"
                                                        value={
                                                            salaEdicao?.nome ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            setSalaEdicao({
                                                                ...salaEdicao,
                                                                nome: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        required
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md={4}>
                                                <FloatingLabel
                                                    controlId="area"
                                                    label="Área (m²)"
                                                    className="mb-3"
                                                >
                                                    <Form.Control
                                                        type="number"
                                                        step="0.01"
                                                        value={
                                                            salaEdicao?.area ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            setSalaEdicao({
                                                                ...salaEdicao,
                                                                area: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        required
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md={8}>
                                                <FloatingLabel
                                                    controlId="preco"
                                                    label="Preço"
                                                    className="mb-3"
                                                >
                                                    <Form.Control
                                                        type="number"
                                                        step="0.01"
                                                        value={
                                                            salaEdicao?.preco ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            setSalaEdicao({
                                                                ...salaEdicao,
                                                                preco: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        required
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md={12}>
                                                <FloatingLabel
                                                    controlId="posicao"
                                                    label="Posição"
                                                    className="mb-3"
                                                >
                                                    <Form.Select
                                                        value={
                                                            salaEdicao?.posicao ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            setSalaEdicao(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    posicao:
                                                                        e.target
                                                                            .value,
                                                                }),
                                                            )
                                                        }
                                                        required
                                                    >
                                                        <option value="">
                                                            Selecione...
                                                        </option>
                                                        <option value="FRENTE SUL">
                                                            FRENTE SUL
                                                        </option>
                                                        <option value="LATERAL SUL">
                                                            LATERAL SUL
                                                        </option>
                                                        <option value="LATERAL NORTE">
                                                            LATERAL NORTE
                                                        </option>
                                                        <option value="FRENTE NORTE">
                                                            FRENTE NORTE
                                                        </option>
                                                        <option value="LATERAL OESTE">
                                                            LATERAL OESTE
                                                        </option>
                                                        <option value="FRENTE OESTE">
                                                            FRENTE OESTE
                                                        </option>
                                                        <option value="LATERAL NORDESTE">
                                                            LATERAL NORDESTE
                                                        </option>
                                                        <option value="FRENTE NORDESTE">
                                                            FRENTE NORDESTE
                                                        </option>
                                                    </Form.Select>
                                                </FloatingLabel>
                                            </Col>
                                            <Col md={12}>
                                                <div className="form-check mb-4">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="disponibilidade"
                                                        checked={
                                                            !salaEdicao?.disponivel
                                                        }
                                                        onChange={(e) =>
                                                            setSalaEdicao({
                                                                ...salaEdicao,
                                                                disponivel:
                                                                    !e.target
                                                                        .checked,
                                                            })
                                                        }
                                                    />
                                                    <label
                                                        className="form-check-label fw-semibold"
                                                        htmlFor="disponibilidade"
                                                    >
                                                        Sala não está disponível para
                                                        venda
                                                    </label>
                                                </div>

                                                {/* Seção PDF da Proposta - Só aparece quando sala está disponível */}
                                                {salaEdicao?.disponivel && (
                                                    <div
                                                        className="border rounded-3 p-3"
                                                        style={{
                                                            backgroundColor:
                                                                "#f8f9fa",
                                                        }}
                                                    >
                                                        <label className="form-label fw-semibold mb-3 d-flex align-items-center">
                                                            <i
                                                                className="bi bi-file-earmark-pdf me-2 text-primary"
                                                                style={{
                                                                    fontSize:
                                                                        "18px",
                                                                }}
                                                            ></i>
                                                            Proposta PDF
                                                        </label>

                                                        <div className="d-flex flex-column gap-3">
                                                            {/* Preview do PDF atual ou selecionado */}
                                                            {(salaEdicao?.propostaPdfFile ||
                                                                salaEdicao?.proposta_pdf) && (
                                                                    <div className="bg-white p-3 rounded border d-flex align-items-center justify-content-between">
                                                                        <div className="d-flex align-items-center">
                                                                            <i
                                                                                className="bi bi-file-earmark-pdf text-danger me-2"
                                                                                style={{
                                                                                    fontSize:
                                                                                        "24px",
                                                                                }}
                                                                            ></i>
                                                                            <div>
                                                                                <div className="fw-medium">
                                                                                    {salaEdicao?.propostaPdfFile
                                                                                        ? salaEdicao
                                                                                            .propostaPdfFile
                                                                                            .name
                                                                                        : salaEdicao?.proposta_pdf || `proposta-${salaEdicao?.numero || "atual"}.pdf`}
                                                                                </div>
                                                                                <small className="text-muted">
                                                                                    {salaEdicao?.propostaPdfFile
                                                                                        ? "Arquivo selecionado"
                                                                                        : "Arquivo atual"}
                                                                                </small>
                                                                            </div>
                                                                        </div>
                                                                        <div className="d-flex gap-2">
                                                                            {/* Botão Visualizar se existe PDF atual */}
                                                                            {salaEdicao?.proposta_pdf && !salaEdicao?.propostaPdfFile && (
                                                                                <Button
                                                                                    size="sm"
                                                                                    variant="outline-info"
                                                                                    onClick={() =>
                                                                                        window.open(
                                                                                            `${Config.api_url}/uploads/${salaEdicao.proposta_pdf}`,
                                                                                            '_blank'
                                                                                        )
                                                                                    }
                                                                                    className="rounded-pill px-3"
                                                                                >
                                                                                    <i className="bi bi-eye me-1"></i>
                                                                                    Ver
                                                                                </Button>
                                                                            )}
                                                                            <Button
                                                                                size="sm"
                                                                                variant="outline-primary"
                                                                                onClick={() =>
                                                                                    document
                                                                                        .getElementById(
                                                                                            "proposta-pdf-input",
                                                                                        )
                                                                                        .click()
                                                                                }
                                                                                className="rounded-pill px-3"
                                                                            >
                                                                                <i className="bi bi-pencil me-1"></i>
                                                                                Alterar
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                            {/* Botão para selecionar PDF quando não há arquivo */}
                                                            {!salaEdicao?.propostaPdfFile &&
                                                                !salaEdicao?.proposta_pdf && (
                                                                    <div
                                                                        className="text-center py-4 border-dashed border-2 rounded-3"
                                                                        style={{
                                                                            borderColor:
                                                                                "#dee2e6",
                                                                        }}
                                                                    >
                                                                        <i
                                                                            className="bi bi-file-earmark-pdf text-muted mb-2"
                                                                            style={{
                                                                                fontSize:
                                                                                    "48px",
                                                                            }}
                                                                        ></i>
                                                                        <p className="text-muted mb-3">
                                                                            Nenhum
                                                                            PDF
                                                                            selecionado
                                                                        </p>
                                                                        <Button
                                                                            variant="primary"
                                                                            onClick={() =>
                                                                                document
                                                                                    .getElementById(
                                                                                        "proposta-pdf-input",
                                                                                    )
                                                                                    .click()
                                                                            }
                                                                            className="d-flex align-items-center mx-auto rounded-pill px-4"
                                                                            style={{
                                                                                background:
                                                                                    "linear-gradient(135deg, #001A47 0%, #003875 100%)",
                                                                                border: "none",
                                                                            }}
                                                                        >
                                                                            <i className="bi bi-upload me-2"></i>
                                                                            Selecionar
                                                                            PDF
                                                                        </Button>
                                                                    </div>
                                                                )}

                                                            <small className="text-muted">
                                                                <i className="bi bi-info-circle me-1"></i>
                                                                Apenas arquivos PDF,
                                                                máximo 10MB
                                                            </small>
                                                        </div>

                                                        <input
                                                            type="file"
                                                            id="proposta-pdf-input"
                                                            accept=".pdf"
                                                            style={{
                                                                display: "none",
                                                            }}
                                                            onChange={(e) => {
                                                                const file =
                                                                    e.target
                                                                        .files[0];
                                                                if (file) {
                                                                    if (
                                                                        file.type !==
                                                                        "application/pdf"
                                                                    ) {
                                                                        toast.error(
                                                                            "Apenas arquivos PDF são permitidos!",
                                                                        );
                                                                        e.target.value =
                                                                            "";
                                                                        return;
                                                                    }
                                                                    if (
                                                                        file.size >
                                                                        10485760
                                                                    ) {
                                                                        toast.error(
                                                                            "Arquivo muito grande! Máximo 10MB.",
                                                                        );
                                                                        e.target.value =
                                                                            "";
                                                                        return;
                                                                    }
                                                                    setSalaEdicao(
                                                                        (prev) => ({
                                                                            ...prev,
                                                                            propostaPdfFile:
                                                                                file,
                                                                        }),
                                                                    );
                                                                    toast.success(
                                                                        `PDF "${file.name}" selecionado com sucesso!`,
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Upload de Arquivos */}
                            <Col md={6}>
                                <Card
                                    className="h-100 border-0"
                                    style={{ backgroundColor: "#f8f9fa" }}
                                >
                                    <Card.Header className="bg-transparent border-0 pb-2">
                                        <h6 className="mb-0 text-muted fw-bold">
                                            <Upload
                                                size={16}
                                                className="me-2"
                                            />
                                            ARQUIVOS DA SALA
                                        </h6>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Col md={12} className="mb-4">
                                                <label className="form-label fw-semibold mb-3 d-flex align-items-center">
                                                    <Image
                                                        size={18}
                                                        className="me-2 text-primary"
                                                    />
                                                    Imagem da Sala
                                                </label>
                                                <input
                                                    ref={imagemInputRef}
                                                    type="file"
                                                    accept="image/png,image/jpeg,image/webp"
                                                    onChange={
                                                        handleImagemChange
                                                    }
                                                    style={{ display: "none" }}
                                                />
                                                <FileUploadArea
                                                    preview={imagemPreview}
                                                    type="Imagem"
                                                    icon={Image}
                                                    onSelect={selecionarImagem}
                                                />
                                            </Col>
                                            <Col md={12}>
                                                <label className="form-label fw-semibold mb-3 d-flex align-items-center">
                                                    <FileText
                                                        size={18}
                                                        className="me-2 text-primary"
                                                    />
                                                    Planta da Sala
                                                </label>
                                                <input
                                                    ref={plantaInputRef}
                                                    type="file"
                                                    accept="image/png,image/jpeg,image/webp"
                                                    onChange={
                                                        handlePlantaChange
                                                    }
                                                    style={{ display: "none" }}
                                                />
                                                <FileUploadArea
                                                    preview={plantaPreview}
                                                    type="Planta"
                                                    icon={FileText}
                                                    onSelect={selecionarPlanta}
                                                />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer className="border-0 pt-0">
                        <Button
                            variant="outline-secondary"
                            onClick={() => setShowSalaModal(false)}
                            className="rounded-pill px-4"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="rounded-pill px-4"
                            style={{
                                background:
                                    "linear-gradient(135deg, #001A47 0%, #003875 100%)",
                                border: "none",
                            }}
                        >
                            {loading ? (
                                <>
                                    <div
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                    ></div>
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <Check size={16} className="me-2" />
                                    Salvar Sala
                                </>
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <footer
                className="text-center py-4 mt-5"
                style={{ backgroundColor: "#001A47" }}
            >
                <small className="text-white">
                    Wall Street Corporate © {new Date().getFullYear()}
                </small>
            </footer>
        </Container>
    );
};

export default Painel;