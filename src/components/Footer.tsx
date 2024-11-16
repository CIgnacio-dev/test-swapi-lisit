import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="p-4 bg-gray-800 text-center text-white mt-8">
      <p>
        Desarrollado por <strong>Carlos Roa</strong> © {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
