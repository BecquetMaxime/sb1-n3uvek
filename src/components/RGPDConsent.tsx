import React from 'react';
import { Shield } from 'lucide-react';

export default function RGPDConsent({ onAccept }) {
  const [consents, setConsents] = React.useState({
    marketing: false,
    analytics: false,
    terms: false,
    privacy: false
  });

  const handleChange = (field: string) => {
    setConsents(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (consents.terms && consents.privacy) {
      onAccept(consents);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full mx-4">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-rose-500" />
          <h2 className="text-2xl font-serif italic">Protection de vos données</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={consents.terms}
                onChange={() => handleChange('terms')}
                className="mt-1"
                required
              />
              <label htmlFor="terms" className="text-sm">
                J'accepte les <a href="/legal" className="text-rose-500 hover:underline">conditions générales d'utilisation</a> *
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="privacy"
                checked={consents.privacy}
                onChange={() => handleChange('privacy')}
                className="mt-1"
                required
              />
              <label htmlFor="privacy" className="text-sm">
                J'accepte la <a href="/legal" className="text-rose-500 hover:underline">politique de confidentialité</a> *
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="marketing"
                checked={consents.marketing}
                onChange={() => handleChange('marketing')}
                className="mt-1"
              />
              <label htmlFor="marketing" className="text-sm">
                J'accepte de recevoir des offres promotionnelles par email
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="analytics"
                checked={consents.analytics}
                onChange={() => handleChange('analytics')}
                className="mt-1"
              />
              <label htmlFor="analytics" className="text-sm">
                J'accepte l'utilisation de cookies analytiques pour améliorer le service
              </label>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            * Champs obligatoires
          </p>

          <button
            type="submit"
            disabled={!consents.terms || !consents.privacy}
            className="w-full bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmer mes choix
          </button>
        </form>
      </div>
    </div>
  );
}