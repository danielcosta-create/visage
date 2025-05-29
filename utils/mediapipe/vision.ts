import { FilesetResolver } from "@mediapipe/tasks-vision";

const loadMediaPipeVisionTasks = async () => {
    if (!process.env.NEXT_PUBLIC_MEDIAPIPE_TASKS_VISION) {
        throw new Error("Method not implemented.");
    }

    return await FilesetResolver.forVisionTasks(process.env.NEXT_PUBLIC_MEDIAPIPE_TASKS_VISION);
};

const vision = await loadMediaPipeVisionTasks();

type VisionFileSet = typeof vision;

export type { VisionFileSet };
export default vision;
