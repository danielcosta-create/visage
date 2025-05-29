interface ICameraService {
    initializeCamera: (video: HTMLVideoElement | null) => Promise<void>;
}

export type { ICameraService }
