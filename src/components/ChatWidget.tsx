"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { MessageSquare, X, Send } from "@/components/icons";
import { chatService } from "@/services/chatService";
import { analyticsService } from "@/services/analyticsService";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<{ t: string; who: "bot" | "user" }[]>([]);
  const [val, setVal] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const push = (t: string, who: "bot" | "user") => setMsgs((m) => [...m, { t, who }]);
  const openChat = () => {
    setOpen(true); analyticsService.track("chat_started");
    if (msgs.length === 0) push("Welcome to Superluxe. I'm the Superluxe assistant. How can I help with your journey today?", "bot");
  };
  const send = async (text: string) => { if (!text.trim()) return; push(text, "user"); setVal(""); const r = await chatService.reply(text); push(r, "bot"); setTimeout(() => bodyRef.current?.scrollTo(0, 1e5), 30); };

  return (
    <>
      <button className="fixed bottom-6 right-6 z-[124] w-[60px] h-[60px] rounded-full bg-gold text-black flex items-center justify-center shadow-[0_14px_34px_-10px_rgba(255,215,0,.6)]" aria-label="Open chat assistant" onClick={() => (open ? setOpen(false) : openChat())}><MessageSquare size={24} /></button>
      {open && (
        <div className="fixed bottom-24 right-6 z-[131] w-[min(380px,calc(100vw-32px))] h-[min(560px,70vh)] bg-bg-2 border border-line border-t-2 border-t-gold rounded-lg flex flex-col overflow-hidden shadow-2xl" role="dialog" aria-label="Superluxe assistant">
          <div className="p-4 border-b border-line flex items-center gap-3">
            <div><b className="text-sm block">Superluxe Assistant</b><small className="text-[11px] text-muted">AI assistant</small></div>
            <button className="ml-auto text-muted" aria-label="Close chat" onClick={() => setOpen(false)}><X size={18} /></button>
          </div>
          <div className="text-[10.5px] text-muted-2 px-4 py-2 bg-bg-3 border-b border-line">{chatService.disclosure} <Link href="/privacy" className="text-gold">Privacy</Link></div>
          <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {msgs.map((m, i) => <div key={i} className={`max-w-[82%] px-3.5 py-2.5 rounded-lg text-[13.5px] ${m.who === "bot" ? "bg-bg-3 border border-line self-start" : "bg-gold text-black self-end"}`}>{m.t}</div>)}
          </div>
          <div className="flex flex-wrap gap-1.5 px-4 pb-2.5">
            {["Do you serve my airport?","How do I get a quote?","What vehicles do you have?"].map((q) => <button key={q} className="text-xs px-3 py-1.5 border border-[rgba(255,215,0,.28)] text-gold rounded-full" onClick={() => send(q)}>{q}</button>)}
          </div>
          <form className="flex gap-2 p-3 border-t border-line" onSubmit={(e) => { e.preventDefault(); send(val); }}>
            <input className="flex-1 bg-bg-3 border border-line rounded-full px-4 py-2.5 text-[13px]" placeholder="Ask about our service..." value={val} onChange={(e) => setVal(e.target.value)} aria-label="Message" />
            <button className="w-[42px] h-[42px] rounded-full bg-gold text-black flex items-center justify-center" aria-label="Send"><Send size={16} /></button>
          </form>
        </div>
      )}
    </>
  );
}
