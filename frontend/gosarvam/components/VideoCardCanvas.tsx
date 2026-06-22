'use client';

interface Props {
  videoSrc?: string;
  imgSrc: string;
}

export default function VideoCardCanvas({ videoSrc, imgSrc }: Props) {
  if (videoSrc) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        src={videoSrc}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />
    );
  }

  return (
    <img
      src={imgSrc}
      alt=""
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        objectFit: 'cover',
        zIndex: 1,
      }}
    />
  );
}
