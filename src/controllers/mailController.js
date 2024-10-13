import send from "../services/nodemailer.js";

class MailController {
  static async sendMail(req, res) {
    try {
      const { to, subject, body } = req.body;
      send(to, subject, body);
      return res.status(201).json({ msg: "Email enviado com sucesso" });
    } catch (error) {
      res.status(500).json({ msg: `o seguinte erro ocorreu: ${error}` });
    }
  }
}

export default MailController;
