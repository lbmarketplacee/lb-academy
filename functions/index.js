/**
 * LB Academy — Webhook do Perfect Pay
 *
 * Recebe o aviso de venda aprovada do Perfect Pay e libera o acesso
 * do aluno automaticamente, criando um documento em "compras_liberadas"
 * com o e-mail do comprador.
 */

const {onRequest} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

exports.perfectPayWebhook = onRequest(
  {region: "southamerica-east1"},
  async (req, res) => {
    try {
      if (req.method !== "POST") {
        res.status(405).send("Método não permitido");
        return;
      }

      const body = req.body || {};

      // O Perfect Pay envia o status da venda e o e-mail do comprador.
      // Os nomes exatos dos campos podem variar — ajustamos isso
      // depois de ver o payload real de teste do Perfect Pay.
      const status = (body.sale_status_enum_key || body.status || "").toString().toLowerCase();
      const email = (body.customer && body.customer.email) || body.email || "";

      const statusAprovados = ["approved", "aprovado", "paid", "completed"];

      if (!email) {
        console.warn("Webhook recebido sem e-mail:", JSON.stringify(body));
        res.status(400).send("E-mail não encontrado no payload");
        return;
      }

      if (statusAprovados.includes(status)) {
        await db.collection("compras_liberadas").doc(email.toLowerCase()).set({
          email: email.toLowerCase(),
          origem: "perfect_pay",
          status,
          liberado_em: new Date().toISOString(),
          payload_bruto: body,
        });
        console.log(`Acesso liberado para: ${email}`);
        res.status(200).send("Acesso liberado com sucesso");
      } else {
        console.log(`Webhook recebido com status não aprovado (${status}) para ${email}`);
        res.status(200).send("Recebido, sem ação (status não aprovado)");
      }
    } catch (err) {
      console.error("Erro no webhook:", err);
      res.status(500).send("Erro interno");
    }
  }
);
