const corsOptions = {
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://chat-app-frontend-ivory.vercel.app",
      process.env.CLIENT_URL,
    ],
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };
  
  const CHATAPP_TOKEN = "chatApp-token";
  
  export { corsOptions, CHATAPP_TOKEN }; 