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

export const sendNotification = async (email, userName) => {
    try {
        const mailOptions = {
            from: 'lumanhalim@outlook.com',
            to: email,
            subject: 'You have a new reservation',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
                    <h2 style="color: #4CAF50;">Reservation Confirmation</h2>
                    <p style="font-size: 16px;">Dear User,</p>
                    <p style="font-size: 16px;">We are pleased to inform you that <strong>${userName}</strong> has sent a request for your reservation.</p>
                    <p style="font-size: 16px;">Thank you for using our service. If you have any questions or need further assistance, please feel free to contact us.</p>
                    <p style="font-size: 16px;">Best regards,</p>
                    <p style="font-size: 16px;">Your Company Team</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #777;">This is an automated message, please do not reply directly to this email.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Notification sent successfully!');
    } catch (error) {
        console.error('Error sending notification:', error);
        throw new Error('Failed to send notification');
    }
};
