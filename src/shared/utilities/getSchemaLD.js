export default function getSchemaLD(lang, nonce, title, description, urls) {
  const baseUrl = "https://vorte.app";

  return `
<script type="application/ld+json" nonce="${nonce}">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "${baseUrl}${urls[lang]}#vorte",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${baseUrl}${urls[lang]}"
  },
  "name": "${title[lang]}",
  "alternateName": "${{
    fi: "Vorte ura-alusta",
    sv: "Vorte karriärplattform",
    en: "Vorte Career Platform"
  }[lang]}",
  "description": "${description[lang]}",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": [
    "AccountingSoftware","CRMSoftware","PointOfSaleSystem",
    "HumanResourcesSoftware","FinancialManagementSoftware",
    "MarketingAutomation","ManufacturingSoftware","ProjectManagementSoftware",
    "InventoryManagement","AnalyticsSoftware","PayrollManagement","TaxComplianceSoftware"
  ],
  "operatingSystem": "All",
  "browserRequirements": "${{
    fi: "JavaScript vaaditaan. Optimoitu moderneille selaimille.",
    sv: "JavaScript krävs. Optimerad för moderna webbläsare.",
    en: "JavaScript required. Optimized for modern browsers."
  }[lang]}",
  "url": "${baseUrl}${urls[lang]}",
  "installUrl": "${{
    fi: `${baseUrl}/fi/asenna`,
    sv: `${baseUrl}/sv/installera`,
    en: `${baseUrl}/en/install`
  }[lang]}",
  "screenshot": "${baseUrl}/images/screenshot.jpg",
  "softwareVersion": "1.0.0",
  "softwareHelp": "${{
    fi: `${baseUrl}/fi/tuki`,
    sv: `${baseUrl}/sv/support`,
    en: `${baseUrl}/en/help`
  }[lang]}",
  "inLanguage": ["fi","en","sv"],
  "isAccessibleForFree": true,
  "offersFreeTrial": true,
  "audience": {
    "@type": "Audience",
    "name": "${{
      fi: "Kaikille Suomessa asuville",
      sv: "Alla som bor i Finland",
      en: "All people living in Finland"
    }[lang]}",
    "geographicArea": {
      "@type": "Country",
      "name": "${{
        fi: "Suomi",
        sv: "Finland",
        en: "Finland"
      }[lang]}"
    }
  },
  "featureList": [
    "${{
      fi: "Automaattinen kirjanpito",
      sv: "Automatiserad bokföring",
      en: "Automated bookkeeping"
    }[lang]}",
    "${{
      fi: "Toistuva laskutus",
      sv: "Återkommande fakturering",
      en: "Recurring invoicing"
    }[lang]}",
    "${{
      fi: "Asiakassuhteiden hallinta (CRM)",
      sv: "Kundrelationshantering (CRM)",
      en: "Customer Relationship Management (CRM)"
    }[lang]}",
    "${{
      fi: "Suorat integraatiot suomalaisiin pankkeihin",
      sv: "Direkta integrationer med finska banker",
      en: "Direct integrations with Finnish banks"
    }[lang]}",
    "${{
      fi: "Turvallinen WebAuthn-kirjautuminen ilman salasanaa",
      sv: "Säker WebAuthn-inloggning utan lösenord",
      en: "Secure WebAuthn passwordless login"
    }[lang]}",
    "${{
      fi: "Offline-tilan tuki",
      sv: "Stöd för offline-läge",
      en: "Offline mode support"
    }[lang]}"
  ],
  "offers": [
    {
      "@type": "Offer",
      "name": "${{
        fi: "Oma Vorte",
        sv: "Min Vorte",
        en: "My Vorte"
      }[lang]}",
      "price": "0.00",
      "priceCurrency": "EUR",
      "eligibleCustomerType": "https://schema.org/Individual",
      "eligibleRegion": {
        "@type": "Country",
        "name": "${{
          fi: "Suomi",
          sv: "Finland",
          en: "Finland"
        }[lang]}"
      },
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "${{
        fi: "Vortepreneur mikroyrityksille",
        sv: "Vorte för mikroföretag",
        en: "Vortepreneur for micro businesses"
      }[lang]}",
      "price": "9.90",
      "priceCurrency": "EUR",
      "eligibleCustomerType": "https://schema.org/Organization",
      "eligibleRegion": {
        "@type": "Country",
        "name": "${{
          fi: "Suomi",
          sv: "Finland",
          en: "Finland"
        }[lang]}"
      },
      "availability": "https://schema.org/PreOrder"
    },
    {
      "@type": "Offer",
      "name": "${{
        fi: "Vortepreneur pienyrityksille",
        sv: "Vorte för småföretag",
        en: "Vortepreneur for small businesses"
      }[lang]}",
      "price": "49.90",
      "priceCurrency": "EUR",
      "eligibleCustomerType": "https://schema.org/Organization",
      "eligibleRegion": {
        "@type": "Country",
        "name": "${{
          fi: "Suomi",
          sv: "Finland",
          en: "Finland"
        }[lang]}"
      },
      "availability": "https://schema.org/PreOrder"
    },
    {
      "@type": "Offer",
      "name": "${{
        fi: "Vortepreneur keskisuurille yrityksille",
        sv: "Vorte för medelstora företag",
        en: "Vortepreneur for medium-sized businesses"
      }[lang]}",
      "price": "249.90",
      "priceCurrency": "EUR",
      "eligibleCustomerType": "https://schema.org/Organization",
      "eligibleRegion": {
        "@type": "Country",
        "name": "${{
          fi: "Suomi",
          sv: "Finland",
          en: "Finland"
        }[lang]}"
      },
      "availability": "https://schema.org/PreOrder"
    },
    {
      "@type": "Offer",
      "name": "${{
        fi: "Vortepreneur suurille yrityksille",
        sv: "Vorte för stora företag",
        en: "Vortepreneur for large businesses"
      }[lang]}",
      "priceSpecification": [
        {
          "@type": "UnitPriceSpecification",
          "price": "249.90",
          "priceCurrency": "EUR",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": "1",
            "unitText": "${{
              fi: "yritys",
              sv: "företag",
              en: "company"
            }[lang]}"
          }
        },
        {
          "@type": "UnitPriceSpecification",
          "price": "9.90",
          "priceCurrency": "EUR",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": "1",
            "unitText": "${{
              fi: "käyttäjä",
              sv: "användare",
              en: "user"
            }[lang]}"
          }
        }
      ],
      "eligibleCustomerType": "https://schema.org/Organization",
      "eligibleRegion": {
        "@type": "Country",
        "name": "${{
          fi: "Suomi",
          sv: "Finland",
          en: "Finland"
        }[lang]}"
      },
      "availability": "https://schema.org/PreOrder"
    }
  ],
  "author": {
    "@type": "Organization",
    "name": "J&J Commerce Oy",
    "url": "${baseUrl}${urls[lang]}/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "J&J Commerce Oy",
    "url": "${baseUrl}${urls[lang]}",
    "logo": {
      "@type": "ImageObject",
      "url": "https://assets.vorte.app/images/logo.png",
      "width": 500,
      "height": 500
    }
  }
}
</script>
`;
}
