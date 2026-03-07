import React, { useState, useRef, useCallback } from "react";
import { Upload, Image as ImageIcon, Loader2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner"; // Assuming sonner is used in the app, it was in App.tsx

const FinanceFlowOCR = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [extractedText, setExtractedText] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileSelected(e.dataTransfer.files[0]);
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileSelected(e.target.files[0]);
        }
    };

    const handleFileSelected = (file: File) => {
        if (!file.type.match(/image\/(jpeg|png|jpg)/)) {
            toast.error("Invalid file type. Please upload a JPG or PNG.");
            return;
        }
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
        setExtractedText(""); // Reset text on new image
    };

    const processImage = async () => {
        if (!selectedImage) {
            toast.error("Please select an image first.");
            return;
        }

        setIsProcessing(true);
        setExtractedText("");

        const formData = new FormData();
        formData.append("image", selectedImage);

        try {
            // Fast API OCR endpoint
            const response = await fetch("http://localhost:8000/api/ocr", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("OCR processing failed");
            }

            const data = await response.json();
            setExtractedText(data.text || "No text could be extracted.");
            toast.success("Text extracted successfully!");
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during OCR processing.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col items-center py-12 px-4 selection:bg-primary/30">
            {/* Background gradients aligned with portfolio style */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

            {/* Back button */}
            <div className="w-full max-w-4xl mb-8 z-10">
                <Link
                    to="/"
                    className="inline-flex items-center text-white/70 hover:text-white transition-colors duration-200 group relative overflow-hidden px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 glass-card"
                >
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolio
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl z-10 flex flex-col items-center"
            >
                <div className="text-center mb-10">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
                    >
                        FinanceFlow <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">– AI OCR Tool</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-400 max-w-xl mx-auto text-lg"
                    >
                        Upload an image to extract text using AI-powered OCR.
                    </motion.p>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    {/* Card: Upload / Preview Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-[#111] border border-[#222] rounded-2xl p-6 shadow-2xl backdrop-blur-sm flex flex-col"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-gray-200">Image Source</h2>

                        {!imagePreview ? (
                            <div
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-[#333] hover:border-blue-500/50 rounded-xl p-8 cursor-pointer transition-colors duration-300 bg-white/5 group"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/jpeg, image/png, image/jpg"
                                    onChange={handleFileChange}
                                />
                                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Upload className="text-blue-400" size={32} />
                                </div>
                                <p className="font-medium text-gray-300 text-center mb-2">Click or drag image to upload</p>
                                <span className="text-xs text-gray-500">Supports JPG, JPEG, PNG</span>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col relative group rounded-xl overflow-hidden border border-[#333]">
                                <img
                                    src={imagePreview}
                                    alt="Upload preview"
                                    className="w-full h-full object-contain bg-black/50 absolute inset-0 max-h-[300px]"
                                />
                                {/* Maintain aspect ratio padding or absolute height based on design */}
                                <div className="pt-[75%]"></div>
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button
                                        onClick={() => {
                                            setSelectedImage(null);
                                            setImagePreview(null);
                                            setExtractedText("");
                                        }}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-md text-white border border-white/20 transition-colors"
                                    >
                                        Change Image
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={processImage}
                            disabled={!selectedImage || isProcessing}
                            className={`mt-6 w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center relative overflow-hidden z-10 
                ${(!selectedImage || isProcessing)
                                    ? "bg-[#222] text-gray-500 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"}`}
                        >
                            <AnimatePresence mode="wait">
                                {isProcessing ? (
                                    <motion.div
                                        key="processing"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center"
                                    >
                                        <Loader2 className="animate-spin mr-2" size={20} />
                                        Extracting...
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="extract"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center"
                                    >
                                        <ImageIcon className="mr-2" size={20} />
                                        Extract Text
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </motion.div>

                    {/* Card: Result Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-[#111] border border-[#222] rounded-2xl p-6 shadow-2xl backdrop-blur-sm flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-200">Extracted Output</h2>
                            {extractedText && (
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(extractedText);
                                        toast.success("Copied to clipboard");
                                    }}
                                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1.5 rounded-md"
                                >
                                    Copy All
                                </button>
                            )}
                        </div>

                        <div className="flex-1 w-full bg-[#0a0a0a] border border-[#222] rounded-xl p-4 overflow-hidden relative group transition-colors focus-within:border-blue-500/50">
                            <textarea
                                className="w-full h-full bg-transparent border-none outline-none resize-none text-gray-300 placeholder:text-gray-600 font-mono text-sm leading-relaxed"
                                placeholder={isProcessing ? "AI is analyzing your image..." : "Extracted text will appear here..."}
                                value={extractedText}
                                readOnly
                            />
                            {/* Optional: Add a subtle inner glow on focus for a premium feel */}
                            <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default FinanceFlowOCR;
