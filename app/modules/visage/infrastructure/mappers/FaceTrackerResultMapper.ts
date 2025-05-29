import FaceTrackerResult, {
    FacePoint,
    FacialExpression,
    TransformationMatrix
} from "@/app/modules/visage/application/dtos/output/FaceTrackerResult";

import {
    FaceLandmarkerResult,
    NormalizedLandmark,
    Classifications,
    Category,
    Matrix
} from "@mediapipe/tasks-vision";

class FaceTrackerResultMapper {
    static toLandmarkResult(
        result: FaceTrackerResult,
        imageWidth?: number,
        imageHeight?: number
    ): FaceLandmarkerResult {
        const faceLandmarks: NormalizedLandmark[][] = result.faces.map(group => {
            return group.points.map((point: FacePoint) => {
                const normalizedX = imageWidth ? point.x / imageWidth : point.x;
                const normalizedY = imageHeight ? point.y / imageHeight : point.y;
                const normalizedZ = point.z !== undefined
                    ? (imageWidth ? point.z / imageWidth : point.z)
                    : 0;

                return {
                    x: normalizedX,
                    y: normalizedY,
                    z: normalizedZ,
                    visibility: point.confidence ?? 1.0,
                };
            });
        });

        const faceBlendshapes: Classifications[] = (result.expressions ?? []).map(
            (expressions: FacialExpression[], index: number) => {
                const categories: Category[] = expressions.map((expr, catIndex) => ({
                    index: catIndex,
                    score: expr.confidence,
                    categoryName: expr.name,
                    displayName: expr.name,
                }));

                return {
                    categories,
                    headIndex: index,
                    headName: "default",
                };
            }
        );

        const facialTransformationMatrixes: Matrix[] = (result.transformationMatrices ?? []).map(
            (matrix: TransformationMatrix) => ({
                rows: 4,
                columns: 4,
                data: matrix,
            })
        );

        return {
            faceLandmarks,
            faceBlendshapes,
            facialTransformationMatrixes,
        };
    }
}

export default FaceTrackerResultMapper;
