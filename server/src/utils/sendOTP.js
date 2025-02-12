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

export const sendOTPByEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: 'lumanhalim@outlook.com',
            to: email,
            subject: 'OTP Verification',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
                    <h2 style="color: #0284c7;">OTP Verification</h2>
                    <p style="font-size: 16px;">Dear User,</p>
                    <p style="font-size: 16px;">Thank you for choosing our service. Your OTP for verification is:</p>
                    <p style="font-size: 24px; font-weight: bold; color: #333; text-align: center; margin: 20px 0;">${otp}</p>
                    <p style="font-size: 16px;">Please enter this OTP to complete your verification process. This OTP is valid for the next 10 minutes.</p>
                    <p style="font-size: 16px;">If you did not request this OTP, please ignore this email or contact our support team.</p>
                    <p style="font-size: 16px;">Best regards,</p>
                    <p style="font-size: 16px;">Your Company Team</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #777;">This is an automated message, please do not reply directly to this email.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully!');
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
};
