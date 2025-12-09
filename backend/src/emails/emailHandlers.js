import { createWelcomeEmailTemplate } from "./emailTemplates.js";
import { resendClient, sender } from "../lib/resend.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Chat-Mate",
        html: createWelcomeEmailTemplate(name, clientURL), // FIXED
    });

    if (error) {
        console.log("Error sending email:", error);
        throw new Error("Failed to send welcome email");
    } else {
        console.log("*******Email sent successfully:", data);
    }
};
