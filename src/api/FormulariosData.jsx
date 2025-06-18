
import Config from '../Config'
import { Button } from 'react-bootstrap'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Componente para Pré-Reserva
export function PreReservaForm() {
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
            email: formData.get('email')
        }

        try {
            // Validação local antes de enviar
            if (!data.nome || !data.cpf_cnpj || !data.contato || !data.email) {
                alert('Todos os campos são obrigatórios')
                return
            }

            // Requisição para API sem prefixo /api
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), Config.requestTimeout)

            const response = await fetch(`${Config.api_url}/formularios/pre-reserva`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                signal: controller.signal
            })

            clearTimeout(timeoutId)

            const json = await response.json()

            if (json.sucesso) {
                setMostrarModal(false)
                alert(json.mensagem || 'Pré-reserva enviada com sucesso!')
                event.target.reset()
            } else {
                alert(json.mensagem || 'Erro ao enviar pré-reserva')
            }
        } catch (error) {
            console.error('Erro no envio de pré-reserva:', error)
            
            if (error.name === 'AbortError') {
                alert('Timeout: A requisição demorou muito para responder')
            } else {
                alert('Erro ao enviar formulário. Verifique sua conexão e tente novamente.')
            }
        } finally {
            setLoading(false)
        }
    }

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
                                    maxLength="100"
                                />
                                <input
                                    name="cpf_cnpj"
                                    type="text"
                                    required
                                    placeholder="CPF/CNPJ"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                    maxLength="18"
                                />
                                <input
                                    name="contato"
                                    type="tel"
                                    required
                                    placeholder="TELEFONE"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                    maxLength="20"
                                />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="EMAIL"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                    maxLength="100"
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
                            <button 
                                onClick={() => setMostrarModal(false)} 
                                className="btn-close position-absolute top-0 end-0 m-3"
                                disabled={loading}
                            ></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
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
            // Validação local
            if (!data.nome || !data.cpf_cnpj || !data.contato || !data.email || !data.proposta) {
                alert('Todos os campos são obrigatórios')
                return
            }

            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), Config.requestTimeout)

            const response = await fetch(`${Config.api_url}/formularios/contraproposta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                signal: controller.signal
            })

            clearTimeout(timeoutId)

            const json = await response.json()

            if (json.sucesso) {
                setMostrarModal(false)
                alert(json.mensagem || 'Contraproposta enviada com sucesso!')
                event.target.reset()
            } else {
                alert(json.mensagem || 'Erro ao enviar contraproposta')
            }
        } catch (error) {
            console.error('Erro no envio de contraproposta:', error)
            
            if (error.name === 'AbortError') {
                alert('Timeout: A requisição demorou muito para responder')
            } else {
                alert('Erro ao enviar formulário. Verifique sua conexão e tente novamente.')
            }
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
                                    maxLength="100"
                                />
                                <input
                                    name="cpf_cnpj"
                                    type="text"
                                    required
                                    placeholder="CPF/CNPJ"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                    maxLength="18"
                                />
                                <input
                                    name="contato"
                                    type="tel"
                                    required
                                    placeholder="TELEFONE"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                    maxLength="20"
                                />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="EMAIL"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                    maxLength="100"
                                />
                                <textarea
                                    name="proposta"
                                    required
                                    placeholder="SUA PROPOSTA"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                    rows="3"
                                    maxLength="500"
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
                            <button 
                                onClick={() => setMostrarModal(false)} 
                                className="btn-close position-absolute top-0 end-0 m-3"
                                disabled={loading}
                            ></button>
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
            // Validação local
            if (!data.nome || !data.cpf_cnpj || !data.contato || !data.email || !data.data || !data.hora) {
                alert('Todos os campos são obrigatórios')
                return
            }

            // Validar se a data não é no passado
            const dataAgendamento = new Date(`${data.data}T${data.hora}`)
            if (dataAgendamento < new Date()) {
                alert('Não é possível agendar para uma data/hora no passado')
                return
            }

            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), Config.requestTimeout)

            const response = await fetch(`${Config.api_url}/formularios/agendar-reuniao`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                signal: controller.signal
            })

            clearTimeout(timeoutId)

            const json = await response.json()

            if (json.sucesso) {
                setMostrarModal(false)
                alert(json.mensagem || 'Reunião agendada com sucesso!')
                event.target.reset()
            } else {
                alert(json.mensagem || 'Erro ao agendar reunião')
            }
        } catch (error) {
            console.error('Erro no agendamento de reunião:', error)
            
            if (error.name === 'AbortError') {
                alert('Timeout: A requisição demorou muito para responder')
            } else {
                alert('Erro ao enviar formulário. Verifique sua conexão e tente novamente.')
            }
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
                                    maxLength="100"
                                />
                                <input
                                    name="cpf_cnpj"
                                    type="text"
                                    required
                                    placeholder="CPF/CNPJ"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                    maxLength="18"
                                />
                                <input
                                    name="contato"
                                    type="tel"
                                    required
                                    placeholder="TELEFONE"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                    maxLength="20"
                                />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="EMAIL"
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                    maxLength="100"
                                />
                                <input
                                    name="data"
                                    type="date"
                                    required
                                    className="form-control rounded-4 px-3 py-3 mb-3"
                                    min={new Date().toISOString().split('T')[0]}
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
                            <button 
                                onClick={() => setMostrarModal(false)} 
                                className="btn-close position-absolute top-0 end-0 m-3"
                                disabled={loading}
                            ></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// Componente principal (compatibilidade com código existente)
export default function FormulariosData({ codigo = '' }) {
    if (codigo === 'wall_street_pre_reserva') {
        return <PreReservaForm />
    } else if (codigo === 'wall_street_contraproposta') {
        return <ContrapropostaForm />
    } else if (codigo === 'wall_street_agendar_reuniao') {
        return <AgendarReuniaoForm />
    }

    return null
}
