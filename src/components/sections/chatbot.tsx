"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Chatbot Premium
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Widget de chatbot flotante estilo WhatsApp con interfaz premium.
// La IA responde con conocimiento de servicios, precios y proyectos.
// Siempre deriva a WhatsApp para cerrar la venta.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Sugerencias rápidas para que el usuario empiece
const QUICK_PROMPTS = [
  "¿Cuánto cuesta una landing?",
  "¿Qué plan me conviene?",
  "Tengo un negocio de ropa",
  "¿Qué tecnologías usan?",
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Tooltip después de 4 segundos
  useEffect(() => {
    if (!mounted || hasInteracted) return;
    const show = setTimeout(() => setShowTooltip(true), 4000);
    const hide = setTimeout(() => setShowTooltip(false), 12000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [mounted, hasInteracted]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input al abrir
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || isLoading) return;

    if (!hasInteracted) setHasInteracted(true);

    // Mensaje de bienvenida si es el primero
    const isFirst = messages.length === 0;
    const welcome: Message = {
      role: "assistant",
      content: "Hola! Soy el asistente de Paulero Studio. Preguntame lo que quieras sobre nuestros servicios, precios o proyectos.",
    };

    const userMessage: Message = { role: "user", content };
    const updatedMessages = isFirst
      ? [welcome, userMessage]
      : [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((m) => !(isFirst && m === welcome))
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "No pude procesar tu consulta. Escribime por WhatsApp y te ayudo directamente." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Hubo un error de conexión. Probá de nuevo o contactame por WhatsApp." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Renderizado mínimo antes de montar
  if (!mounted) {
    return (
      <div className="fixed bottom-6 left-6 z-40">
        <div className="flex items-center justify-center w-14 h-14 rounded-full shadow-xl bg-primary text-primary-foreground">
          <MessageCircle className="w-6 h-6" />
        </div>
      </div>
    );
  }

  // Formatear texto con markdown básico (bold)
  const formatText = (text: string) => {
    return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute bottom-full left-0 mb-3 bg-foreground text-background text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg cursor-pointer"
            onClick={() => { setIsOpen(true); setShowTooltip(false); }}
          >
            ¿Tenés un proyecto? Chateá conmigo
            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-16 left-0 w-[380px] max-w-[calc(100vw-3rem)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "min(560px, calc(100vh - 6rem))" }}
          >
            {/* Header con gradiente */}
            <div className="relative px-4 py-3.5 border-b border-border overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-md">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">
                      Paulero Studio
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-xs text-muted-foreground">
                        En línea
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-foreground/10 transition-colors"
                  aria-label="Cerrar chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Mensaje de bienvenida si no hay mensajes */}
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="max-w-[85%] bg-foreground/8 px-3.5 py-2.5 rounded-2xl rounded-bl-md">
                      <p className="text-sm leading-relaxed">
                        Hola! Soy el asistente de <strong>Paulero Studio</strong>.
                        Puedo contarte sobre nuestros servicios, precios y ayudarte
                        a elegir el plan ideal para tu proyecto.
                      </p>
                    </div>
                  </div>

                  {/* Sugerencias rápidas */}
                  <div className="pl-[42px] space-y-2">
                    <p className="text-xs text-muted-foreground">Preguntame:</p>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => sendMessage(prompt)}
                          className="px-3 py-1.5 text-xs rounded-full border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Mensajes del chat */}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "user"
                        ? "bg-primary"
                        : "bg-primary/20"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5 text-primary-foreground" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-foreground/8 rounded-bl-md"
                    }`}
                  >
                    {formatText(msg.content)}
                  </div>
                </div>
              ))}

              {/* Indicador de escritura */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-foreground/8 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-3 bg-card">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribí tu consulta..."
                  disabled={isLoading}
                  className="flex-1 bg-foreground/5 border border-border rounded-full px-4 py-2.5 text-sm outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
                  aria-label="Enviar mensaje"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-200 hover:scale-105 bg-primary text-primary-foreground hover:shadow-2xl"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
}

export default Chatbot;
