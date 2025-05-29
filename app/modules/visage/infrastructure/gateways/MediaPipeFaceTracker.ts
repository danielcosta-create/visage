import { FaceLandmarker, DrawingUtils } from "@mediapipe/tasks-vision";
import type { IFaceTracker } from "@/app/modules/visage/application/gateways/interfaces/IFaceTracker";
import FaceTrackerResult from "@/app/modules/visage/application/dtos/output/FaceTrackerResult";
import FaceLandmarkResultMapper from "@/app/modules/visage/infrastructure/mappers/FaceLandmarkResultMapper";
import FaceTrackerResultMapper from "@/app/modules/visage/infrastructure/mappers/FaceTrackerResultMapper";

class MediaPipeFaceTracker implements IFaceTracker {
    private readonly _faceLandmarker: FaceLandmarker;

    constructor(faceLandmarker: FaceLandmarker) {
        this._faceLandmarker = faceLandmarker;
    }

    trackFacesInVideo(video: HTMLVideoElement): FaceTrackerResult {
        const result = this._faceLandmarker.detectForVideo(video, performance.now());
        return FaceLandmarkResultMapper.toFaceTrackerResult(result);
    }

    drawFaceTracker(video: HTMLVideoElement, canvas: HTMLCanvasElement, result: FaceTrackerResult): void {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Method not implemented.');
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const drawingUtils = new DrawingUtils(ctx);
        const faceLandmarkResult = FaceTrackerResultMapper.toLandmarkResult(result);
        const landmarks = faceLandmarkResult.faceLandmarks[0];
        drawingUtils.drawLandmarks(landmarks, {
            color: "cadetblue",
            lineWidth: 0.5,
            radius: 1.5
        });
    }

    faceTrackerLoop(video: HTMLVideoElement, canvas: HTMLCanvasElement): void {
        const result = this.trackFacesInVideo(video);
        this.drawFaceTracker(video, canvas, result);

        requestAnimationFrame(() => {
            this.faceTrackerLoop(video, canvas);
        });
    }
}

export default MediaPipeFaceTracker;
