import Config from "../Config";

class StripeAPI {
  static async getConfig() {
    try {
      const response = await fetch(`${Config.api_url}/stripe/config`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar configurações do Stripe:", error);
      throw error;
    }
  }

  static async redirectToCheckout(salaData) {
    try {
      const response = await fetch(
        `${Config.api_url}/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            salaId: salaData.id,
            preco: salaData.preco,
            nomeSala: salaData.nome,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL de checkout não recebida");
      }
    } catch (error) {
      console.error("Erro ao redirecionar para checkout:", error);
      throw error;
    }
  }

  static async createCustomCheckoutSession(salaData) {
    try {
      const response = await fetch(
        `${Config.api_url}/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            salaId: salaData.id,
            preco: salaData.preco,
            nomeSala: salaData.nome,
          }),
        },
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL de checkout não recebida");
      }
    } catch (error) {
      console.error("Erro ao criar sessão de checkout:", error);
      throw error;
    }
  }

  static async getSessionStatus(sessionId) {
    try {
      const response = await fetch(
        `${Config.api_url}/stripe/session/${sessionId}`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao verificar status da sessão:", error);
      throw error;
    }
  }
}

export default StripeAPI;
