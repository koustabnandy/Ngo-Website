import Image from 'next/image';
import SectionHeader from './section-header';

const WePledge = () => {
  const pledgeImages = [
    { src: '/Youth Pledge.jpg', alt: 'Youth Pledge' },
    { src: '/Road Safety Pledge.jpg', alt: 'Road Safety Pledge' },
    { src: '/Lifestyle for the Environment.jpg', alt: 'Lifestyle for the Environment' },
    { src: '/download5.jpg', alt: 'Pledge Image 5' },
    { src: '/download4.jpg', alt: 'Pledge Image 4' },
    { src: '/download3.jpg', alt: 'Pledge Image 3' },
    { src: '/download.jpg', alt: 'Pledge Image' },
    { src: '/download 2.jpg', alt: 'Pledge Image 2' },
    { src: '/download (2).jpg', alt: 'Pledge Image 2' },
    { src: '/download (1).jpg', alt: 'Pledge Image 1' },
  ];

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="WE PLEDGE"
          description="Our commitment to various social causes and initiatives"
        />
        
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pledgeImages.map((image, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-64"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-10 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-lg font-semibold">{image.alt}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WePledge;