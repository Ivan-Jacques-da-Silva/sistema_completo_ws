// const api_url = 'http://localhost:5000'
const api_url = 'https://api.wallstreetnr.com.br'

if (!sessionStorage.getItem('csrfToken')) {
    fetch(`${api_url}/api/csrf-token/`).then(async response => {
        const data = await response.json()
        sessionStorage.setItem('csrfToken', data.csrfToken)
    }).catch(error => {
        console.log('CSRF token não necessário para esta aplicação')
        sessionStorage.setItem('csrfToken', 'dummy-token')
    })
}

export default class {

    static get api_url() {
        return window.location.hostname === 'localhost'
            ? 'http://localhost:5000'
            : 'https://api.wallstreetnr.com.br';
    }

    static get csrf_Token() {
        return sessionStorage.getItem('csrfToken')
    }
}