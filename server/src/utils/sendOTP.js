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
            text: `Your OTP for verification is: ${otp}`
        };

        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully!');
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
};
