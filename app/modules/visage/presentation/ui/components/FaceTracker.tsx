"use client"
import React from "react";
import useFaceTracker from "@/app/modules/visage/presentation/ui/hooks/useFaceTracker";

const FaceTracker = () => {
    const { videoRef, canvasRef } = useFaceTracker();

    return (
        <>
            <video ref={videoRef} playsInline autoPlay muted className="" />
            <canvas ref={canvasRef}></canvas>
        </>
    );
};

export default FaceTracker;
