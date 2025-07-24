
const nodemailer = require('nodemailer');

// Configuração do transporter (usando Gmail como exemplo)
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 587,
    secure: false,

    auth: {
        user: process.env.EMAIL_USER || 'seu-email@gmail.com', // Configure no .env
        pass: process.env.EMAIL_PASS || 'sua-senha-app'        // Configure no .env
    }
});

// Função para enviar notificação de contraproposta
const enviarNotificacaoContraproposta = async (dados) => {
    const mailOptions = {
        from: process.env.EMAIL_USER || 'seu-email@gmail.com',
        to: 'gerencia01@wcostella.com.br',
        subject: '🏢 Nova Contraproposta Recebida - Wall Street Corporate',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Nova Contraproposta Recebida</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #495057; margin-top: 0;">Dados do Cliente:</h3>
          <p><strong>Nome:</strong> ${dados.nome}</p>
          <p><strong>CPF/CNPJ:</strong> ${dados.cpf_cnpj}</p>
          <p><strong>Contato:</strong> ${dados.contato}</p>
          <p><strong>Email:</strong> ${dados.email}</p>
          <p><strong>Proposta:</strong> ${dados.proposta}</p>
        </div>
        
        <p style="color: #6c757d; font-size: 14px;">
          Data/Hora: ${new Date().toLocaleString('pt-BR')}
        </p>
        
        <hr style="border: 1px solid #dee2e6;">
        <p style="color: #6c757d; font-size: 12px; text-align: center;">
          Esta é uma notificação automática do sistema Wall Street Corporate
        </p>
      </div>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Email de contraproposta enviado com sucesso');
    } catch (error) {
        console.error('❌ Erro ao enviar email de contraproposta:', error);
    }
};

// Função para enviar notificação de agendamento
const enviarNotificacaoAgendamento = async (dados) => {
    const mailOptions = {
        from: process.env.EMAIL_USER || 'seu-email@gmail.com',
        to: 'gerencia01@wcostella.com.br',
        subject: '📅 Nova Reunião Agendada - Wall Street Corporate',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Nova Reunião Agendada</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #495057; margin-top: 0;">Dados do Cliente:</h3>
          <p><strong>Nome:</strong> ${dados.nome}</p>
          <p><strong>CPF/CNPJ:</strong> ${dados.cpf_cnpj}</p>
          <p><strong>Contato:</strong> ${dados.contato}</p>
          <p><strong>Email:</strong> ${dados.email}</p>
          
          <h3 style="color: #495057;">Agendamento:</h3>
          <p><strong>Data:</strong> ${dados.data}</p>
          <p><strong>Hora:</strong> ${dados.hora}</p>
        </div>
        
        <p style="color: #6c757d; font-size: 14px;">
          Solicitação feita em: ${new Date().toLocaleString('pt-BR')}
        </p>
        
        <hr style="border: 1px solid #dee2e6;">
        <p style="color: #6c757d; font-size: 12px; text-align: center;">
          Esta é uma notificação automática do sistema Wall Street Corporate
        </p>
      </div>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Email de agendamento enviado com sucesso');
    } catch (error) {
        console.error('❌ Erro ao enviar email de agendamento:', error);
    }
};

module.exports = {
    enviarNotificacaoContraproposta,
    enviarNotificacaoAgendamento
};
