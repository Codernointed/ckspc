'use client';

const IMAGES = [
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523803326055-9729b9e02e5a?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
];

const GalleryStrip = () => {
  const doubled = [...IMAGES, ...IMAGES];

  return (
    <section className="gallery-strip" aria-label="Photo gallery">
      <div className="gallery-strip-track">
        {doubled.map((src, i) => (
          <div
            key={i}
            className="gallery-strip-item"
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
    </section>
  );
};

export default GalleryStrip;
