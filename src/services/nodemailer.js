import nodemailer from "nodemailer"

//Utiliza variaveis de ambiente, verifique com o Caio os dados
//funcao do nodemailer (biblioteca) que cria o transporte de email e define o modelo de transporte
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

//define modelo transporte
 const send = (to, subject, body) => {
    transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject,
        text: body
    })
}

export default send