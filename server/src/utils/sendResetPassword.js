import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'lumanhalim@outlook.com', // Your Outlook email address
        pass: 'T29101923' // Your Outlook password
    },
    debug: true // Enable debugging output
});

export const sendResetPassword = async (email, resetUrl) => {
    try {
        const mailOptions = {
            from: 'lumanhalim@outlook.com',
            to: email,
            subject: 'Password Reset Request',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
                    <h2 style="color: #4CAF50;">Password Reset Request</h2>
                    <p style="font-size: 16px;">You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
                    <p style="font-size: 16px;">Please click on the following link, or paste it into your browser to complete the process:</p>
                    <p style="font-size: 16px;"><a href="${resetUrl}">${resetUrl}</a></p>
                    <p style="font-size: 16px;">If you did not request this, please ignore this email and your password will remain unchanged.</p>
                    <p style="font-size: 16px;">Thank you for using our service.</p>
                    <p style="font-size: 16px;">Best regards,</p>
                    <p style="font-size: 16px;">TRAVEL</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #777;">This is an automated message, please do not reply directly to this email.</p>
                </div>
            `
        };
    
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully!');
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
};
