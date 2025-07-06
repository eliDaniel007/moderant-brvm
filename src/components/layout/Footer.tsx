import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = [
  {
    title: 'Produits',
    links: [
      { name: 'Analyses', path: '/analysis' },
      { name: 'Abonnements', path: '/subscription' },
      { name: 'API', path: '/api' },
      { name: 'Portefeuille', path: '/dashboard' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { name: 'Documentation', path: '/docs' },
      { name: 'Blog', path: '/blog' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Support', path: '/support' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { name: 'À propos', path: '/about' },
      { name: 'Carrières', path: '/careers' },
      { name: 'Contact', path: '/contact' },
      { name: 'Mentions légales', path: '/legal' },
    ],
  },
];

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.92c-.8.36-1.67.6-2.58.71a4.48 4.48 0 001.97-2.48 8.94 8.94 0 01-2.83 1.08A4.48 4.48 0 0016.11 4c-2.48 0-4.5 2.02-4.5 4.5 0 .35.04.7.11 1.03C7.69 9.36 4.07 7.6 1.64 4.9c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.95 3.65-.72-.02-1.4-.22-1.99-.55v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.7 2.16 2.94 4.07 2.97A9.02 9.02 0 012 19.54a12.77 12.77 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.41-.01-.61.88-.64 1.64-1.44 2.24-2.35z" /></svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" /></svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.326v-21.349c0-.734-.593-1.326-1.326-1.326z" /></svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://telegram.org/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.93 8.29l-1.6 7.56c-.12.54-.44.67-.89.42l-2.46-1.81-1.19 1.15c-.13.13-.24.24-.49.24l.18-2.52 4.59-4.14c.2-.18-.04-.28-.31-.1l-5.67 3.57-2.44-.76c-.53-.16-.54-.53.11-.78l9.53-3.68c.44-.16.82.1.68.77z" /></svg>
    ),
  },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-dark-950/90 backdrop-blur border-t border-white/5 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-wrap gap-8 md:gap-0 md:flex-nowrap justify-between mb-8">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-blue-500 bg-clip-text text-transparent mb-2">MODERANT BRVM</h2>
            <p className="text-slate-400 mb-4 max-w-xs">
              Plateforme d'analyse et de suivi des marchés financiers pour la Bourse Régionale des Valeurs Mobilières.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-800 hover:bg-primary-600 text-primary-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title} className="w-1/2 sm:w-1/3 md:w-1/6 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2 text-slate-200">{section.title}</h3>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-2">
          <span>© {currentYear} MODERANT BRVM. Tous droits réservés.</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary-400 transition-colors">Confidentialité</Link>
            <Link to="/terms" className="hover:text-primary-400 transition-colors">Conditions d'utilisation</Link>
            <Link to="/cookies" className="hover:text-primary-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 