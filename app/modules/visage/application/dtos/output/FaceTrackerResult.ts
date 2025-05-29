interface FacePoint {
    x: number;
    y: number;
    z?: number;
    confidence?: number;
}

interface FaceLandmarkGroup {
    points: FacePoint[];
}

interface FacialExpression {
    name: string;
    confidence: number;
}

type TransformationMatrix = number[];

class FaceTrackerResult {
    public faces: FaceLandmarkGroup[];
    public expressions?: FacialExpression[][];
    public transformationMatrices?: TransformationMatrix[];
    public timestamps?: number[];

    constructor(
        faces: FaceLandmarkGroup[],
        expressions?: FacialExpression[][],
        transformationMatrices?: TransformationMatrix[],
        timestamps?: number[]
    ) {
        this.faces = faces;
        this.expressions = expressions;
        this.transformationMatrices = transformationMatrices;
        this.timestamps = timestamps;
    }     
}

export type { FacePoint, FaceLandmarkGroup, FacialExpression, TransformationMatrix }
export default FaceTrackerResult;
