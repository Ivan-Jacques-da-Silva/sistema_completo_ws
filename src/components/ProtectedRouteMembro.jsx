
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const ProtectedRouteMembro = ({ children }) => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);
    const token = localStorage.getItem('membro-token');
    const membroNome = localStorage.getItem('membro-nome');

    useEffect(() => {
        const checkAuth = () => {
            if (!token || !membroNome) {
                localStorage.removeItem('membro-token');
                localStorage.removeItem('membro-nome');
                navigate('/login-membro', { replace: true });
            } else {
                setIsChecking(false);
            }
        };

        checkAuth();
    }, [token, navigate, membroNome]);

    if (isChecking) {
        return (
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status"></div>
                    <h5>Verificando autenticação...</h5>
                </div>
            </Container>
        );
    }

    return children;
};

export default ProtectedRouteMembro;
