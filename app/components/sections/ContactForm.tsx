"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/app/lib/email-validation";
import Section from "@/app/components/layout/Section";
import FormField from "@/app/components/ui/FormField";
import TerminalButton from "@/app/components/ui/TerminalButton";
import SocialLink from "@/app/components/ui/SocialLink";
import { portfolioData } from "@/app/data/portfolio-data";
import { getSocialIcon } from "@/app/lib/icon-mappings";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  return (
    <Section id="contact" title="contact">
      <div className="max-w-2xl">
        <p className="text-gray-400 text-sm mb-8">
          Send a message through the terminal
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <FormField
            label="name"
            placeholder="Enter your name..."
            error={errors.name?.message}
            {...register("name")}
          />

          <FormField
            label="email"
            type="email"
            placeholder="Enter your email..."
            error={errors.email?.message}
            {...register("email")}
          />

          <FormField
            label="message"
            as="textarea"
            placeholder="Type your message..."
            error={errors.message?.message}
            {...register("message")}
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <TerminalButton type="submit" loading={status === "loading"}>
              ./send-message.sh
            </TerminalButton>

            {status === "success" && (
              <p className="text-terminal-glow text-sm font-mono glow-text" role="status">
                Message sent successfully!
              </p>
            )}

            {status === "error" && (
              <p className="text-red-400 text-sm font-mono" role="alert">
                Error: {errorMessage}
              </p>
            )}
          </div>
        </form>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-terminal-border">
          <p className="text-gray-400 text-sm mb-4">Or connect with me on:</p>
          <div className="flex flex-wrap gap-4">
            <SocialLink
              href={portfolioData.contact.github}
              iconSrc={getSocialIcon("github")}
              label="GitHub"
            />
            <SocialLink
              href={portfolioData.contact.linkedin}
              iconSrc={getSocialIcon("linkedin")}
              label="LinkedIn"
            />
            <SocialLink
              href={`mailto:${portfolioData.contact.email}`}
              iconSrc={getSocialIcon("email")}
              label={portfolioData.contact.email}
              external={false}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
