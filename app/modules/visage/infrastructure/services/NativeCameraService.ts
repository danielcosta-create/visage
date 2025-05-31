import { ICameraService } from "@/app/modules/visage/application/services/interfaces/ICameraService";

class NativeCameraService implements ICameraService {
    async initializeCamera(video: HTMLVideoElement | null): Promise<void> {
        if (!video) {
            throw new Error('Method not implemented.');
        }
        
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'user'
            }
        });
        
        video.srcObject = stream;
        await video.play();
    };
}

export default NativeCameraService;
