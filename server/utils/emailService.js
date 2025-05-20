const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'WAULT (Warranty Wallet) <onboarding@resend.dev>',
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <h1>Welcome to WAULT!</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>If you did not create an account, please ignore this email.</p>
      `
    });

    if (error) {
      console.error('Error sending verification email:', error);
      throw new Error('Failed to send verification email. Please try again later.');
    }

    console.log('Verification email sent:', data);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email. Please try again later.');
  }
};

module.exports = {
  sendVerificationEmail
}; 