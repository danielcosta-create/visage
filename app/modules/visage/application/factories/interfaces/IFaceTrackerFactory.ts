import type { IFaceTracker } from "@/app/modules/visage/application/gateways/interfaces/IFaceTracker";
import FaceTrackerOptions from "@/app/modules/visage/application/dtos/input/FaceTrackerOptions";

interface IFaceTrackerFactory {
    createFaceTracker: (faceTrackerOptions: FaceTrackerOptions) => Promise<IFaceTracker>;
}

export type { IFaceTrackerFactory };
