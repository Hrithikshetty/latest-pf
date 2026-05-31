import emailjs from "@emailjs/browser";

const getEmailJsConfig = () => ({
  serviceId: (process.env.NEXT_PUBLIC_SERVICE_ID ?? "").trim(),
  templateId: (process.env.NEXT_PUBLIC_TEMPLATE_ID ?? "").trim(),
  publicKey: (process.env.NEXT_PUBLIC_USER_ID ?? "").trim(),
});

let initialized = false;

const ensureEmailJsInit = (publicKey) => {
  if (initialized || typeof window === "undefined") return;
  emailjs.init({ publicKey });
  initialized = true;
};

const mail = ({ name, email, message }) => {
  const { serviceId, templateId, publicKey } = getEmailJsConfig();

  if (!serviceId || !templateId || !publicKey) {
    return Promise.reject(
      new Error(
        "EmailJS is not configured. Set NEXT_PUBLIC_SERVICE_ID, NEXT_PUBLIC_TEMPLATE_ID, and NEXT_PUBLIC_USER_ID."
      )
    );
  }

  ensureEmailJsInit(publicKey);

  return emailjs.send(
    serviceId,
    templateId,
    {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    },
    {
      publicKey,
      limitRate: {
        id: "portfolio-contact",
        throttle: 10000,
      },
    }
  );
};

export default mail;
