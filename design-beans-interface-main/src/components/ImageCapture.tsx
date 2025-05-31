
import React, { useRef, useState, useCallback } from 'react';
import { Camera, X, RotateCcw, Check } from 'lucide-react';

interface ImageCaptureProps {
  onImageCapture: (imageData: string) => void;
  onClose: () => void;
  isAnalyzing?: boolean;
}

const ImageCapture = ({ onImageCapture, onClose, isAnalyzing }: ImageCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1920 }, 
          height: { ideal: 1080 },
          facingMode: 'environment' // Use back camera on mobile
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      
      setStream(mediaStream);
      setCameraActive(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access camera. Please ensure camera permissions are granted.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setCameraActive(false);
    }
  }, [stream]);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  }, [stopCamera]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  const confirmImage = useCallback(() => {
    if (capturedImage) {
      onImageCapture(capturedImage);
    }
  }, [capturedImage, onImageCapture]);

  React.useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-black/50 text-white">
        <h3 className="text-lg font-semibold">Capture Test Strip</h3>
        <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full">
          <X size={24} />
        </button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative overflow-hidden">
        {!capturedImage ? (
          <>
            <video 
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />
            
            {/* Overlay guide */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-2 border-amber-400 rounded-lg w-80 h-20 bg-transparent">
                <div className="absolute -top-6 left-0 text-amber-400 text-sm font-medium">
                  Align test strip here
                </div>
              </div>
            </div>
            
            {/* Capture button */}
            {cameraActive && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={captureImage}
                  disabled={isAnalyzing}
                  className="w-16 h-16 bg-white rounded-full border-4 border-amber-400 hover:bg-amber-50 transition-colors disabled:opacity-50"
                >
                  <Camera size={24} className="mx-auto text-stone-600" />
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <img 
              src={capturedImage} 
              alt="Captured test strip" 
              className="w-full h-full object-cover"
            />
            
            {/* Action buttons */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button
                onClick={retakePhoto}
                className="flex items-center gap-2 px-6 py-3 bg-stone-600 text-white rounded-lg hover:bg-stone-700 transition-colors"
              >
                <RotateCcw size={20} />
                Retake
              </button>
              <button
                onClick={confirmImage}
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
              >
                <Check size={20} />
                {isAnalyzing ? 'Analyzing...' : 'Use Photo'}
              </button>
            </div>
          </>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ImageCapture;
