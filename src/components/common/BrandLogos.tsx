import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const LinkedInLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#0A66C2" />
    <path
      d="M6.94 8.78H4.14V17.8H6.94V8.78ZM5.54 5C4.64 5 3.91 5.73 3.91 6.63C3.91 7.53 4.64 8.26 5.54 8.26C6.44 8.26 7.17 7.53 7.17 6.63C7.17 5.73 6.44 5 5.54 5ZM19.86 12.87C19.86 9.87 18.26 8.48 16.12 8.48C14.4 8.48 13.62 9.43 13.19 10.1V8.78H10.39C10.43 9.56 10.39 17.8 10.39 17.8H13.19V12.76C13.19 12.49 13.21 12.22 13.29 12.03C13.51 11.49 14 10.92 14.83 10.92C15.93 10.92 16.37 11.76 16.37 12.99V17.8H19.17V12.76L19.86 12.87Z"
      fill="white"
    />
  </svg>
);

export const IndeedLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#2164F3" />
    <path
      d="M13.6 5.2C12.4 4.5 11.2 4.5 10.1 5.2C8.9 5.9 8.2 7.1 8.2 8.5V18.8H10.8V13.8C10.8 12.5 11.5 11.6 12.6 11.6C13.7 11.6 14.3 12.4 14.3 13.8V18.8H16.9V13.1C16.9 10.8 15.6 9.4 13.6 9.4C12.3 9.4 11.4 10 10.8 10.9V5.2C10.8 5.2 13.6 5.2 13.6 5.2Z"
      fill="white"
    />
    <circle cx="10.8" cy="3.5" r="1.3" fill="white" />
  </svg>
);

export const ZipRecruiterLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#1C7E4A" />
    <path d="M6 18L13.5 6H18L10.5 18H6ZM10 18L17.5 6H18.5L11 18H10Z" fill="white" />
    <path d="M12 9L15 14H9L12 9Z" fill="#A7F3D0" />
  </svg>
);

export const JobBankLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#E11D48" />
    <path d="M12 5L13.5 9H17.5L14.5 11.5L15.5 15.5L12 13L8.5 15.5L9.5 11.5L6.5 9H10.5L12 5Z" fill="white" />
    <path d="M5 19H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const WordPressLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#21759B" />
    <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="1.5" />
    <path d="M7 9L10 16L12 11L14 16L17 9" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GoogleWorkspaceLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
    <path d="M6 7L12 11.5L18 7V17H6V7Z" fill="#EA4335" />
    <path d="M12 11.5L6 7V17H12V11.5Z" fill="#4285F4" />
    <path d="M12 11.5L18 7V17H12V11.5Z" fill="#34A853" />
    <path d="M18 7H6L12 11.5L18 7Z" fill="#FBBC05" />
  </svg>
);

export const PowerAutomateLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#0066FF" />
    <path d="M7 16L12 7L17 16H12.5L12 12.5L10 16H7Z" fill="white" />
    <path d="M12 12.5L14.5 16H9.5L12 12.5Z" fill="#80B3FF" />
  </svg>
);

export const VidCruiterLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#6B21A8" />
    <circle cx="12" cy="12" r="6" stroke="#C084FC" strokeWidth="1.5" />
    <path d="M10.5 9.5L15 12L10.5 14.5V9.5Z" fill="white" />
  </svg>
);

export const CalendlyLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#006BFF" />
    <circle cx="12" cy="12" r="6.5" stroke="white" strokeWidth="1.8" />
    <path d="M12 8.5C10 8.5 9 10 9 12C9 14 10 15.5 12 15.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const SmartsheetLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#0D2F81" />
    <rect x="6" y="6" width="5" height="5" rx="1" fill="#36B37E" />
    <rect x="13" y="6" width="5" height="5" rx="1" fill="#00B8D9" />
    <rect x="6" y="13" width="5" height="5" rx="1" fill="#FFAB00" />
    <rect x="13" y="13" width="5" height="5" rx="1" fill="#6554C0" />
  </svg>
);

export const BoxLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#0061D5" />
    <circle cx="9" cy="12" r="3" stroke="white" strokeWidth="1.8" />
    <circle cx="15" cy="12" r="3" stroke="white" strokeWidth="1.8" />
    <path d="M12 9V15" stroke="white" strokeWidth="1.8" />
  </svg>
);

export const DropboxLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#0061FF" />
    <path d="M7 8L12 11L7 14L2 11L7 8ZM17 8L22 11L17 14L12 11L17 8Z" fill="white" />
    <path d="M7 14L12 17L17 14L12 11L7 14Z" fill="#A0C2FF" />
    <path d="M7 16L12 19L17 16" stroke="white" strokeWidth="1.5" />
  </svg>
);

export const BullhornLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#F47721" />
    <path d="M6 10L14 6V18L6 14V10Z" fill="white" />
    <path d="M14 9C16 9 18 10.5 18 12C18 13.5 16 15 14 15" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const GreenhouseLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#00B268" />
    <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1.8" />
    <path d="M12 8V12L15 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const LeverLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#202A36" />
    <circle cx="8" cy="12" r="2.5" fill="#00D2B4" />
    <circle cx="16" cy="12" r="2.5" fill="#FFFFFF" />
    <path d="M8 12H16" stroke="#00D2B4" strokeWidth="2" />
  </svg>
);

export const IcimsLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#E8175D" />
    <path d="M6 7H18M12 7V17M7 17H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SalesforceLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#00A1E0" />
    <path d="M8 14C7 14 6 13 6 11.5C6 10 7.2 9 8.5 9C9 7.8 10.2 7 11.5 7C13 7 14.2 8 14.6 9.2C15.2 9 15.8 9 16.2 9.5C17.2 10.5 17 12 17 12C17.5 12 18 12.5 18 13.2C18 14 17.2 14.5 16.5 14.5H8V14Z" fill="white" />
  </svg>
);

export const DynamicsLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#002050" />
    <path d="M6 7L14 12L6 17V7Z" fill="#0078D4" />
    <path d="M14 7L18 10L14 17V7Z" fill="#50E6FF" />
  </svg>
);

export const UkgLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#005151" />
    <path d="M6 8V13C6 15 7.5 16.5 9.5 16.5C11.5 16.5 13 15 13 13V8H11V13C11 13.8 10.3 14.5 9.5 14.5C8.7 14.5 8 13.8 8 13V8H6Z" fill="#00C9A7" />
    <path d="M14 8H16V16H14V8Z" fill="#FFFFFF" />
  </svg>
);

export const SuccessFactorsLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#008FD3" />
    <circle cx="12" cy="9" r="3" fill="#F0AB00" />
    <path d="M6 17C6 14 9 13.5 12 13.5C15 13.5 18 14 18 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const OracleHcmLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#C74634" />
    <ellipse cx="12" cy="12" rx="7" ry="4.5" stroke="white" strokeWidth="1.8" />
  </svg>
);

export const LmsLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#1E3A8A" />
    <path d="M12 6L4 10L12 14L20 10L12 6Z" fill="#F59E0B" />
    <path d="M6 12V16C6 17.5 8.7 19 12 19C15.3 19 18 17.5 18 16V12" stroke="white" strokeWidth="1.5" />
  </svg>
);

export const AcsaLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#D97706" />
    <path d="M12 6L18 17H6L12 6Z" fill="#FEF3C7" />
    <path d="M12 10V13M12 15V15.5" stroke="#92400E" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const EscLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#047857" />
    <circle cx="12" cy="12" r="6" stroke="#A7F3D0" strokeWidth="1.8" />
    <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ApegaLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#8A6D3B" />
    <circle cx="12" cy="12" r="7.5" stroke="#FDE68A" strokeWidth="1.2" fill="#59441B" />
    <path d="M12 6.5L14 10.5H10L12 6.5ZM12 17.5L10 13.5H14L12 17.5ZM6.5 12L10.5 10V14L6.5 12ZM17.5 12L13.5 14V10L17.5 12Z" fill="#FDE68A" />
    <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
  </svg>
);

export const AutodeskLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#0696D7" />
    <path d="M5 18.5L12 4.5L19 18.5H15.5L12 10.5L8.5 18.5H5Z" fill="white" />
    <path d="M10 15H14L12 11L10 15Z" fill="#032D42" />
  </svg>
);

export const TeamsLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#464EB8" />
    <circle cx="15.5" cy="7.5" r="2" fill="#7B83EB" />
    <path d="M13.5 10.5H17.5C18.3 10.5 19 11.2 19 12V15H13.5V10.5Z" fill="#7B83EB" />
    <circle cx="9.5" cy="8.5" r="2.5" fill="#FFFFFF" />
    <path d="M6.5 12.5C6.5 11.4 7.4 10.5 8.5 10.5H11.5C12.6 10.5 13.5 11.4 13.5 12.5V17.5H6.5V12.5Z" fill="#FFFFFF" />
    <rect x="4" y="11" width="5" height="5" rx="1" fill="#5B62D6" />
    <path d="M5.5 12.5H7.5M6.5 12.5V14.5" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
);

export const SlackLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#4A154B" />
    <circle cx="9" cy="7.5" r="1.5" fill="#E01E5A" />
    <rect x="7.5" y="10" width="3" height="4" rx="1.5" fill="#ECB22E" />
    <circle cx="15" cy="9" r="1.5" fill="#2EB67D" />
    <rect x="10" y="7.5" width="4" height="3" rx="1.5" fill="#E01E5A" />
    <circle cx="9" cy="16.5" r="1.5" fill="#ECB22E" />
    <circle cx="16.5" cy="15" r="1.5" fill="#36C5F0" />
    <rect x="10" y="13.5" width="4" height="3" rx="1.5" fill="#2EB67D" />
    <rect x="13.5" y="10" width="3" height="4" rx="1.5" fill="#36C5F0" />
  </svg>
);

export const ZoomLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#2D8CFF" />
    <rect x="5" y="8" width="9" height="8" rx="2" fill="white" />
    <path d="M14 10.5L19 7.5V16.5L14 13.5V10.5Z" fill="white" />
  </svg>
);

export const CheckrLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#00B47D" />
    <path d="M7 12.5L10.5 16L17 8.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CertnLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#0066F5" />
    <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1.8" />
    <path d="M10 12L11.5 13.5L14.5 10.5" stroke="#67E8F9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DocuSignLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#2D3B48" />
    <rect x="5" y="9" width="4" height="8" rx="1" fill="#FFCF00" />
    <rect x="10" y="6" width="4" height="11" rx="1" fill="#FF1E38" />
    <rect x="15" y="11" width="4" height="6" rx="1" fill="#005CB9" />
  </svg>
);

export const WorkdayLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#F46E20" />
    <path d="M6 14C8 10 10 7 12 7C14 7 16 10 18 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="15" r="2" fill="white" />
  </svg>
);

export const DayforceLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#1C3D5A" />
    <circle cx="12" cy="12" r="7" stroke="#00C48C" strokeWidth="1.5" />
    <path d="M12 7V12L15 14" stroke="#00C48C" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const EntraLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#0078D4" />
    <rect x="6" y="6" width="5" height="5" fill="#F25022" />
    <rect x="13" y="6" width="5" height="5" fill="#7FBA00" />
    <rect x="6" y="13" width="5" height="5" fill="#00A4EF" />
    <rect x="13" y="13" width="5" height="5" fill="#FFB900" />
  </svg>
);

export const SharePointLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#038387" />
    <circle cx="14" cy="10" r="3.5" fill="#004E52" />
    <circle cx="10" cy="13" r="4.5" fill="#00A4A6" />
    <circle cx="14.5" cy="14" r="3" fill="#6BD8DB" />
  </svg>
);

export const DeltekLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#0F4C81" />
    <path d="M6 7L13 12L6 17V7Z" fill="#F26A36" />
    <path d="M13 7L20 12L13 17V7Z" fill="#FFFFFF" />
  </svg>
);

export const PrimaveraLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#C74634" />
    <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="1.5" />
    <path d="M8 12H16M12 8V16" stroke="white" strokeWidth="1.5" />
    <rect x="10" y="10" width="4" height="4" fill="#FFD1B3" />
  </svg>
);

export const FieldglassLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#008FD3" />
    <path d="M6 9H18V16C18 17 17 18 16 18H8C7 18 6 17 6 16V9Z" fill="white" />
    <circle cx="12" cy="13" r="2.5" fill="#F0AB00" />
  </svg>
);

export const XrefLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#00D285" />
    <path d="M7 7L17 17M17 7L7 17" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const MyCredsLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#6C2EB9" />
    <path d="M6 10L12 6L18 10L12 14L6 10Z" fill="#F8FAFC" />
    <path d="M9 13V16C9 17.5 10.5 18.5 12 18.5C13.5 18.5 15 17.5 15 16V13" stroke="white" strokeWidth="1.2" fill="none" />
    <path d="M18 10V15" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const TwilioLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#F22F46" />
    <circle cx="9" cy="9" r="2" fill="white" />
    <circle cx="15" cy="9" r="2" fill="white" />
    <circle cx="9" cy="15" r="2" fill="white" />
    <circle cx="15" cy="15" r="2" fill="white" />
  </svg>
);

export const PowerBiLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#F2C811" />
    <rect x="6" y="13" width="3" height="6" rx="1" fill="#333333" />
    <rect x="10.5" y="9" width="3" height="10" rx="1" fill="#333333" />
    <rect x="15" y="5" width="3" height="14" rx="1" fill="#333333" />
  </svg>
);

export const OpenAssetLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#2E3842" />
    <rect x="6" y="6" width="12" height="12" rx="2" stroke="#48BB78" strokeWidth="1.8" fill="none" />
    <circle cx="10" cy="10" r="1.5" fill="#48BB78" />
    <path d="M7 16L11 12L14 15L17 11" stroke="#48BB78" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ApiLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#3B82F6" />
    <path d="M7 14L4 12L7 10M17 10L20 12L17 14M14 7L10 17" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
