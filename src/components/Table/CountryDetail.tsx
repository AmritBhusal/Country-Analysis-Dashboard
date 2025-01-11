'use client';
import { FC, useEffect } from 'react';
import { X } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRY_DETAILS } from '@/graphql/countryQueries';
import './CountryDetail.css'

interface CountryDetailProps {
  countryCode: string;
  onClose: () => void;
  isOpen: boolean;
}

const CountryDetail: FC<CountryDetailProps> = ({ countryCode, onClose, isOpen }) => {
  const { loading, error, data } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { code: countryCode },
    skip: !countryCode,
  });

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="country-detail-overlay" onClick={onClose} />
      <div className="country-detail-modal">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>

        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}

        {error && (
          <div className="error-message">
            Error loading country details. Please try again.
          </div>
        )}

        {data?.country && (
          <div className="country-content">
            <div className="country-header">
              <h2>{data.country.emoji} {data.country.name}</h2>
              <span className="country-code">{data.country.code}</span>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <h3>Capital</h3>
                <p>{data.country.capital || 'N/A'}</p>
              </div>

              <div className="info-item">
                <h3>Currency</h3>
                <p>{data.country.currency || 'N/A'}</p>
              </div>

              <div className="info-item">
                <h3>Continent</h3>
                <p>{data.country.continent.name}</p>
              </div>

              <div className="info-item">
                <h3>Phone Code</h3>
                <p>+{data.country.phone}</p>
              </div>

              <div className="info-item full-width">
                <h3>Languages</h3>
                <div className="language-grid">
                  {data.country.languages.map((lang: any) => (
                    <div key={lang.name} className="language-item">
                      <span className="language-name">{lang.name}</span>
                      <span className="language-native">{lang.native}</span>
                    </div>
                  ))}
                </div>
              </div>

              {data.country.states.length > 0 && (
                <div className="info-item full-width">
                  <h3>States/Provinces</h3>
                  <div className="states-grid">
                    {data.country.states.map((state: any) => (
                      <span key={state.name} className="state-item">
                        {state.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CountryDetail;