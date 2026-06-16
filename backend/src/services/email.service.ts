import dns from 'dns';
import nodemailer from 'nodemailer';
import { config } from '../config/env';

// Forcer Node.js a utiliser IPv4 en premier pour eviter l'erreur ENETUNREACH (IPv6) sur Render
dns.setDefaultResultOrder('ipv4first');

// Configuration du transporteur d'emails
const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_PORT === 465, // true for 465, false for other ports like 587
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
  // Forcer IPv4 directement au niveau du socket (contournement Render ENETUNREACH)
  tls: {
    rejectUnauthorized: false
  },
  family: 4
} as any);

export const sendPasswordResetEmail = async (to: string, resetUrl: string): Promise<void> => {
  // En mode developpement sans SMTP, on continue d'afficher dans la console
  if (!config.SMTP_HOST || !config.SMTP_USER || !config.SMTP_PASS) {
    console.log('\n==============================================');
    console.log(`[SIMULATION EMAIL] (SMTP non configure)`);
    console.log(`A: ${to}`);
    console.log(`Sujet: Reinitialisation de votre mot de passe EventSphere`);
    console.log(`Lien: ${resetUrl}`);
    console.log('==============================================\n');
    return;
  }

  const mailOptions = {
    from: `"EventSphere" <${config.EMAIL_FROM}>`,
    to,
    subject: 'Réinitialisation de votre mot de passe EventSphere',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
        <h2 style="color: #0f172a; text-align: center;">Réinitialisation de mot de passe</h2>
        <p style="color: #475569; font-size: 16px;">Bonjour,</p>
        <p style="color: #475569; font-size: 16px;">Vous avez demandé la réinitialisation de votre mot de passe sur EventSphere. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Réinitialiser mon mot de passe</a>
        </div>
        <p style="color: #475569; font-size: 14px;">Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br/>
        <a href="${resetUrl}" style="color: #4f46e5;">${resetUrl}</a></p>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 40px; text-align: center;">Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail. Ce lien expirera dans 1 heure.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email de reinitialisation envoye a ${to}`);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    // On ne lance pas l'erreur pour ne pas bloquer l'API si l'email echoue
  }
};
