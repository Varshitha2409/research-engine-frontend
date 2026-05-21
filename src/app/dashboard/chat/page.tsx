"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  User,
  Brain,
  Loader2
} from "lucide-react";

export default function ChatPage() {

  const [messages, setMessages] = useState<
    {
      role: "user" | "ai";
      content: string;
    }[]
  >([
    {
      role: "ai",
      content:
        "Hello! I am ready to help you analyze your research papers. What would you like to know?"
    }
  ]);

  const [input, setInput] = useState("");

  const [isTyping, setIsTyping] =
    useState(false);

  const scrollRef =
    useRef<HTMLDivElement>(null);

  // =========================
  // AUTO SCROLL
  // =========================

  useEffect(() => {

    if (scrollRef.current) {

      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight;
    }

  }, [messages]);

  // =========================
  // SEND MESSAGE
  // =========================

  const handleSend = async () => {

    if (!input.trim() || isTyping)
      return;

    const userMsg = input.trim();

    // USER MESSAGE

    setMessages(prev => [
      ...prev,
      {
        role: "user",
        content: userMsg
      }
    ]);

    setInput("");

    setIsTyping(true);

    // EMPTY AI MESSAGE

    setMessages(prev => [
      ...prev,
      {
        role: "ai",
        content: ""
      }
    ]);

    try {

      // =========================
      // GET CURRENT PAPER
      // =========================

      const currentPaper =
        localStorage.getItem(
          "currentPaper"
        );

      if (!currentPaper) {

        throw new Error(
          "No uploaded paper found."
        );
      }

      // =========================
      // FORM DATA
      // =========================

      const formData =
        new FormData();

      formData.append(
        "query",
        userMsg
      );

      formData.append(
        "filename",
        currentPaper
      );

      formData.append(
        "model",
        "ollama"
      );

      // =========================
      // API CALL
      // =========================

      const response = await fetch(
        "http://127.0.0.1:8000/api/chat",
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.body) {

        throw new Error(
          "No response body"
        );
      }

      // =========================
      // STREAM RESPONSE
      // =========================

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder();

      let done = false;

      while (!done) {

        const {
          value,
          done: readerDone
        } = await reader.read();

        done = readerDone;

        if (value) {

          const chunk =
            decoder.decode(
              value,
              { stream: true }
            );

          const lines =
            chunk.split("\n");

          for (const line of lines) {

            if (
              line.startsWith(
                "data: "
              )
            ) {

              const data =
                line.slice(6);

              if (data) {

                setMessages(prev => {

                  const newMsgs = [
                    ...prev
                  ];

                  const lastMsg =
                    newMsgs[
                      newMsgs.length - 1
                    ];

                  if (
                    lastMsg.role === "ai"
                  ) {

                    lastMsg.content +=
                      data.replace(
                        /\\n/g,
                        "\n"
                      );
                  }

                  return newMsgs;
                });
              }
            }
          }
        }
      }

    } catch (error) {

      console.error(error);

      setMessages(prev => {

        const newMsgs = [
          ...prev
        ];

        const lastMsg =
          newMsgs[
            newMsgs.length - 1
          ];

        if (
          lastMsg.role === "ai"
        ) {

          lastMsg.content +=
            "\n\n[Connection Error: Could not reach the AI backend.]";
        }

        return newMsgs;
      });

    } finally {

      setIsTyping(false);
    }
  };

  return (
    <div
      className="
        flex
        flex-col
        h-[calc(100vh-8rem)]
        max-w-5xl
        mx-auto
      "
    >

      {/* CHAT AREA */}

      <div
        ref={scrollRef}
        className="
          flex-1
          overflow-y-auto
          space-y-6
          pr-4
          pb-4
        "
      >

        {messages.map(
          (msg, i) => (

          <motion.div
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            key={i}
            className={`
              flex
              gap-4
              ${
                msg.role === "user"
                  ? "flex-row-reverse"
                  : ""
              }
            `}
          >

            {/* ICON */}

            <div
              className={`
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                shrink-0
                ${
                  msg.role === "user"
                    ? "bg-primary/20 text-primary"
                    : "bg-blue-500/20 text-blue-400"
                }
              `}
            >

              {msg.role === "user" ? (

                <User
                  className="w-5 h-5"
                />

              ) : (

                <Brain
                  className="w-5 h-5"
                />

              )}

            </div>

            {/* MESSAGE */}

            <div
              className={`
                p-4
                rounded-2xl
                max-w-[80%]
                ${
                  msg.role === "user"
                    ? `
                      bg-primary
                      text-white
                      rounded-tr-none
                      shadow-[0_0_15px_rgba(120,20,255,0.3)]
                    `
                    : `
                      glass-panel
                      rounded-tl-none
                    `
                }
              `}
            >

              <p
                className="
                  leading-relaxed
                  whitespace-pre-wrap
                "
              >

                {msg.content}

              </p>

              {msg.role === "ai" &&
                msg.content === "" &&
                isTyping && (

                <div
                  className="
                    flex
                    items-center
                    text-gray-400
                  "
                >

                  <Loader2
                    className="
                      w-4
                      h-4
                      animate-spin
                      mr-2
                    "
                  />

                  Thinking...

                </div>
              )}

            </div>

          </motion.div>
        ))}

      </div>

      {/* INPUT */}

      <div className="mt-6">

        <div
          className="
            relative
            glass-panel
            rounded-full
            flex
            items-center
            p-2
            border
            border-primary/30
            focus-within:border-primary
            transition-colors
            shadow-lg
          "
        >

          <input
            type="text"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              handleSend()
            }
            disabled={isTyping}
            placeholder="
              Ask a question about your research papers...
            "
            className="
              flex-1
              bg-transparent
              border-none
              outline-none
              px-4
              text-white
              disabled:opacity-50
            "
          />

          <button
            onClick={handleSend}
            disabled={
              isTyping ||
              !input.trim()
            }
            className="
              w-10
              h-10
              rounded-full
              bg-primary
              flex
              items-center
              justify-center
              text-white
              hover:bg-primary/90
              transition
              hover:scale-105
              shadow-md
              shadow-primary/50
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >

            {isTyping ? (

              <Loader2
                className="
                  w-4
                  h-4
                  animate-spin
                  ml-1
                "
              />

            ) : (

              <Send
                className="
                  w-4
                  h-4
                  ml-1
                "
              />

            )}

          </button>

        </div>

      </div>

    </div>
  );
}