import FaceTrackerResult from "@/app/modules/visage/application/dtos/output/FaceTrackerResult";

interface IFaceTracker {
    trackFacesInVideo: (video: HTMLVideoElement) => void;
    drawFaceTracker(video: HTMLVideoElement, canvas: HTMLCanvasElement, result: FaceTrackerResult): void;
    faceTrackerLoop(video: HTMLVideoElement, canvas: HTMLCanvasElement): void
}

export type { IFaceTracker };
