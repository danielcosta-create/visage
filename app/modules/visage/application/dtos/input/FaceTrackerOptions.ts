type Delegate = "CPU" | "GPU";
type RunningMode = "VIDEO" | "IMAGE";

class FaceTrackerOptions {
    modelPath: string;
    maxFaces: number;
    enableBlendshapes: boolean;
    enableTransformationMatrix: boolean;
    delegate: Delegate;
    runningMode: RunningMode;

    constructor({
        modelPath,
        maxFaces = 1,
        enableBlendshapes = false,
        enableTransformationMatrix = false,
        delegate = "GPU",
        runningMode = "VIDEO"
    }: {
        modelPath: string;
        maxFaces?: number;
        enableBlendshapes?: boolean;
        enableTransformationMatrix?: boolean;
        delegate?: Delegate;
        runningMode: "VIDEO";
    }) {
        this.modelPath = modelPath;
        this.maxFaces = maxFaces;
        this.enableBlendshapes = enableBlendshapes;
        this.enableTransformationMatrix = enableTransformationMatrix;
        this.delegate = delegate;
        this.runningMode = runningMode;
    }
}

export type { Delegate, RunningMode }
export default FaceTrackerOptions;
