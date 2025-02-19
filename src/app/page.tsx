import Image from "next/image";
import { MediaBuyerForm } from '@/components/form/media-buyer-form';

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-8">
      <div className="mb-12">
        <Image
          src="/c2f-logo.png"
          alt="Convert2Freedom Logo"
          width={280}
          height={56}
          priority
          className="drop-shadow-lg"
        />
      </div>
      <MediaBuyerForm key="media-buyer-form" />
    </div>
  );
}