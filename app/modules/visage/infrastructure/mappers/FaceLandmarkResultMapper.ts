import FaceTrackerResult, {
    FaceLandmarkGroup,
    FacePoint,
    FacialExpression,
    TransformationMatrix
} from "@/app/modules/visage/application/dtos/output/FaceTrackerResult";

import {
    FaceLandmarkerResult,
    NormalizedLandmark,
    Classifications,
    Matrix
} from "@mediapipe/tasks-vision";

class FaceLandmarkResultMapper {
    static toFaceTrackerResult(result: FaceLandmarkerResult): FaceTrackerResult {
        const faces: FaceLandmarkGroup[] = result.faceLandmarks.map((landmarkGroup: NormalizedLandmark[]) => {
            const points: FacePoint[] = landmarkGroup.map((landmark: NormalizedLandmark) => ({
                x: landmark.x,
                y: landmark.y,
                z: landmark.z,
                confidence: landmark.visibility ?? 1.0
            }));

            return { points };
        });

        const expressions: FacialExpression[][] | undefined = result.faceBlendshapes?.map(
            (classification: Classifications) =>
                classification.categories.map(category => ({
                    name: category.categoryName,
                    confidence: category.score
                }))
        );

        const transformationMatrices: TransformationMatrix[] | undefined =
            result.facialTransformationMatrixes?.map((matrix: Matrix) => matrix.data);

        return new FaceTrackerResult(faces, expressions, transformationMatrices);
    }
}

export default FaceLandmarkResultMapper;
