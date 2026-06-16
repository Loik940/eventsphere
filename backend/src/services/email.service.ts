import { Resend } from 'resend';
import { config } from '../config/env';

// Initialisation du client Resend
const resend = new Resend(config.RESEND_API_KEY);

export const sendPasswordResetEmail = async (to: string, resetUrl: string): Promise<void> => {
  // En mode developpement sans API key, on continue d'afficher dans la console
  if (!config.RESEND_API_KEY) {
    console.log('\n==============================================');
    console.log(`[SIMULATION EMAIL] (Cle Resend non configuree)`);
    console.log(`A: ${to}`);
    console.log(`Sujet: Reinitialisation de votre mot de passe EventSphere`);
    console.log(`Lien: ${resetUrl}`);
    console.log('==============================================\n');
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `EventSphere <${config.EMAIL_FROM}>`,
      to: [to],
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
    });

    if (error) {
      console.error('Erreur API Resend:', error);
      return;
    }

    console.log(`Email de reinitialisation envoye avec succes a ${to} (ID: ${data?.id})`);
  } catch (error) {
    console.error('Exception lors de l\'envoi de l\'email via Resend:', error);
    // On ne lance pas l'erreur pour ne pas bloquer l'API si l'email echoue
  }
};
