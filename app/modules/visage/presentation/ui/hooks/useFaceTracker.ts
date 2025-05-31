import { useRef, useState } from "react";
import { IFaceTracker } from "@/app/modules/visage/application/gateways/interfaces/IFaceTracker";
import MediaPipeFaceTrackerFactory from "@/app/modules/visage/infrastructure/factories/MediaPipeFaceTrackerFactory";
import vision from "@/utils/mediapipe/vision";
import NativeCameraService from "@/app/modules/visage/infrastructure/services/NativeCameraService";
import StartFaceTrackingUseCase from "@/app/modules/visage/application/use-cases/StartFaceTrackingUseCase";

const FaceTrackerDIContainer = () => {
    const faceTrackerFactory = new MediaPipeFaceTrackerFactory(vision);
    const cameraService = new NativeCameraService();
    const startFaceTrackingUseCase = new StartFaceTrackingUseCase(faceTrackerFactory, cameraService);

    return { 
        faceTrackerFactory,
        cameraService,
        startFaceTrackingUseCase
    }
};

const useFaceTracker = () => {
    const [isTracking, setIsTracking] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const faceTrackerRef = useRef<IFaceTracker>(null);

    const initialize = async () => {
        const { startFaceTrackingUseCase } = FaceTrackerDIContainer();

        if (!videoRef.current || !canvasRef.current) {
            throw new Error('Method not implemented.');
        }
        
        const faceTracker = await startFaceTrackingUseCase.execute(videoRef.current, canvasRef.current);
        faceTrackerRef.current = faceTracker;
        setIsTracking(true);
    }

    return {
        videoRef,
        canvasRef,
        faceTrackerRef,
        initialize,
        isTracking
    }
}

export default useFaceTracker;
