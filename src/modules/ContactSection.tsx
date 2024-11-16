/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DiscordIcon, XIcon } from "@/assets/icons";
import {
  Contact2,
  User,
  MessageSquare,
  Send,
  Loader2,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Github,
  Linkedin,
  Mail,
  Facebook,
  Instagram,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
  preferredDate: "",
  contactMethod: "email",
};

export default function ContactSection() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const section = document.getElementById("contact-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: any) => {
    setFormData({ ...formData, contactMethod: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_SERVICEID,
        import.meta.env.VITE_TEMPLATEID,
        {
          ...formData,
        },
        import.meta.env.VITE_PUBLICID
      );

      if (result.status === 200) {
        setStatus({
          type: "success",
          message: "Thank you for your message! We will get back to you soon.",
        });
        setFormData(INITIAL_FORM_STATE);
      }
    } catch (error: unknown) {
      console.log({ error });
      setStatus({
        type: "error",
        message: "Oops! Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/rakibul58", label: "GitHub" },
    {
      icon: Linkedin,
      href: "www.linkedin.com/in/muhammed-rakibul-hasan",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:muhammed.rakbul.hasan.1@gmail.com",
      label: "Email",
    },
    { icon: XIcon, href: "https://x.com/rakibul_58", label: "X" },
    {
      icon: Facebook,
      href: "https://facebook.com/rhrahi14",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/rakibul14",
      label: "Instagram",
    },
    {
      icon: DiscordIcon,
      href: "https://instagram.com/rakibul14",
      label: "Discord",
    },
  ];

  const contactInfo = [
    { icon: Mail, label: "Email", value: "muhammed.rakibul.hasan.1@gmail.com" },
    { icon: Phone, label: "Phone", value: "(+880) 1850415714" },
    {
      icon: MapPin,
      label: "Address",
      value: "Colonel Hat, Chittagong",
    },
  ];

  const renderAnimatedDiv = (children: any, index: number) => (
    <div
      className={`transform transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {children}
    </div>
  );

  return (
    <div id="contact-section" className="scroll-mt-16">
      <Card className="mb-8">
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2">
            <Contact2 className="h-6 w-6 text-primary" />
            Let's Connect
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info Side */}
                <div className="space-y-8 p-6">
                  {renderAnimatedDiv(
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold">Get in Touch</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Have a question or want to work together? Drop me a
                        message, and I'll get back to you as soon as possible.
                      </p>
                    </div>,
                    0
                  )}

                  {/* Contact Information */}
                  <div className="space-y-6">
                    {contactInfo.map((item, index) =>
                      renderAnimatedDiv(
                        <div
                          key={item.label}
                          className="flex items-center gap-4"
                        >
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group hover:bg-primary transition-colors duration-300">
                            <item.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" />
                          </div>
                          <div>
                            <p className="font-medium">{item.label}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.value}
                            </p>
                          </div>
                        </div>,
                        index + 1
                      )
                    )}
                  </div>

                  {/* Social Links */}
                  {renderAnimatedDiv(
                    <div className="pt-8 border-t">
                      <h4 className="text-lg font-semibold mb-4">
                        Connect with me
                      </h4>
                      <div className="flex gap-4 flex-wrap">
                        {socialLinks.map((social) => (
                          <a
                            key={social.label}
                            href={social.href}
                            className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
                            aria-label={social.label}
                          >
                            <social.icon className="h-5 w-5" />
                          </a>
                        ))}
                      </div>
                    </div>,
                    5
                  )}
                </div>

                {/* Contact Form Side */}
                <div className="p-6">
                  {status.type && (
                    <Alert
                      className={`mb-6 ${
                        status.type === "success"
                          ? "bg-green-50 text-green-900"
                          : "bg-red-50 text-red-900"
                      }`}
                    >
                      <AlertTitle>
                        {status.type === "success" ? "Success!" : "Error"}
                      </AlertTitle>
                      <AlertDescription>{status.message}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {renderAnimatedDiv(
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <User className="h-4 w-4" /> Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            required
                          />
                        </div>,
                        6
                      )}

                      {renderAnimatedDiv(
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <Mail className="h-4 w-4" /> Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            required
                          />
                        </div>,
                        7
                      )}
                    </div>

                    {/* Phone and Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {renderAnimatedDiv(
                        <div className="space-y-2">
                          <label
                            htmlFor="phone"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <Phone className="h-4 w-4" /> Phone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                          />
                        </div>,
                        8
                      )}

                      {renderAnimatedDiv(
                        <div className="space-y-2">
                          <label
                            htmlFor="company"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <Building2 className="h-4 w-4" /> Company
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                          />
                        </div>,
                        9
                      )}
                    </div>

                    {/* Preferred Contact Method and Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {renderAnimatedDiv(
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Preferred Contact Method
                          </label>
                          <Select
                            value={formData.contactMethod}
                            onValueChange={handleSelectChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select contact method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="phone">Phone</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>,
                        10
                      )}

                      {renderAnimatedDiv(
                        <div className="space-y-2">
                          <label
                            htmlFor="preferredDate"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <Calendar className="h-4 w-4" /> Preferred Contact
                            Date
                          </label>
                          <input
                            type="date"
                            id="preferredDate"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                          />
                        </div>,
                        11
                      )}
                    </div>

                    {/* Subject and Message */}
                    {renderAnimatedDiv(
                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <MessageSquare className="h-4 w-4" /> Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                          required
                        />
                      </div>,
                      12
                    )}

                    {renderAnimatedDiv(
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <MessageSquare className="h-4 w-4" /> Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-2 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                          required
                        ></textarea>
                      </div>,
                      13
                    )}

                    {/* Submit Button */}
                    {renderAnimatedDiv(
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </button>,
                      15
                    )}
                  </form>
                </div>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
