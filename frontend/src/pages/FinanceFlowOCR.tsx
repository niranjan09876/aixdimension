import React, { useState, useRef, useCallback, useEffect } from "react";
import { Upload, Image as ImageIcon, Loader2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const FinanceFlowOCR = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [extractedText, setExtractedText] = useState<string>("");
    const [imagePath, setImagePath] = useState<string | null>(null);
    const [editedText, setEditedText] = useState<string>("");
    const [files, setFiles] = useState<File[]>([]);
    const [outputText, setOutputText] = useState<string>("");
    const fileRef = useRef<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            setFiles(droppedFiles);
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        setFiles(selectedFiles);
    };

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file as any));
        };
    }, [files]);

    const handleUpload = async () => {
        if (!files.length) return;

        const formData = new FormData();

        files.forEach((file) => {
            formData.append("files", file);
        });

        try {
            setIsProcessing(true);
            const response = await fetch("http://127.0.0.1:8000/extract-text", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("OCR processing failed");
            }

            const data = await response.json();

            setOutputText(data.extracted_text);

            // Sync with existing state
            setExtractedText(data.extracted_text);
            setEditedText(data.extracted_text);
            if (data.image_path) setImagePath(data.image_path);

            toast.success("Text extracted successfully!");

        } catch (error) {
            console.error("Error:", error);
            toast.error("OCR processing error");
        } finally {
            setIsProcessing(false);
        }
    };

    const processImage = async () => {
        handleUpload();
    };

    return (
        <div className="h-screen overflow-hidden bg-black text-white relative flex flex-col items-center py-8 px-4 selection:bg-primary/30">
            <style>{`body { overflow: hidden; }`}</style>
            {/* Background gradients aligned with portfolio style */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

            {/* Back button */}
            <div className="w-full max-w-[1400px] mb-4 z-10">
                <Link
                    to="/"
                    className="inline-flex items-center text-white/70 hover:text-white transition-colors duration-200 group relative overflow-hidden px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 glass-card"
                >
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-1 flex flex-col items-center justify-center w-full max-w-[1400px] z-10"
            >
                <div className="text-center mb-4">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold mb-2 tracking-tight"
                    >
                        Summarizer Flow Tool <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"></span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-400 max-w-xl mx-auto text-base"
                    >
                        Upload an image to extract the text .
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full max-h-[70vh] w-full relative">
                    {/* Card: Upload / Preview Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-[#111] border border-[#222] rounded-2xl p-6 shadow-2xl backdrop-blur-sm h-full flex flex-col"
                    >
                        <h2 className="text-xl font-semibold mb-2 text-gray-200">Upload Image</h2>

                        {files.length === 0 ? (
                            <div
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 overflow-auto flex flex-col items-center justify-center border-2 border-dashed border-[#333] hover:border-blue-500/50 rounded-xl p-6 cursor-pointer transition-colors duration-300 bg-white/5 group"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*,application/pdf"
                                    multiple
                                    onChange={handleFileChange}
                                />
                                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Upload className="text-blue-400" size={32} />
                                </div>
                                <p className="font-medium text-gray-300 text-center mb-2">Click or drag image to upload</p>
                                <span className="text-xs text-gray-500">Supports JPG, JPEG, PNG, PDF</span>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-auto flex flex-col relative group rounded-xl border border-[#333] p-4">
                                <div className="flex justify-between items-center z-10 sticky top-0 bg-[#111]/80 backdrop-blur-md pb-2 mb-2 border-b border-[#333]">
                                    <span className="text-gray-300 text-sm font-medium">{files.length} file(s) selected</span>
                                    <button
                                        onClick={() => {
                                            setFiles([]);
                                            setExtractedText("");
                                        }}
                                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs border border-white/20 transition-colors"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-2 h-full content-start">
                                    {files.map((file, index) => {

                                        const isImage = file.type.startsWith("image");
                                        const isPDF = file.type === "application/pdf";

                                        return (
                                            <div key={index} className="w-32 h-32 bg-black rounded-lg overflow-hidden flex items-center justify-center border border-gray-700">

                                                {isImage && (
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt="preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}

                                                {isPDF && (
                                                    <div className="text-white text-xs text-center p-2">
                                                        📄 PDF
                                                        <br />
                                                        {file.name}
                                                    </div>
                                                )}

                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleUpload}
                            disabled={files.length === 0 || isProcessing}
                            className={`mt-6 w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center relative overflow-hidden z-10 
                ${(files.length === 0 || isProcessing)
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
                        className="bg-[#111] border border-[#222] rounded-2xl p-6 shadow-2xl backdrop-blur-sm h-full flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-2">
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

                        <div className="flex-1 overflow-auto w-full bg-[#0a0a0a] border border-[#222] rounded-xl p-4 relative group transition-colors focus-within:border-blue-500/50 flex flex-col">

                            <div className="flex-1">
                                <textarea
                                    value={outputText}
                                    readOnly
                                    className="w-full h-full bg-transparent outline-none resize-none text-gray-300 placeholder:text-gray-600 font-mono text-sm leading-relaxed"
                                    placeholder={isProcessing ? "AI is analyzing your image..." : "Extracted text will appear here..."}
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
                                ${(files.length === 0 || isProcessing)
                                    ? "bg-[#222] text-gray-500 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"}`}
                        >
                            Save
                        </button>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default FinanceFlowOCR;
