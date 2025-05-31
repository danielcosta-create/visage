"use client"
import React from "react";
import useFaceTracker from "@/app/modules/visage/presentation/ui/hooks/useFaceTracker";

const FaceTracker = () => {
    const { 
        isTracking, 
        videoRef, 
        canvasRef, 
        initialize 
    } = useFaceTracker();

    return (
        <div className="flex justify-center items-center flex-col h-screen gap-4">
            <video ref={videoRef} muted className="opacity-0" />
            <canvas 
                ref={canvasRef}
                className={isTracking ? "block" : "opacity-0"}
            ></canvas>
            <button 
                onClick={initialize} 
                className="bg-black text-white rounded-3xl px-4 py-2 hover:bg-gray-800"
            >
                Começar
            </button>
        </div>
    );
};

export default FaceTracker;
