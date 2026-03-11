import React, { useState, useRef, useCallback } from "react";
import { Upload, Image as ImageIcon, Loader2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const FinanceFlowOCR = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [extractedText, setExtractedText] = useState<string>("");
    const [imagePath, setImagePath] = useState<string | null>(null);
    const [editedText, setEditedText] = useState<string>("");
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
        formData.append("file", selectedImage);

        try {

            const response = await fetch("http://127.0.0.1:8000/extract-text", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("OCR processing failed");
            }

            const data = await response.json();

            setExtractedText(data.extracted_text);
            setEditedText(data.extracted_text);
            setImagePath(data.image_path);

            toast.success("Text extracted successfully!");

        } catch (error) {
            console.error(error);
            toast.error("OCR processing error");
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
            <div className="w-full max-w-[1400px] mb-8 z-10">
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
                className="w-full max-w-[1400px] z-10 flex flex-col items-center"
            >
                <div className="text-center mb-10">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
                    >
                        Text Flow Tool <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"></span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-400 max-w-xl mx-auto text-lg"
                    >
                        Upload an image to extract the text .
                    </motion.p>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 relative mt-4">
                    {/* Card: Upload / Preview Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-[#111] border border-[#222] rounded-2xl p-8 shadow-2xl backdrop-blur-sm flex flex-col min-h-[600px] lg:min-h-[750px]"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-gray-200">Upload Image</h2>

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
                            <div className="flex-1 flex flex-col relative group rounded-xl overflow-hidden border border-[#333] min-h-[300px]">
                                <img
                                    src={imagePreview}
                                    alt="Upload preview"
                                    className="w-full h-full object-contain bg-black/50 absolute inset-0"
                                />
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
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-[#111] border border-[#222] rounded-2xl p-8 shadow-2xl backdrop-blur-sm flex flex-col min-h-[600px] lg:min-h-[750px]"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-200">Output Text</h2>
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

                        <div className="flex-1 w-full bg-[#0a0a0a] border border-[#222] rounded-xl p-4 relative group transition-colors focus-within:border-blue-500/50 flex flex-col">

                            <div className="flex-1">
                                <textarea
                                    className="w-full h-full bg-transparent border-none outline-none resize-none text-gray-300 placeholder:text-gray-600 font-mono text-sm leading-relaxed"
                                    placeholder={isProcessing ? "AI is analyzing your image..." : "Extracted text will appear here..."}
                                    value={editedText}
                                    onChange={(e) => setEditedText(e.target.value)}
                                />
                            </div>



                        </div>

                        {editedText && (<button
                            onClick={async () => {

                                if (!imagePath) {
                                    toast.error("No image to save");
                                    return;
                                }

                                const formData = new FormData();
                                formData.append("image_path", imagePath);
                                formData.append("description", editedText);

                                try {

                                    const response = await fetch("http://127.0.0.1:8000/save-description", {
                                        method: "POST",
                                        body: formData
                                    });

                                    const data = await response.json();

                                    toast.success(data.message || "Saved successfully");

                                } catch (error) {

                                    toast.error("Database save failed");

                                }

                            }}
                            className={`mt-6 w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center relative overflow-hidden z-10 
                                ${(!selectedImage || isProcessing)
                                    ? "bg-[#222] text-gray-500 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"}`}
                        >
                            Save Description
                        </button>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default FinanceFlowOCR;
