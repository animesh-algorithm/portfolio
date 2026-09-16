type IconProps = { className?: string };

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Demo({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m8.4 6.9 4.4 3.1-4.4 3.1V6.9Z" fill="currentColor" />
    </svg>
  );
}

export function GitHub({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 2.25a7.75 7.75 0 0 0-2.45 15.1c.39.07.53-.17.53-.37v-1.5c-2.15.47-2.6-.91-2.6-.91-.35-.9-.86-1.14-.86-1.14-.7-.48.05-.47.05-.47.78.05 1.19.8 1.19.8.69 1.18 1.81.84 2.25.64.07-.5.27-.84.49-1.04-1.72-.2-3.52-.86-3.52-3.83 0-.84.3-1.53.8-2.07-.08-.2-.35-.98.08-2.04 0 0 .65-.21 2.13.79A7.4 7.4 0 0 1 10 6c.66 0 1.31.09 1.92.26 1.48-1 2.13-.79 2.13-.79.43 1.06.16 1.84.08 2.04.5.54.8 1.23.8 2.07 0 2.98-1.81 3.63-3.53 3.82.28.24.52.71.52 1.44v2.14c0 .2.14.44.53.37A7.75 7.75 0 0 0 10 2.25Z" />
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

export function ChatBubble({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.25 18.25 3.5 20l.72-3.42A8.25 8.25 0 1 1 6.25 18.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 11.75h.01M12 11.75h.01M16 11.75h.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
