import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState } from 'react'

export default function Contact() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState<any>({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);

    // Validation check method
    const handleValidation = () => {
        let tempErrors = {
            "fullname": false,
            "email": false,
            "subject": false,
            "message": false
        };
        let isValid = true;

        if (fullname.length <= 0) {
            tempErrors["fullname"] = true;
            isValid = false;
        }
        if (email.length <= 0) {
            tempErrors["email"] = true;
            isValid = false;
        }
        if (subject.length <= 0) {
            tempErrors["subject"] = true;
            isValid = false;
        }
        if (message.length <= 0) {
            tempErrors["message"] = true;
            isValid = false;
        }

        setErrors({ ...tempErrors });
        console.log("errors", errors);
        return isValid;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setShowSuccessMessage(false);
        setShowFailureMessage(false);
    
        let isValidForm = handleValidation();

        if (isValidForm === true) {
            const res = await fetch("/api/sendgrid", {
                body: JSON.stringify({
                    email: email,
                    fullname: fullname,
                    subject: subject,
                    message: message,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                    method: "POST",
                });
    
            const { error } = await res.json();
            if (error) {
                setShowFailureMessage(true);
                return;
            }
            setShowSuccessMessage(true);
        }
    };

    return (
        <div className="max-w-7xl mx-auto h-full">
            <div className="md:mx-5 h-full" id="outer-container">
                <Head>
                <title>Contact Us</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="preload"
                    href="/fonts/Oswald-Bold.ttf"
                    as="font"
                    crossOrigin=""
                    />
                </Head>
                <Header />
                <main id="page-wrap">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col px-8 py-8 bg-white"
                    >
                    <h1 className="text-2xl font-header uppercase">
                        Contact Us
                    </h1>

                    <label
                        htmlFor="fullname"
                        className="text-black mt-8 font-header"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={fullname}
                        onChange={(e) => {
                        setFullname(e.target.value);
                        }}
                        name="fullname"
                        className="border-b py-2 pl-2 focus:outline-none focus:rounded-md focus:ring-1 ring-black text-gray-500 font-body"
                    />
                    {errors['fullname'] && <h1 className="text-red-500 text-body">Please enter your name.</h1>}

                    <label
                        htmlFor="email"
                        className="text-black mt-8 font-header"
                    >
                        E-mail
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                        setEmail(e.target.value);
                        }}
                        className="border-b py-2 pl-2 focus:outline-none focus:rounded-md focus:ring-1 ring-black text-gray-500 font-body"
                    />
                    {errors['email'] && <h1 className="text-red-500 text-body">Please enter your email.</h1>}

                    <label
                        htmlFor="subject"
                        className="text-black mt-8 font-header"
                    >
                        Subject
                    </label>
                    <input
                        type="text"
                        name="subject"
                        value={subject}
                        onChange={(e) => {
                        setSubject(e.target.value);
                        }}
                        className="border-b py-2 pl-2 focus:outline-none focus:rounded-md focus:ring-1 ring-black text-gray-500 font-body"
                    />
                    {errors['subject'] && <h1 className="text-red-500 text-body">Please enter a subject.</h1>}

                    <label
                        htmlFor="message"
                        className="text-black mt-8 font-header"
                    >
                        Message
                    </label>
                    <textarea
                        name="message"
                        value={message}
                        onChange={(e) => {
                        setMessage(e.target.value);
                        }}
                        className="border-b py-2 pl-2 focus:outline-none focus:rounded-md focus:ring-1 ring-black text-gray-500 font-body"
                    ></textarea>
                    {errors['message'] && <h1 className="text-red-500 text-body">Please enter a message.</h1>}

                    <div className="flex flex-col items-center justify-center">
                        <button
                        type="submit"
                        className="px-10 mt-8 py-2 bg-black text-white font-header rounded-md text-lg flex flex-row items-center"
                        >
                        Submit
                        </button>
                        {showSuccessMessage && <h1 className="font-body text-green-500 pt-5">Successfully sent. We'll get back to you soon!</h1>}
                        {showFailureMessage && <h1 className="font-body text-red-500 pt-5">An error occurred... Please contact us at help@sportsquiz.org</h1>}
                    </div>
                </form>
                </main>
                <Footer />
            </div>
        </div>
    )
}