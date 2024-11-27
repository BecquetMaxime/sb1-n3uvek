import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  const msg = {
    to,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: process.env.SENDGRID_FROM_NAME
    },
    subject,
    html
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send email');
  }
};

export const sendBookingConfirmation = async (booking, user, room) => {
  const html = `
    <h1>Confirmation de réservation - Les Spas de Galamé</h1>
    <p>Bonjour ${user.firstName},</p>
    <p>Nous vous confirmons votre réservation pour ${room.name}.</p>
    <p>Détails de la réservation :</p>
    <ul>
      <li>Date d'arrivée : ${new Date(booking.startDate).toLocaleDateString('fr-FR')}</li>
      <li>Date de départ : ${new Date(booking.endDate).toLocaleDateString('fr-FR')}</li>
      <li>Montant total : ${booking.totalPrice}€</li>
    </ul>
    <p>Nous vous attendons avec impatience !</p>
    <p>Cordialement,<br>L'équipe des Spas de Galamé</p>
  `;

  await sendEmail(user.email, 'Confirmation de votre réservation', html);
};

export const sendPasswordReset = async (user, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  
  const html = `
    <h1>Réinitialisation de votre mot de passe</h1>
    <p>Bonjour ${user.firstName},</p>
    <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
    <p>Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
    <p><a href="${resetUrl}">Réinitialiser mon mot de passe</a></p>
    <p>Ce lien expire dans 1 heure.</p>
    <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
    <p>Cordialement,<br>L'équipe des Spas de Galamé</p>
  `;

  await sendEmail(user.email, 'Réinitialisation de votre mot de passe', html);
};