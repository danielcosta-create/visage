import { FaceLandmarker } from "@mediapipe/tasks-vision";
import type { IFaceTracker } from "@/app/modules/visage/application/gateways/interfaces/IFaceTracker";
import type { IFaceTrackerFactory } from "@/app/modules/visage/application/factories/interfaces/IFaceTrackerFactory";
import FaceTrackerOptions from "@/app/modules/visage/application/dtos/input/FaceTrackerOptions";
import MediaPipeFraceTracker from "@/app/modules/visage/infrastructure/gateways/MediaPipeFaceTracker";
import FaceTrackerOptionsMapper from "@/app/modules/visage/infrastructure/mappers/FaceTrackerOptionsMapper";
import type { VisionFileSet } from "@/utils/mediapipe/vision";

class MediaPipeFaceTrackerFactory implements IFaceTrackerFactory {
    private readonly _vision: VisionFileSet;

    constructor(vision: VisionFileSet) {
        this._vision = vision;
    }

    async createFaceTracker(faceTrackerOptions: FaceTrackerOptions): Promise<IFaceTracker> {
        const faceLandmarkerOptions = FaceTrackerOptionsMapper.toFaceLandmarkerOptions(faceTrackerOptions);
        const faceLandmarker = await FaceLandmarker.createFromOptions(this._vision, faceLandmarkerOptions);
        return new MediaPipeFraceTracker(faceLandmarker);
    }
}

export default MediaPipeFaceTrackerFactory;
