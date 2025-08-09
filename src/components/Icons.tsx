import React from 'react';

interface IconProps {
  className?: string;
}

/* 홈 아이콘 */
export const HomeIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13.9912 5.24121C14.5632 4.72142 15.4367 4.72146 16.0088 5.24121L25.7617 14.1084C26.3028 14.6003 25.9549 15.5 25.2236 15.5H24.7725C24.4963 15.5 24.2725 15.7239 24.2725 16V24.5C24.2725 25.0522 23.8246 25.4999 23.2725 25.5H18.79C18.2378 25.5 17.79 25.0523 17.79 24.5V19.333C17.7899 19.0572 17.5659 18.8332 17.29 18.833H12.7109C12.4349 18.833 12.2111 19.057 12.2109 19.333V24.5C12.2109 25.0521 11.763 25.4998 11.2109 25.5H6.72754C6.17543 25.4998 5.72754 25.0522 5.72754 24.5V16C5.72754 15.7239 5.50368 15.5 5.22754 15.5H4.77637C4.04514 15.5 3.69722 14.6003 4.23828 14.1084L13.9912 5.24121Z" fill="currentColor" stroke="currentColor"/>
  </svg>
);

/* 대화 아이콘 */
export const ChatIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M15.8026 3.96973C21.8777 3.96979 26.8026 8.89463 26.8026 14.9697C26.8026 21.0448 21.8777 25.9697 15.8026 25.9697C14.0094 25.9697 12.3179 25.5375 10.8222 24.7764L6.5204 25.9297C5.03331 26.3282 3.67187 24.9675 4.0702 23.4805L5.36512 18.6465C5.37481 18.6104 5.38598 18.575 5.39735 18.54C5.01322 17.4203 4.80262 16.2197 4.80262 14.9697C4.80262 8.89459 9.72749 3.96973 15.8026 3.96973Z" fill="currentColor"/>
  </svg>
);

/* 일기 아이콘 */
export const DiaryIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="5.25" y="4.25" width="19.5" height="21.5" rx="2.25" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M11 10H15H19" stroke="#000414" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11 15H15H19" stroke="#000414" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11 20H15H19" stroke="#000414" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

/* 프로필 아이콘 */
export const ProfileIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="14.4714" cy="8.5" r="4.25" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6.95048 25.2998C6.34571 25.2998 5.8765 24.7654 6.00737 24.1749C7.0518 19.4629 10.5395 16.0001 14.6834 16C18.8273 16 22.3149 19.4629 23.3593 24.1749C23.4902 24.7654 23.021 25.2998 22.4162 25.2998L6.95048 25.2998Z" fill="currentColor"/>
  </svg>
); 