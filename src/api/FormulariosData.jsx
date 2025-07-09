import Config from "../Config";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Componente para Pré-Reserva
export function PreReservaForm({
    salaAtual,
    onPagamento,
    isSubmittingPayment,
}) {
    // Verificar se a sala está disponível
    const salaDisponivel =
        salaAtual?.atributos?.disponibilidade?.[0]?.valor === true;

    // Se sala não estiver disponível, não mostrar nada
    if (!salaDisponivel) {
        return null;
    }

    // Sala disponível - mostrar apenas botão de pré-reserva que vai para pagamento
    return (
        <Button
            variant="warning"
            className="fw-bold text-dark"
            onClick={() => onPagamento(salaAtual)}
            disabled={isSubmittingPayment}
        >
            {isSubmittingPayment ? "PROCESSANDO..." : "PRÉ-RESERVA"}
        </Button>
    );
}

// Componente para Contraproposta
export function ContrapropostaForm() {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({
        show: false,
        type: '',
        title: '',
        message: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);
        const data = {
            nome: formData.get("nome"),
            cpf_cnpj: formData.get("cpf_cnpj"),
            contato: formData.get("contato"),
            email: formData.get("email"),
            proposta: formData.get("proposta"),
        };

        try {
            const response = await fetch(
                `${Config.api_url}/api/formularios/contraproposta`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );

            const json = await response.json();

            if (json.sucesso) {
                setMostrarModal(false);
                setNotification({
                    show: true,
                    type: 'success',
                    title: 'Sucesso!',
                    message: json.mensagem
                });
                event.target.reset();
            } else {
                setNotification({
                    show: true,
                    type: 'error',
                    title: 'Erro',
                    message: json.mensagem
                });
            }
        } catch (error) {
            setNotification({
                show: true,
                type: 'error',
                title: 'Erro de Conexão',
                message: 'Erro ao enviar formulário. Tente novamente.'
            });
        } finally {
            setLoading(false);
        }
    };

    const Notification = ({ show, onHide, type, title, message }) => {
        const bgColor = type === 'success' ? 'bg-success' : 'bg-danger';

        return (
            <AnimatePresence>
                {show && (
                    <motion.div
                        className={`position-fixed top-0 start-50 translate-middle-x p-3 ${bgColor} text-white rounded shadow-lg`}
                        style={{ zIndex: 1070 }}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="d-flex align-items-center">
                            <div className="fw-bold me-2">{title}</div>
                            <div>{message}</div>
                        </div>
                        <button type="button" className="btn-close btn-close-white position-absolute top-0 end-0 m-2" aria-label="Close" onClick={onHide}></button>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    };

    return (
        <div className="d-flex flex-column gap-2 w-100">
            <Button
                variant="warning"
                className="fw-bold text-dark"
                onClick={() => setMostrarModal(true)}
            >
                CONTRAPROPOSTA
            </Button>
            <AnimatePresence>
                {mostrarModal && (
                    <motion.div
                        className="position-fixed top-0 start-0 w-100 h-100"
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 1060,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMostrarModal(false)}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="position-absolute top-50 start-50 translate-middle p-4"
                            style={{
                                background: "rgba(0, 69, 138, 0.9)",
                                borderRadius: "20px",
                                width: "90%",
                                maxWidth: "400px",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                            }}
                        >
                            <h5 className="text-white text-center fw-bold mb-4">
                                Contraproposta
                            </h5>
                            <p
                                className="text-white text-center mb-4"
                                style={{ fontSize: "0.9rem" }}
                            >
                                Faça sua contraproposta
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="d-flex flex-column gap-3"
                            >
                                <input
                                    name="nome"
                                    type="text"
                                    required
                                    placeholder="NOME COMPLETO"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                />
                                <input
                                    name="cpf_cnpj"
                                    type="text"
                                    required
                                    placeholder="CPF/CNPJ"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                />
                                <input
                                    name="contato"
                                    type="tel"
                                    required
                                    placeholder="TELEFONE"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="EMAIL"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                />
                                <textarea
                                    name="proposta"
                                    required
                                    placeholder="SUA PROPOSTA"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                    rows="3"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn fw-bold rounded-pill py-3"
                                    style={{
                                        backgroundColor: "#fff",
                                        color: "#001A47",
                                        border: "3px solid #001A47",
                                    }}
                                >
                                    {loading
                                        ? "ENVIANDO..."
                                        : "ENVIAR CONTRAPROPOSTA"}
                                </button>
                            </form>
                            <button
                                onClick={() => setMostrarModal(false)}
                                className="btn-close position-absolute top-0 end-0 m-3"
                            ></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Notification
                show={notification.show}
                onHide={() => setNotification({ ...notification, show: false })}
                type={notification.type}
                title={notification.title}
                message={notification.message}
            />
        </div>
    );
}

// Componente para Agendamento de Reunião
export function AgendarReuniaoForm() {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [loading, setLoading] = useState(false);
        const [notification, setNotification] = useState({
        show: false,
        type: '',
        title: '',
        message: ''
    });


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);
        const data = {
            nome: formData.get("nome"),
            cpf_cnpj: formData.get("cpf_cnpj"),
            contato: formData.get("contato"),
            email: formData.get("email"),
            data: formData.get("data"),
            hora: formData.get("hora"),
        };

        try {
            const response = await fetch(
                `${Config.api_url}/api/formularios/agendar-reuniao`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );

            const json = await response.json();

            if (json.sucesso) {
                setMostrarModal(false);
                setNotification({
                    show: true,
                    type: 'success',
                    title: 'Sucesso!',
                    message: json.mensagem
                });
                event.target.reset();
            } else {
                setNotification({
                    show: true,
                    type: 'error',
                    title: 'Erro',
                    message: json.mensagem
                });
            }
        } catch (error) {
            setNotification({
                show: true,
                type: 'error',
                title: 'Erro de Conexão',
                message: 'Erro ao enviar formulário. Tente novamente.'
            });
        } finally {
            setLoading(false);
        }
    };

        const Notification = ({ show, onHide, type, title, message }) => {
        const bgColor = type === 'success' ? 'bg-success' : 'bg-danger';

        return (
            <AnimatePresence>
                {show && (
                    <motion.div
                        className={`position-fixed top-0 start-50 translate-middle-x p-3 ${bgColor} text-white rounded shadow-lg`}
                        style={{ zIndex: 1070 }}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="d-flex align-items-center">
                            <div className="fw-bold me-2">{title}</div>
                            <div>{message}</div>
                        </div>
                        <button type="button" className="btn-close btn-close-white position-absolute top-0 end-0 m-2" aria-label="Close" onClick={onHide}></button>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    };


    return (
        <div className="d-flex flex-column gap-2 w-100">
            <Button
                variant="warning"
                className="fw-bold text-dark"
                onClick={() => setMostrarModal(true)}
            >
                AGENDAR REUNIÃO
            </Button>
            <AnimatePresence>
                {mostrarModal && (
                    <motion.div
                        className="position-fixed top-0 start-0 w-100 h-100"
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 1060,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMostrarModal(false)}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="position-absolute top-50 start-50 translate-middle p-4"
                            style={{
                                background: "rgba(0, 69, 138, 0.9)",
                                borderRadius: "20px",
                                width: "90%",
                                maxWidth: "400px",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                            }}
                        >
                            <h5 className="text-white text-center fw-bold mb-4">
                                Agendar Reunião
                            </h5>
                            <p
                                className="text-white text-center mb-4"
                                style={{ fontSize: "0.9rem" }}
                            >
                                Agende uma reunião conosco
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="d-flex flex-column gap-3"
                            >
                                <input
                                    name="nome"
                                    type="text"
                                    required
                                    placeholder="NOME COMPLETO"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                />
                                <input
                                    name="cpf_cnpj"
                                    type="text"
                                    required
                                    placeholder="CPF/CNPJ"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                />
                                <input
                                    name="contato"
                                    type="tel"
                                    required
                                    placeholder="TELEFONE"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="EMAIL"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                />
                                <input
                                    name="data"
                                    type="date"
                                    required
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                />
                                <input
                                    name="hora"
                                    type="time"
                                    required
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn fw-bold rounded-pill py-3"
                                    style={{
                                        backgroundColor: "#fff",
                                        color: "#001A47",
                                        border: "3px solid #001A47",
                                    }}
                                >
                                    {loading
                                        ? "ENVIANDO..."
                                        : "AGENDAR REUNIÃO"}
                                </button>
                            </form>
                            <button
                                onClick={() => setMostrarModal(false)}
                                className="btn-close position-absolute top-0 end-0 m-3"
                            ></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Notification
                show={notification.show}
                onHide={() => setNotification({ ...notification, show: false })}
                type={notification.type}
                title={notification.title}
                message={notification.message}
            />
        </div>
    );
}

// Componente principal (compatibilidade com código existente)
const FormularioData = ({
    codigo,
    salaAtual,
    onPagamento,
    isSubmittingPayment,
}) => {
    if (codigo === "wall_street_pre_reserva") {
        return (
            <PreReservaForm
                salaAtual={salaAtual}
                onPagamento={onPagamento}
                isSubmittingPayment={isSubmittingPayment}
            />
        );
    } else if (codigo === "wall_street_contraproposta") {
        return <ContrapropostaForm />;
    } else if (codigo === "wall_street_agendar_reuniao") {
        return <AgendarReuniaoForm />;
    }

    return null;
};

export default FormularioData;