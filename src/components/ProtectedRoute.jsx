
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);
    const token = localStorage.getItem('admin-token');

    useEffect(() => {
        const checkAuth = () => {
            if (!token) {
                navigate('/login', { replace: true });
            } else {
                setIsChecking(false);
            }
        };

        checkAuth();
    }, [token, navigate]);

    if (isChecking || !token) {
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

export default ProtectedRoute;
