'use client';

import NewsLetter from "@/components/NewsLetter";
import CommonBanner from "@/components/custom-ui/CommonBanner";
import Loader from "@/components/custom-ui/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import bannerImage from "@/public/images/static/career_banner.jpg";
import { submitContactForm } from "@/services/api";
import { Label } from "@radix-ui/react-label";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail, MdLocalPhone } from "react-icons/md";
import { toast } from "sonner";

export default function contactUs() {
    const t = useTranslations('contactUs');
    const tg = useTranslations('General');
    const tf = useTranslations('form');

    const bannerTitle = t.rich('bannerTitle', {
        font: (chunks) => <span className="font-alt">{chunks}</span>,
    });

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");


    const validateEmail = (email) => {
        // Regular expression for a valid email address
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    };

    const handleSubmit = async () => {
        setLoading(true);
        // Trim all values
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedMessage = message.trim();

        // Validate trimmed values
        if (
            !trimmedName ||
            !trimmedEmail ||
            !trimmedMessage
        ) {
            toast.error("Please fill out all fields", {
                description: "Fields cannot be empty or just spaces.",
            });
            setTimeout(() => {
                setLoading(false);
            }, 100);
            return;
        }

        // Validate email format
        if (!validateEmail(trimmedEmail)) {
            toast.error("Invalid email address", {
                description: "Please enter a valid email address.",
            });
            setTimeout(() => {
                setLoading(false);
            }, 100);
            return;
        }

        try {
            const formData = {
                name: trimmedName,
                email: trimmedEmail,
                message: trimmedMessage
            };

            const res = await submitContactForm(formData);

            if (res && res.status === true) {
                toast.success("Request submitted!", {
                    description: "We'll get back to you shortly.",
                });

                setName("");
                setEmail("");
                setMessage("");
            } else {
                const errorsMsg = res?.response?.data?.errors;

                toast.error(res?.response?.data?.message || "Submission failed", {
                    description: errorsMsg.name || errorsMsg.email || errorsMsg.message || "Something went wrong."
                });
            }

            setTimeout(() => {
                setLoading(false);
            }, 100);

        } catch (error) {
            toast.error("Submission failed", {
                description: error?.response?.data?.message || "Something went wrong."
            });

            setTimeout(() => {
                setLoading(false);
            }, 100);
        }
    };

    if (loading) return <Loader message="Please Wait..." />;

    return (
        <div className="bg-whitee">
            <CommonBanner
                title={bannerTitle}
                bannerImage={bannerImage}
                desc={t('bannerDesc')}
                desc2=""
                avatars={[]}
                titleWidth="max-w-2xl"
                type={2}
                isContactUs={true}
            />
            <div className="scroll_top_margin size_xl" id="arrowScrollSection">
                <div id="contactForm" className="container py-16 scroll_top_margin size_xl">
                    <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mb-14">
                        <div className="col-span-1 md:col-span-2">
                            <h2 className="max-w-xs text-3xl lg:text-4xl font-normal text-neutral-900">
                                {t.rich('title', {
                                    span: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                                })}
                            </h2>
                        </div>

                        <div className="col-span-1 md:col-span-3">
                            <p>
                                {t("desc")}
                            </p>
                        </div>
                    </div>

                    <div className="p-8 border border-primary/15 bg-primary/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Side */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-4xl mb-4">
                                {t.rich('getTitle', {
                                    span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                                })}
                            </h2>

                            <div className="flex gap-2">
                                <IoLocationSharp size={22} className="text-primary mt-1" />
                                <p>
                                    {t.rich('address', {
                                        span: (chunks) => <span className="flex">{chunks}</span>
                                    })}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <MdLocalPhone size={22} className="text-primary mt-1" />
                                <p className="flex items-center">
                                    <a target="_blank" href="tel:02056242486" className="hover:text-primary">+33 (0) 783 404 656</a>
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <MdEmail size={20} className="text-primary mt-1" />
                                <p className="flex items-center">
                                    <a target="_blank" href="mailto:info@greenstoneventures.co.uk" className="hover:text-primary">info@greenstoneventures.co.uk</a>
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <form className="space-y-4">
                            <div>
                                <Label htmlFor="name" className="font-semibold block mb-1">
                                    {tf("label1")}
                                </Label>
                                <Input
                                    className="bg-white text-sm !rounded-md px-4"
                                    id="name"
                                    type="text"
                                    placeholder={tf("placeHolder1")}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="email" className="font-semibold block mb-1">
                                    {tf("label2")}
                                </Label>
                                <Input
                                    className="bg-white text-sm !rounded-md px-4"
                                    id="email"
                                    type="email"
                                    placeholder={tf("placeHolder2")}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="msg" className="font-semibold block mb-1">
                                    {tf("message")}
                                </Label>
                                <Textarea
                                    className="bg-white text-sm !rounded-md px-4"
                                    id="msg"
                                    rows="5"
                                    placeholder={tf("typeMsg")}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>

                            <Button type="button" onClick={handleSubmit} className="!rounded-md w-full mt-6 bg-primary/95 hover:bg-primary py-3">
                                {tf("submit")}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <NewsLetter />
        </div>
    )
}