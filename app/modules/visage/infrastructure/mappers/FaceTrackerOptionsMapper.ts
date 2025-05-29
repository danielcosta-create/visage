import FaceTrackerOptions from "@/app/modules/visage/application/dtos/input/FaceTrackerOptions";
import { FaceLandmarkerOptions } from "@mediapipe/tasks-vision";

class FaceTrackerOptionsMapper {
    static toFaceLandmarkerOptions(options: FaceTrackerOptions): FaceLandmarkerOptions {
        return {
            baseOptions: {
                modelAssetPath: options.modelPath,
                delegate: options.delegate
            },
            numFaces: options.maxFaces,
            outputFaceBlendshapes: options.enableBlendshapes,
            outputFacialTransformationMatrixes: options.enableTransformationMatrix,
            runningMode: options.runningMode
        };
    }
}

export default FaceTrackerOptionsMapper;
