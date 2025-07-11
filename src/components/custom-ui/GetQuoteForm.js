'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from 'next-intl';
import { toast } from 'sonner'; // Sonner import
import { submitLeadForm } from '@/services/api';
import Loader from './Loader';
import { PhoneInput } from './PhoneInput';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { Checkbox } from "@/components/ui/checkbox";

export default function GetQuoteForm({ expanded, setExpanded, development, resaleProperty, isCheckBox = false, setLead }) {

    const tg = useTranslations('General');
    const tf = useTranslations('form');

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        number: '',
        message: '',
        type: 'SkipSmallTalk',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        number: '',
        message: '',
    });

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    };

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const toggleSelection = (item, checked) => {
        setFormData((prev) => ({ ...prev, type: checked ? item : 'SkipSmallTalk' }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setErrors({
            firstName: '',
            lastName: '',
            email: '',
            number: '',
            message: '',
        });

        // Trim all values
        const trimmedData = {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            number: formData.number ? formData.number.trim() : '',
            message: formData.message.trim(),
        };

        // Client-side validation
        let hasErrors = false;
        const newErrors = { ...errors };

        if (!trimmedData.firstName) {
            newErrors.firstName = tf('requiredField');
            hasErrors = true;
        }
        if (!trimmedData.lastName) {
            newErrors.lastName = tf('requiredField');
            hasErrors = true;
        }
        if (!trimmedData.email) {
            newErrors.email = tf('requiredField');
            hasErrors = true;
        } else if (!validateEmail(trimmedData.email)) {
            newErrors.email = tf('invalidEmail');
            hasErrors = true;
        }
        if (!trimmedData.number) {
            newErrors.number = tf('requiredField');
            hasErrors = true;
        } else if (!isValidPhoneNumber(trimmedData.number)) {
            newErrors.number = tf('invalidPhone');
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            const payload = {
                first_name: trimmedData.firstName,
                last_name: trimmedData.lastName,
                phone_number: trimmedData.number,
                email: trimmedData.email,
                comments: trimmedData.message,
                development_uuid: development || null,
                resale_property_uuid: resaleProperty || null,
                type: formData.type || null
            };

            const res = await submitLeadForm(payload);

            if (res && res.status === true) {
                toast.success("Request submitted!", {
                    description: "We'll get back to you shortly.",
                });
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    number: '',
                    message: '',
                });
                setExpanded(false); // Close dialog only on success
                if (formData.type === 'SkipSmallTalk') {
                    console.log(res.data);
                    localStorage.setItem('lead', res.data?.id);
                    localStorage.setItem('client_id', res.client_id);
                    setLead(res.data?.id);
                }

            } else {
                const errors = res?.response?.data?.errors || {};
                const errorMessages = {
                    firstName: errors.first_name?.[0] || '',
                    lastName: errors.last_name?.[0] || '',
                    email: errors.email?.[0] || '',
                    number: errors.phone_number?.[0] || '',
                    message: errors.comment?.[0] || '',
                };

                setErrors(errorMessages);

                toast.error(res?.response?.data?.message || "Submission failed", {
                    description: "Please check the form for errors.",
                });
            }
        } catch (error) {
            toast.error("Submission failed", {
                description: error?.response?.data?.message || "Something went wrong.",
                action: {
                    label: "Retry",
                    onClick: handleSubmit,
                },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={expanded} onOpenChange={setExpanded}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{tg("getQuote")}</DialogTitle>
                    <DialogDescription>
                        {tg("getQuoteDesc")}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-6 items-center gap-4">
                        <Label htmlFor="firstName" className="col-span-1 sm:col-span-2">
                            <span className='flex gap-[2px]'>
                                {tf("label1")}
                                <span className='text-red-500'>*</span>
                            </span>
                        </Label>
                        <div className="col-span-1 sm:col-span-4">
                            <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                className={errors.firstName ? 'border-red-500' : ''}
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-6 items-center gap-4">
                        <Label htmlFor="lastName" className="col-span-1 sm:col-span-2">
                            <span className='flex gap-[2px]'>
                                {tf("surname")}
                                <span className='text-red-500'>*</span>
                            </span>
                        </Label>
                        <div className="col-span-1 sm:col-span-4">
                            <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                className={errors.lastName ? 'border-red-500' : ''}
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-6 items-center gap-4">
                        <Label htmlFor="email" className="col-span-1 sm:col-span-2">
                            <span className='flex gap-[2px]'>
                                {tf("label2")}
                                <span className='text-red-500'>*</span>
                            </span>
                        </Label>
                        <div className="col-span-1 sm:col-span-4">
                            <Input
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={errors.email ? 'border-red-500' : ''}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-6 items-center gap-4">
                        <Label htmlFor="number" className="col-span-1 sm:col-span-2">
                            <span className='flex gap-[2px]'>
                                {tf("telNo")}
                                <span className='text-red-500'>*</span>
                            </span>
                        </Label>
                        <div className="col-span-1 sm:col-span-4">
                            <PhoneInput
                                value={formData.number}
                                onChange={(value) => handleInputChange('number', value || '')}
                                defaultCountry="FR"
                                international
                                countryCallingCodeEditable={false}
                                className={errors.number ? 'border-red-500 rounded-md' : 'border-gray-300 rounded-md'}
                            />
                            {errors.number && (
                                <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-6 items-center gap-4">
                        <Label htmlFor="message" className="col-span-1 sm:col-span-2">
                            {tf("comment")}
                        </Label>
                        <div className="col-span-1 sm:col-span-4">
                            <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                                placeholder={tf("typeMsg")}
                                className={errors.message ? 'border-red-500' : ''}
                            />
                            {errors.message && (
                                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                            )}
                        </div>
                    </div>
                    {isCheckBox && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 cursor-pointer">
                                <Checkbox
                                    id="SkipSmallTalk"
                                    checked={formData.type === 'SkipSmallTalk'}
                                    onCheckedChange={(checked) => toggleSelection('SkipSmallTalk', checked)}
                                    className="h-5 w-5 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
                                    aria-label={tf("skipSmallTalkLabel")}
                                />
                                <Label
                                    htmlFor="SkipSmallTalk"
                                    className="text-sm font-medium text-gray-700 cursor-pointer"
                                >
                                    {tf("skipSmallTalkLabel") || "Skip the small talk—show me the floor plan please."}
                                </Label>
                            </div>
                            <div className="flex items-center gap-3 cursor-pointer">
                                <Checkbox
                                    id="LetsTalk"
                                    checked={formData.type === 'LetsTalk'}
                                    onCheckedChange={(checked) => toggleSelection('LetsTalk', checked)}
                                    className="h-5 w-5 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
                                    aria-label={tf("letsTalkLabel")}
                                />
                                <Label
                                    htmlFor="LetsTalk"
                                    className="text-sm font-medium text-gray-700 cursor-pointer"
                                >
                                    {tf("letsTalkLabel") || "Let’s talk—I’d also love a quick call back please."}
                                </Label>
                            </div>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                                    ></path>
                                </svg>
                                {tf("submitting")}
                            </>
                        ) : (
                            tg("getQuote")
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
