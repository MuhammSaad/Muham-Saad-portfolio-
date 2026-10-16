"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot, User } from "lucide-react";
import { profile, stats, education, experience, skills } from "@/data/site";
import projectsData from "@/data/projects.json";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const quickPrompts = [
  "What are your top engineering projects?",
  "Tell me about your Atlas Honda internship",
  "What CAD and simulation tools do you use?",
  "How can I get in touch with you?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: `Hello! I'm Muhammad Saad's AI Assistant. Ask me anything about Saad's mechanical engineering background, CAD/FEA projects, or internships!`,
      timestamp: "Just now",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  function generateAnswer(query: string): string {
    const q = query.toLowerCase();

    if (q.includes("project") || q.includes("work") || q.includes("portfolio")) {
      const topProjects = (projectsData as Array<{ title: string; category: string }>).slice(0, 3).map(p => `• ${p.title} (${p.category})`).join("\n");
      return `Saad has built 12+ engineering projects spanning mechanical design, FEA, and machine learning. Some highlights include:\n\n${topProjects}\n\nYou can explore all of them in the Selected Projects section above!`;
    }

    if (q.includes("honda") || q.includes("internship") || q.includes("experience") || q.includes("malakand")) {
      return `Saad completed an engineering internship at Atlas Honda Limited (2026), where he designed and simulated an Engine Lifter Mechanism across seven Honda engine models with structural FEA and REBA ergonomic optimization. He also trained at Malakand-III Hydropower Plant (81 MW) on utility turbine-generator maintenance.`;
    }

    if (q.includes("skill") || q.includes("cad") || q.includes("software") || q.includes("tool") || q.includes("solidworks") || q.includes("ansys")) {
      return `Saad is a Certified SOLIDWORKS Professional (CSWP). His core toolkit includes:\n• CAD & Design: SolidWorks, GD&T, CAD/CAM\n• Simulation & FEA: ANSYS, COMSOL, FEA, CFD\n• Programming: Python, C++, MATLAB, PyTorch, Scikit-Learn\n• Data: Power BI, Excel, Plotly`;
    }

    if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("hire")) {
      return `You can reach Saad directly at ${profile.email}, or connect with him on LinkedIn (${profile.social.linkedin}). You can also send a message via the contact form on this site!`;
    }

    if (q.includes("giki") || q.includes("education") || q.includes("degree") || q.includes("university")) {
      return `Saad is pursuing his B.S. in Mechanical Engineering at Ghulam Ishaq Khan Institute of Engineering Sciences and Technology (GIKI), expected class of 2027. He is also a recipient of the Chief Minister Scholarship for academic merit.`;
    }

    if (q.includes("techno") || q.includes("robotics")) {
      return `Saad serves as the Technical Lead for Team Techno, a competitive robotics team at GIKI, leading robotics design, component development, and system optimization.`;
    }

    if (q.includes("formula") || q.includes("race") || q.includes("chassis") || q.includes("fsuk")) {
      return `Saad served as chassis design lead for Formula Student UK (FSUK), responsible for chassis design, FEA, and DBOM cost reporting.`;
    }

    if (q.includes("smep") || q.includes("workshop") || q.includes("coordinator")) {
      return `Saad is the Event Coordinator for SMEP (Society of Mechanical Engineers of Pakistan) at GIKI, where he led and conducted hands-on SolidWorks workshops from the front to train and mentor engineering students in 3D CAD modeling.`;
    }

    return `Thanks for asking! Muhammad Saad is a Mechanical Engineering student at GIKI focusing on mechanical design, FEA/CFD analysis, and applied AI. Feel free to ask about his projects, internships, or contact him directly at ${profile.email}!`;
  }

  function handleSend(textToSend?: string) {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: generateAnswer(text),
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 450);
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open AI Assistant"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-center shadow-[0_8px_24px_rgba(37,99,235,0.4)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95 transition-all duration-200"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="chatbot-window fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] max-h-[580px] h-[78vh] flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl"
          >
            {/* Window Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white leading-tight">
                    Saad&apos;s AI Assistant
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[11px] text-blue-100 font-medium">Online · Ready to answer</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/90 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-slate-900/30">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.sender === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      m.sender === "user"
                        ? "bg-blue-600 text-white font-medium rounded-br-sm shadow-sm"
                        : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.sender === "user" && (
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 items-center">
                  <div className="w-7 h-7 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="p-2.5 border-t border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 text-[11px] font-medium rounded-full bg-slate-100 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700/60 hover:border-blue-500/40 transition-colors shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Prompt Field */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills, research..."
                className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-slate-50 placeholder-slate-400 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white flex items-center justify-center transition-all duration-200 shadow-md shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
