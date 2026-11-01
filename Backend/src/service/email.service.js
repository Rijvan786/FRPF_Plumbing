import emailjs from "@emailjs/nodejs"
import { Config } from "../config/config.js"

export async function   SendMailDynamicContent({
  subject,
  email,
  html,
  subject_line,
}) {
  const templateParams = {
    subject_line: subject || subject_line,
    to_email: email,
    dynamic_html_content: html,
  };
  await emailjs
    .send(
      Config.EMAILJS_SERVICE_ID,
      Config.EMAILJS_TEMPLATE_ID,
      templateParams,
      {
        publicKey: Config.EMAILJS_PUBLIC_KEY,
        privateKey: Config.EMAILJS_PRIVATE_KEY,
      },
    )
    .then((res) => {
      console.log("Successfully sent email", res.status, res.text);
    })
    .catch((error) => {
      console.log(`Sending mail Error occurred `, error);
    });
}
