'use client';

const OrganicElements = () => {
  return (
    <>
      <div
        className="organic-blob organic-blob--primary"
        style={{ width: '600px', height: '600px', top: '-200px', left: '-200px' }}
      />
      <div
        className="organic-blob organic-blob--secondary"
        style={{ width: '500px', height: '500px', top: '40%', right: '-150px' }}
      />
      <svg
        className="organic-thread"
        style={{ top: 0, left: 0, width: '100%', height: '2000px' }}
        viewBox="0 0 1440 2000"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M-50 150 C 300 200, 800 50, 1500 400"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="10 10"
          style={{ color: 'var(--outline-variant)' }}
        />
        <path
          d="M1500 800 C 1000 1200, 400 900, -50 1400"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="10 10"
          style={{ color: 'var(--outline-variant)' }}
        />
      </svg>
    </>
  );
};

export default OrganicElements;
