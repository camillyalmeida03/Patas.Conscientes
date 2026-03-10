const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const enviarEmailcomcodigo = async (motivo, destinatario, nome, codigo) => {
    const info = await transporter.sendMail({
        from: '"Patas Conscientes" <patasconscientes@gmail.com>',
        to: destinatario,
        subject: `${motivo} - Patas Conscientes`,
        text: `Seu código de recuperação é: ${codigo}`,
        html: `
    <style>
        main{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .conteudo{
            width: 600px;
            background-color: #c3c1c1;
            padding: 1rem;
        }
        .logo{
            display: flex;
            justify-content: center;
            align-items: center;
         
        }
        .logo img{
            width: 40%;
        }
        .titulodotexto{
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
<main>

    <div class="conteudo">

        <div class="texto">
            <div class="titulodotexto">
                <h1>Olá ${nome}</h1>
            </div>
            <p>Você solicitou a ${motivo.toLowerCase()}, aqui esta seu codigo</p>

            <h2><b>${codigo}</b></h2>

            <p>Se você não solicitou a ${motivo.toLowerCase()}, desconsidere este e-mail </p>
            <p>Atenciosamente, <br> Equipe Patas Conscientes</p>
            

        </div>
    </div>

</main>
    `,
    });

    console.log("Email de recuperacao de conta enviado:", info.messageId);
};

const enviaremaillogin = async (destinatario, nome) => {
    const info = await transporter.sendMail({
        from: '"Patas Conscientes" <patasconscientes@gmail.com>',
        to: destinatario,
        subject: "Confirmação de login da Sua Conta - Patas Conscientes",
        text: `Olá ${nome}, identificamos um login em sua conta`,
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
      <h2 style="color: #0066ff;">Olá, ${nome} 👋</h2>
      <p>Detectamos um novo login na sua conta <strong>Patas Conscientes</strong>.</p>
      
      <p>Se foi você, pode ignorar este aviso. ✅</p>
      <p>Se <strong>não foi você</strong>, recomendamos que altere sua senha imediatamente para proteger sua conta.</p>
      
      <div style="margin-top: 25px;">
        <a href="#" style="background-color: #0066ff; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none;">Alterar senha</a>
      </div>
      
      <p style="margin-top: 25px; font-size: 14px; color: #666;">
        Este é um e-mail automático. Por favor, não responda a esta mensagem.
      </p>
      
      <p style="font-size: 14px; color: #999;">© 2025 Patas Conscientes</p>
    </div>
    `,
    });
    console.log("Email de login enviado:", info.messageId);
}


module.exports = {
    enviarEmailcomcodigo,
    enviaremaillogin
};