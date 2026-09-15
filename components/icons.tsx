type IconProps = { className?: string };

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Spark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 2c.7 8.9 5.1 13.3 14 14-8.9.7-13.3 5.1-14 14-.7-8.9-5.1-13.3-14-14C10.9 15.3 15.3 10.9 16 2Z" fill="currentColor" />
    </svg>
  );
}

export function Asterisk({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 3v26M4.7 9.5l22.6 13M4.7 22.5l22.6-13" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}
