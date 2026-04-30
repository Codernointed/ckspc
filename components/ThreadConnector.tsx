'use client';

interface ThreadConnectorProps {
  flip?: boolean;
}

const ThreadConnector = ({ flip = false }: ThreadConnectorProps) => {
  return (
    <div className="thread-connector" aria-hidden="true">
      <svg preserveAspectRatio="none" viewBox="0 0 1000 100">
        <path
          d={
            flip
              ? 'M 1000,0 C 850,100 150,0 0,100'
              : 'M 0,0 C 150,100 850,0 1000,100'
          }
        />
      </svg>
    </div>
  );
};

export default ThreadConnector;
