
import Config from '../Config'
import { Button } from 'react-bootstrap'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Componente para Pré-Reserva
export function PreReservaForm({ salaAtual, onPagamento, isSubmittingPayment }) {
    const [mostrarModal, setMostrarModal] = useState(false)
    const [loading, setLoading] = useState(false)

    // Verificar se a sala está disponível para mostrar botão de pagamento
    const salaDisponivel = salaAtual?.atributos?.disponibilidade?.[0]?.valor === true

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.target)
        const data = {
            nome: formData.get('nome'),
            cpf_cnpj: formData.get('cpf_cnpj'),
            contato: formData.get('contato'),
            email: formData.get('email')
        }

        try {
            const response = await fetch(`${Config.api_url}/api/formularios/pre-reserva`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const json = await response.json()

            if (json.sucesso) {
                setMostrarModal(false)
                alert(json.mensagem)
                event.target.reset()
            } else {
                alert(json.mensagem)
            }
        } catch (error) {
            alert('Erro ao enviar formulário. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    // Se sala não estiver disponível, mostrar apenas pré-reserva para lista de espera
    if (!salaDisponivel) {
        return (
            <div>
                <Button 
                    variant="primary" 
                    className="fw-bold" 
                    onClick={() => setMostrarModal(true)}
                    style={{
                        backgroundColor: '#007bff',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '12px 24px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        width: '100%'
                    }}
                >
                    PRÉ-RESERVA (LISTA DE ESPERA)
                </Button>

                <AnimatePresence>
                    {mostrarModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="bg-white p-4 rounded position-relative"
                                style={{ maxWidth: '500px', width: '90%' }}
                            >
                                <h4 className="text-center mb-4">Lista de Espera - {salaAtual?.atributos?.nome?.[0]?.valor}</h4>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name="nome"
                                        required
                                        placeholder="NOME COMPLETO"
                                        className="form-control rounded-4 px-3 py-3 mb-3"
                                    />
                                    <input
                                        type="text"
                                        name="cpf_cnpj"
                                        required
                                        placeholder="CPF/CNPJ"
                                        className="form-control rounded-4 px-3 py-3 mb-3"
                                    />
                                    <input
                                        type="text"
                                        name="contato"
                                        required
                                        placeholder="TELEFONE/WHATSAPP"
                                        className="form-control rounded-4 px-3 py-3 mb-3"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="EMAIL"
                                        className="form-control rounded-4 px-3 py-3 mb-3"
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn fw-bold rounded-pill py-3"
                                        style={{ backgroundColor: '#fff', color: '#001A47', border: '3px solid #001A47', width: '100%' }}
                                    >
                                        {loading ? 'ENVIANDO...' : 'ENTRAR NA LISTA DE ESPERA'}
                                    </button>
                                </form>
                                <button onClick={() => setMostrarModal(false)} className="btn-close position-absolute top-0 end-0 m-3"></button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    }

    // Sala disponível - mostrar pré-reserva e botão de pagamento
    return (
        <div className="d-flex flex-column gap-2 w-100">
            <Button variant="warning" className="fw-bold text-dark" onClick={() => setMostrarModal(true)}>
                PRÉ-RESERVA
            </Button>
            <AnimatePresence>
                {mostrarModal && (
                    <motion.div
                        className="position-fixed top-0 start-0 w-100 h-100"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1060 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMostrarModal(false)}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="position-absolute top-50 start-50 translate-middle p-4"
                            style={{
                                background: 'rgba(0, 69, 138, 0.9)',
                                borderRadius: '20px',
                                width: '90%',
                                maxWidth: '400px',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                            }}
                        >
                            <h5 className="text-white text-center fw-bold mb-4">
                                Pré-Reserva
                            </h5>
                            <p className="text-white text-center mb-4" style={{ fontSize: '0.9rem' }}>
                                Preencha os dados para fazer sua pré-reserva
                            </p>

                            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
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
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn fw-bold rounded-pill py-3"
                                    style={{ backgroundColor: '#fff', color: '#001A47', border: '3px solid #001A47' }}
                                >
                                    {loading ? 'ENVIANDO...' : 'ENVIAR PRÉ-RESERVA'}
                                </button>
                            </form>
                            <button onClick={() => setMostrarModal(false)} className="btn-close position-absolute top-0 end-0 m-3"></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Botão de pagamento para salas disponíveis */}
            <Button 
                variant="success" 
                className="fw-bold" 
                onClick={() => onPagamento(salaAtual)} 
                disabled={isSubmittingPayment}
                style={{
                    backgroundColor: '#28a745',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    width: '100%'
                }}
            >
                {isSubmittingPayment ? 'Processando Pagamento...' : 'PAGAR AGORA'}
            </Button>
        </div>
    )
}

// Componente para Contraproposta
export function ContrapropostaForm() {
    const [mostrarModal, setMostrarModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.target)
        const data = {
            nome: formData.get('nome'),
            cpf_cnpj: formData.get('cpf_cnpj'),
            contato: formData.get('contato'),
            email: formData.get('email'),
            proposta: formData.get('proposta')
        }

        try {
            const response = await fetch(`${Config.api_url}/api/formularios/contraproposta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const json = await response.json()

            if (json.sucesso) {
                setMostrarModal(false)
                alert(json.mensagem)
                event.target.reset()
            } else {
                alert(json.mensagem)
            }
        } catch (error) {
            alert('Erro ao enviar formulário. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="d-flex flex-column gap-2 w-100">
            <Button variant="warning" className="fw-bold text-dark" onClick={() => setMostrarModal(true)}>
                CONTRAPROPOSTA
            </Button>
            <AnimatePresence>
                {mostrarModal && (
                    <motion.div
                        className="position-fixed top-0 start-0 w-100 h-100"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1060 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMostrarModal(false)}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="position-absolute top-50 start-50 translate-middle p-4"
                            style={{
                                background: 'rgba(0, 69, 138, 0.9)',
                                borderRadius: '20px',
                                width: '90%',
                                maxWidth: '400px',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                            }}
                        >
                            <h5 className="text-white text-center fw-bold mb-4">
                                Contraproposta
                            </h5>
                            <p className="text-white text-center mb-4" style={{ fontSize: '0.9rem' }}>
                                Faça sua contraproposta
                            </p>

                            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
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
                                    style={{ backgroundColor: '#fff', color: '#001A47', border: '3px solid #001A47' }}
                                >
                                    {loading ? 'ENVIANDO...' : 'ENVIAR CONTRAPROPOSTA'}
                                </button>
                            </form>
                            <button onClick={() => setMostrarModal(false)} className="btn-close position-absolute top-0 end-0 m-3"></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// Componente para Agendamento de Reunião
export function AgendarReuniaoForm() {
    const [mostrarModal, setMostrarModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.target)
        const data = {
            nome: formData.get('nome'),
            cpf_cnpj: formData.get('cpf_cnpj'),
            contato: formData.get('contato'),
            email: formData.get('email'),
            data: formData.get('data'),
            hora: formData.get('hora')
        }

        try {
            const response = await fetch(`${Config.api_url}/api/formularios/agendar-reuniao`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const json = await response.json()

            if (json.sucesso) {
                setMostrarModal(false)
                alert(json.mensagem)
                event.target.reset()
            } else {
                alert(json.mensagem)
            }
        } catch (error) {
            alert('Erro ao enviar formulário. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="d-flex flex-column gap-2 w-100">
            <Button variant="warning" className="fw-bold text-dark" onClick={() => setMostrarModal(true)}>
                AGENDAR REUNIÃO
            </Button>
            <AnimatePresence>
                {mostrarModal && (
                    <motion.div
                        className="position-fixed top-0 start-0 w-100 h-100"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1060 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMostrarModal(false)}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="position-absolute top-50 start-50 translate-middle p-4"
                            style={{
                                background: 'rgba(0, 69, 138, 0.9)',
                                borderRadius: '20px',
                                width: '90%',
                                maxWidth: '400px',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                            }}
                        >
                            <h5 className="text-white text-center fw-bold mb-4">
                                Agendar Reunião
                            </h5>
                            <p className="text-white text-center mb-4" style={{ fontSize: '0.9rem' }}>
                                Agende uma reunião conosco
                            </p>

                            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
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
                                    style={{ backgroundColor: '#fff', color: '#001A47', border: '3px solid #001A47' }}
                                >
                                    {loading ? 'ENVIANDO...' : 'AGENDAR REUNIÃO'}
                                </button>
                            </form>
                            <button onClick={() => setMostrarModal(false)} className="btn-close position-absolute top-0 end-0 m-3"></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// Componente principal (compatibilidade com código existente)
const FormularioData = ({ codigo, salaAtual, onPagamento, isSubmittingPayment }) => {
    if (codigo === 'wall_street_pre_reserva') {
        return <PreReservaForm salaAtual={salaAtual} onPagamento={onPagamento} isSubmittingPayment={isSubmittingPayment} />
    } else if (codigo === 'wall_street_contraproposta') {
        return <ContrapropostaForm />
    } else if (codigo === 'wall_street_agendar_reuniao') {
        return <AgendarReuniaoForm />
    }

    return null
}

export default FormularioData
