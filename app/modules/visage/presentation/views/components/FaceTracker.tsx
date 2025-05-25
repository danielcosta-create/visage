"use client"
import React, { useEffect, useCallback, useRef, RefObject } from "react";
import { FilesetResolver, FaceLandmarker, FaceLandmarkerOptions, DrawingUtils, FaceLandmarkerResult } from "@mediapipe/tasks-vision";

const FaceTracker = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const landmarkerRef = useRef<FaceLandmarker>(null);
    const lastVideoTimeRef = useRef<number>(null);
    const isCapturingRef = useRef<boolean>(null);

    const initializeCamera = async (video: RefObject<HTMLVideoElement | null>): Promise<void> => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (!video.current) {
            throw new Error('Vídeo indisponível');
        }
        video.current.srcObject = stream;
        await video.current.play();
    };

    const createFaceLandmarker = async (options: FaceLandmarkerOptions): Promise<FaceLandmarker> => {
        const vision = await FilesetResolver.forVisionTasks(process.env.NEXT_PUBLIC_MEDIAPIPE_TASKS_VISION);
        return await FaceLandmarker.createFromOptions(vision, options);
    }

    const detectForVideo = useCallback((faceLandmarker: RefObject<FaceLandmarker | null>, video: RefObject<HTMLVideoElement | null>, canvas: RefObject<HTMLCanvasElement | null>): void => {
        if (!faceLandmarker.current) {
            throw new Error('Face Landmarker indisponível.');
        }
        
        if (!video.current) {
            throw new Error('Vídeo indisponível.');
        }

        if (isCapturingRef.current) {
            console.info("Pausou!");
            return;
        }

        const result = faceLandmarker.current.detectForVideo(video.current, performance.now());
        lastVideoTimeRef.current = video.current.currentTime;
        drawLandmarks(video, canvas, result);

        requestAnimationFrame(() =>  detectForVideo(faceLandmarker, video, canvas));
    }, []);

    const drawLandmarks = (video: RefObject<HTMLVideoElement | null>, canvas: RefObject<HTMLCanvasElement | null>, result: FaceLandmarkerResult) => {
        if (!video.current) {
            throw new Error('Vídeo indisponível.');
        }
        
        if (!canvas.current) {
            throw new Error('Canvas indisponível.');
        }

        canvas.current.width = video.current.videoWidth;
        canvas.current.height = video.current.videoHeight;
        
        const ctx = canvas.current.getContext('2d');

        if(!ctx) {
            throw new Error('Contexto indisponível.');
        }

        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
        ctx.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height);

        const drawingUtils = new DrawingUtils(ctx);
        const landmarks = result.faceLandmarks[0];
        drawingUtils.drawLandmarks(landmarks, {
            color: "cadetblue",
            lineWidth: 0.5,
            radius: 1.5
        });
    };

    const captureImage = (canvas: RefObject<HTMLCanvasElement | null>): void => {
        if (!canvas.current) {
            throw new Error('Canvas indisponível.');
        }

        isCapturingRef.current = true;
    };

    const resetImage = (faceLandmarker: RefObject<FaceLandmarker | null>, video: RefObject<HTMLVideoElement | null>, canvas: RefObject<HTMLCanvasElement | null>): void => {
        if (!faceLandmarker.current) {
            throw new Error('Captura facial indisponível.');
        }

        if (!video.current) {
            throw new Error('Vídeo indisponível.');
        }
        
        if (!canvas.current) {
            throw new Error('Canvas indisponível.');
        }

        isCapturingRef.current = false;
        detectForVideo(faceLandmarker, video, canvas);
    }

    const initialize = useCallback(async () => {
        await initializeCamera(videoRef);
        landmarkerRef.current = await createFaceLandmarker({
            baseOptions: {
                modelAssetPath: "/models/face_landmarker.task",
                delegate: "CPU"
            },
            runningMode: 'VIDEO',
            numFaces: 1
        });
        detectForVideo(landmarkerRef, videoRef, canvasRef);
    }, [detectForVideo]);

    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <>
            <video ref={videoRef} playsInline autoPlay muted className="hidden" />
            <canvas ref={canvasRef} ></canvas>

            <div>
                <button onClick={() => resetImage(landmarkerRef, videoRef, canvasRef)}>
                    Tirar outra imagem
                </button>
                <button onClick={() => captureImage(canvasRef)}>
                    Tirar foto
                </button>
            </div> 
        </>
    );
};

export default FaceTracker;
