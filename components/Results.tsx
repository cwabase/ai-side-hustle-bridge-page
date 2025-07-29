
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiStar, FiShield, FiTrendingUp, FiAlertTriangle } from 'react-icons/fi';
import { CTAButton } from './CTAButton';

interface ResultsProps {
  analysis: string;
}

const Testimonials: React.FC = () => {
    const testimonials = [
        { name: "Sarah J.", quote: "I was stuck in 'analysis paralysis' for years. This system was the first thing that actually made sense and got me results in weeks.", stars: 5 },
        { name: "Mike R.", quote: "As a busy dad, I only had a few hours a week. I was shocked when I made my first $500. This is the real deal for people short on time.", stars: 5 },
        { name: "Jessica L.", quote: "Tech always scared me. The step-by-step process made it so simple. I feel so empowered now!", stars: 5 }
    ];

    return (
        <div className="my-12">
            <h3 className="text-3xl font-bold text-center text-white mb-8">Don't Just Take Our Word For It...</h3>
            <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                    <motion.div 
                        key={i}
                        className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.2 }}
                    >
                        <div className="flex text-yellow-400 mb-3">
                            {[...Array(t.stars)].map((_, i) => <FiStar key={i} className="fill-current" />)}
                        </div>
                        <p className="text-brand-text mb-4">"{t.quote}"</p>
                        <p className="font-bold text-white text-right">- {t.name}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

const CountdownTimer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                }
                if (prev.minutes > 0) {
                    return { minutes: prev.minutes - 1, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="text-4xl font-mono text-red-400">
            {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </div>
    );
};


export const Results: React.FC<ResultsProps> = ({ analysis }) => {
  const paragraphs = analysis.split('\n').filter(p => p.trim() !== '');

  const AFFILIATE_LINK = "https://www.clickbank.com"; // Replace with your actual affiliate link

  return (
    <div className="w-full max-w-3xl mx-auto text-center">
        <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <FiCheckCircle className="text-brand-secondary mx-auto text-5xl mb-4" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Your Personalized Path is Ready!</h2>
            <p className="text-lg text-brand-text mt-2">Here's what your answers revealed about your unique potential...</p>
        </motion.div>

        <motion.div 
            className="bg-gray-800/60 p-8 rounded-2xl border border-brand-primary/50 text-left space-y-4 text-lg text-brand-text leading-relaxed shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
        >
           {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </motion.div>

        <Testimonials />

        <motion.div
            className="bg-brand-dark border-2 border-brand-secondary p-8 rounded-2xl shadow-2xl shadow-brand-secondary/20 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
        >
            <div className="flex items-center justify-center text-red-400 font-bold mb-4 text-lg">
                <FiAlertTriangle className="mr-2"/>
                <p>Limited Time Opportunity</p>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white">Watch The Free Video Presentation Now</h3>
            <p className="text-brand-text my-4">Discover the exact step-by-step system to launch your own AI-powered side hustle.</p>
            
            <div className="flex flex-col items-center justify-center my-6">
                <p className="text-sm text-gray-400 mb-2">Your special offer expires in:</p>
                <CountdownTimer />
            </div>

            <CTAButton href={AFFILIATE_LINK} text="Yes! Show Me The Video!" />

            <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                    <FiShield className="text-brand-secondary"/>
                    <span>60-Day Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                    <FiTrendingUp className="text-brand-secondary"/>
                    <span>Proven Results for Beginners</span>
                </div>
            </div>
        </motion.div>
    </div>
  );
};
