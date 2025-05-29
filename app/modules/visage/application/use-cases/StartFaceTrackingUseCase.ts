import { IFaceTrackerFactory } from "@/app/modules/visage/application/factories/interfaces/IFaceTrackerFactory";
import { ICameraService } from "@/app/modules/visage/application/services/interfaces/ICameraService";
import { IFaceTracker } from "../gateways/interfaces/IFaceTracker";

class StartFaceTrackingUseCase {
    private readonly _faceTrackerFactory: IFaceTrackerFactory;
    private readonly _cameraService: ICameraService;

    constructor(faceTrackerFactory: IFaceTrackerFactory, cameraService: ICameraService) {
        this._faceTrackerFactory = faceTrackerFactory;
        this._cameraService = cameraService;
    }

    async execute(video: HTMLVideoElement, canvas: HTMLCanvasElement): Promise<IFaceTracker> {
        const faceTracker = await this._faceTrackerFactory.createFaceTracker({
            modelPath: '/models/face_landmarker.task',
            maxFaces: 1,
            enableBlendshapes: false,
            enableTransformationMatrix: false,
            delegate: 'GPU',
            runningMode: 'VIDEO'
        });

        await this._cameraService.initializeCamera(video);
        faceTracker.faceTrackerLoop(video, canvas);
        return faceTracker;
    }
}

export default StartFaceTrackingUseCase;
