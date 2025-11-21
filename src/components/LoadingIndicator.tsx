import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading-animation.json";

interface LoadingIndicatorProps {
  size?: number;
  message?: string;
}

export const LoadingIndicator = ({ 
  size = 150, 
  message = "লোড হচ্ছে..." 
}: LoadingIndicatorProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div style={{ width: size, height: size * 0.25 }}>
        <Lottie 
          animationData={loadingAnimation} 
          loop={true}
          autoplay={true}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice'
          }}
        />
      </div>
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};
