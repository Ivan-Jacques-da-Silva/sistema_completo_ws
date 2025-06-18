
// Configuração centralizada da aplicação
const api_url = 'http://localhost:5000'
// const api_url = 'https://wallstreetnr.com.br' // URL de produção

// Configuração de CSRF Token para compatibilidade
if (!sessionStorage.getItem('csrfToken')) {
    fetch(`${api_url}/csrf-token`)
        .then(async response => {
            const data = await response.json()
            sessionStorage.setItem('csrfToken', data.csrfToken)
        })
        .catch(error => {
            console.log('CSRF token não necessário para esta aplicação')
            sessionStorage.setItem('csrfToken', 'dummy-token')
        })
}

// Classe de configuração principal
export default class Config {
    // URL base da API (sem prefixo /api)
    static get api_url() {
        return api_url
    }

    // Token CSRF para requisições
    static get csrf_Token() {
        return sessionStorage.getItem('csrfToken')
    }

    // Configurações de timeout para requisições
    static get requestTimeout() {
        return 30000 // 30 segundos
    }

    // Headers padrão para requisições autenticadas
    static get authHeaders() {
        const token = localStorage.getItem('admin-token')
        return {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    }

    // Verificar se usuário está autenticado
    static get isAuthenticated() {
        return !!localStorage.getItem('admin-token')
    }

    // Fazer logout (limpar dados locais)
    static logout() {
        localStorage.removeItem('admin-token')
        sessionStorage.clear()
        window.location.href = '/login'
    }

    // Configurações de upload
    static get uploadConfig() {
        return {
            maxSize: 10 * 1024 * 1024, // 10MB
            allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
            maxFiles: 5
        }
    }
}
