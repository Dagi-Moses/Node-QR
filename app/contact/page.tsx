"use client"

import { Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "../../lib/utils"
import toast from "react-hot-toast";
import { useState } from "react";



export default function ContactPage() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.currentTarget;
        const formData = new FormData(form);


        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.get("name"),
                    email: formData.get("email"),
                    message: formData.get("message"),
                    pageUrl: window.location.href,
                }),
            });

            if (!res.ok) throw new Error("Failed to send");

            toast.success("Message sent!\n Thank you for reaching out. I’ll get back to you shortly.",);

            form.reset();
        } catch (err) {
            toast.error("Something went wrong\nPlease try again later.",);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">


            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12">

                {/* Contact Info */}
                <aside className="space-y-4 text-sm">
                    <header className="mb-12">
                        <h1 className="text-3xl font-semibold">Contact Us</h1>
                        <p className="text-muted-foreground mt-2">
                            Need help or have a question? We usually respond within 24 hours.
                        </p>
                    </header>
                    <div>
                        <p className="font-medium">Email</p>
                        <a
                            href="mailto:nodetechnologiessolution@gmail.com"
                            className="underline underline-offset-4 text-blue-600 hover:text-blue-500 transition-colors"
                        >
                            nodetechnologiessolution@gmail.com
                        </a>

                    </div>

                    <div>
                        <p className="font-medium">Response Time</p>
                        <p>Within 24–48 hours</p>
                    </div>

                    <div>
                        <p className="font-medium">Availability</p>
                        <p>Monday – Friday</p>
                    </div>

                    <div className="pt-4">
                        <a href="/faqs" className="underline">
                            Visit FAQs
                        </a>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10 mt-10">

                        <div className="">
                            <h4 className="text-base text-foreground font-semibold">Customer Support</h4>
                            <p className="mt-3 text-muted-foreground text-xs sm:text-sm ">
                                Our support team is available round the clock to support any concerns or queries you may have.
                            </p>
                        </div>
                        <div className="">
                            <h4 className="text-base text-foreground font-semibold">Feedback & Suggestions</h4>
                            <p className="mt-3 text-muted-foreground text-xs sm:text-sm ">
                                We value your feedback and are continously working to improve NodeQR, your input is crucial.
                            </p>
                        </div>
                        <div className="">
                            <h4 className="text-base text-foreground font-semibold">Customer Support</h4>
                            <p className="mt-3 text-muted-foreground text-xs sm:text-sm  ">
                                Our support team is available round the clock to support any concerns or queries you may have.
                            </p>
                        </div>


                    </div>
                </aside>

                {/* Contact Form */}
                <div className="bg-card p-8 rounded-lg shadow-xs min-w-md max-w-md w-full justify-self-end">
                    <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium mb-2"
                            >
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                placeholder="John Doe..."
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-2"
                            >
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                placeholder="Johndoe@example.com..."
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium mb-2"
                            >
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                                placeholder="Write your message..."
                            />
                        </div>
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className={cn(
                                "cosmic-button w-full flex items-center justify-center gap-2"
                            )}
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                            <Send size={16} />
                        </button>
                    </form>
                    <p className="text-xs text-muted-foreground text-center text-blue mt-2">
                        We’ll only use your email to respond to your request.
                    </p>
                </div>



            </div>
        </section>
    );
}

// export default function ContactPage() {
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setTimeout(() => {
//             toast(
//                 <div>
//                     <strong className="block">Message sent!</strong>
//                     <span className="block text-sm">
//                         Thank you for your message, i&apos;ll get back to you shortly.
//                     </span>
//                 </div>,
//                 {
//                     duration: 4000,
//                 }
//             );
//             setIsSubmitting(false);
//         }, 1500);
//     };

//     return (
//         <section className="max-w-6xl mx-auto px-6 py-16">
//             <div className="container mx-auto max-w-5xl">
//                 <h2 className="text-3xl md:text-4xl font-bold mb text-center mb-5">
//                     Get In
//                     <span className="text-primary"> Touch</span>
//                 </h2>

//                 <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
//                     Got something you want to build or need a developer to team up with?
//                     Reach out anytime I'm open to new projects, collaborations and jobs.
//                 </p>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//                     <div className="space-y-8 max-sm:mx-auto">
//                         <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

//                         <div className="space-y-6">
//                             <div className="flex items-start space-x-4 ">
//                                 <div className="p-3 rounded-full bg-primary/10">
//                                     <Phone className="h-6 w-6 text-primary" />
//                                 </div>
//                                 <div>
//                                     <h4 className="font-medium text-left">Phone</h4>
//                                     <a
//                                         href="tel:+2348181304896"
//                                         className="text-muted-foreground hover:text-primary transition-colors"
//                                     >
//                                         +234 818 130 4896
//                                     </a>
//                                 </div>
//                             </div>
//                             <div className="flex items-start space-x-4 ">
//                                 <div className="p-3 rounded-full bg-primary/10">
//                                     <Mail className="h-6 w-6 text-primary" />
//                                 </div>
//                                 <div>
//                                     <h4 className="font-medium text-left ">Email</h4>
//                                     <a
//                                         href="mailto:dagitmoses@gmail.com"
//                                         className="text-muted-foreground hover:text-primary transition-colors"
//                                     >
//                                         dagitmoses@gmail.com
//                                     </a>
//                                 </div>
//                             </div>
//                             <div className="flex items-start space-x-4 ">
//                                 <div className="p-3 rounded-full bg-primary/10">
//                                     <MapPin className="h-6 w-6 text-primary" />
//                                 </div>
//                                 <div>
//                                     <h4 className="font-medium text-left">Location</h4>
//                                     <a
//                                         href="https://www.google.com/maps/search/?api=1&query=Lagos+Nigeria"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-muted-foreground hover:text-primary transition-colors"
//                                     >
//                                         Lagos, Nigeria
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="pt-8">
//                             <h4 className="font-medium mb-4">Connect With Me</h4>
//                             <div className="flex space-x-8 justify-center items-center">
//                                 <a
//                                     href="https://www.linkedin.com/in/moses-dagi"
//                                     target="_blank"
//                                     className=" text-foreground/80 hover:text-primary transition-colors duration-300"
//                                 >
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="30"
//                                         height="30"
//                                         viewBox="0 0 32 32"
//                                         className=" text-foreground/80 hover:text-primary transition-colors duration-300"
//                                         fill="currentColor"
//                                     >
//                                         <path d="M7.5 5A2.518 2.518 0 0 0 5 7.5v17C5 25.867 6.133 27 7.5 27h17c1.367 0 2.5-1.133 2.5-2.5v-17C27 6.133 25.867 5 24.5 5zm0 2h17c.285 0 .5.215.5.5v17a.49.49 0 0 1-.5.5h-17a.489.489 0 0 1-.5-.5v-17c0-.285.215-.5.5-.5zm2.938 1.719a1.719 1.719 0 1 0 0 3.437a1.719 1.719 0 0 0 0-3.437zm9.03 4.562c-1.433 0-2.386.785-2.78 1.531h-.063V13.5h-2.813V23h2.938v-4.688c0-1.238.246-2.437 1.781-2.437c1.512 0 1.532 1.398 1.532 2.5V23H23v-5.219c0-2.554-.543-4.5-3.531-4.5zM9 13.5V23h2.969v-9.5z" />
//                                     </svg>
//                                 </a>
//                                 <a
//                                     href="https://wa.me/2348181304896"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className=" text-foreground/80 hover:text-primary transition-colors duration-300"
//                                 >
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="25"
//                                         height="25"
//                                         viewBox="0 0 24 24"
//                                         className=" text-foreground/80 hover:text-primary transition-colors duration-300"
//                                         fill="currentColor"
//                                     >
//                                         <path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8c-.2-.1-.4-.1-.6.1c-.2.2-.6.8-.8 1c-.1.2-.3.2-.5.1c-.7-.3-1.4-.7-2-1.2c-.5-.5-1-1.1-1.4-1.7c-.1-.2 0-.4.1-.5c.1-.1.2-.3.4-.4c.1-.1.2-.3.2-.4c.1-.1.1-.3 0-.4c-.1-.1-.6-1.3-.8-1.8c-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3c-.6.6-.9 1.3-.9 2.1c.1.9.4 1.8 1 2.6c1.1 1.6 2.5 2.9 4.2 3.7c.5.2.9.4 1.4.5c.5.2 1 .2 1.6.1c.7-.1 1.3-.6 1.7-1.2c.2-.4.2-.8.1-1.2l-.4-.2m2.5-9.1C15.2 1 8.9 1 5 4.9c-3.2 3.2-3.8 8.1-1.6 12L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2c5.5 0 9.9-4.4 9.9-9.9c.1-2.6-1-5.1-2.8-7m-2.7 14c-1.3.8-2.8 1.3-4.4 1.3c-1.5 0-2.9-.4-4.2-1.1l-.3-.2l-3.1.8l.8-3l-.2-.3c-2.4-4-1.2-9 2.7-11.5S16.6 3.7 19 7.5c2.4 3.9 1.3 9-2.6 11.4" />
//                                     </svg>
//                                     {/* <Br /> */}
//                                 </a>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-card p-8 rounded-lg shadow-xs">
//                         <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
//                         <form className="space-y-6" onSubmit={handleSubmit}>
//                             <div>
//                                 <label
//                                     htmlFor="name"
//                                     className="block text-sm font-medium mb-2"
//                                 >
//                                     Your Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="name"
//                                     name="name"
//                                     required
//                                     className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
//                                     placeholder="John Doe..."
//                                 />
//                             </div>
//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="block text-sm font-medium mb-2"
//                                 >
//                                     Your Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     name="email"
//                                     required
//                                     className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
//                                     placeholder="Johndoe@example.com..."
//                                 />
//                             </div>
//                             <div>
//                                 <label
//                                     htmlFor="message"
//                                     className="block text-sm font-medium mb-2"
//                                 >
//                                     Your Message
//                                 </label>
//                                 <textarea
//                                     id="message"
//                                     name="message"
//                                     required
//                                     className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
//                                     placeholder="Write your message..."
//                                 />
//                             </div>
//                             <button
//                                 disabled={isSubmitting}
//                                 type="submit"
//                                 className={cn(
//                                     "cosmic-button w-full flex items-center justify-center gap-2"
//                                 )}
//                             >
//                                 {isSubmitting ? "Sending..." : "Send Message"}
//                                 <Send size={16} />
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };



