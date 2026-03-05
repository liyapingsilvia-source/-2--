export function StatusBar({ lightMode }: { lightMode?: boolean }) {
  const color = lightMode ? "white" : "black";
  const opacity = lightMode ? 0.8 : 0.4;
  const fillOpacity = lightMode ? 0.8 : 0.5;

  return (
    <div className="flex items-center justify-between px-[27px] pt-[14px] pb-[10px]" style={{ height: 60 }}>
      {/* Time */}
      <span className="text-[17px] font-semibold leading-[22px] tracking-[-0.41px]" style={{ color }}>
        8:00
      </span>
      {/* Right icons */}
      <div className="flex items-center gap-[7px]">
        {/* Cellular */}
        <svg width="21" height="13" viewBox="0 0 21 13" fill="none">
          <rect x="0" y="8" width="3.5" height="5" rx="1" fill={color} />
          <rect x="5.5" y="5.5" width="3.5" height="7.5" rx="1" fill={color} />
          <rect x="11" y="3" width="3.5" height="10" rx="1" fill={color} />
          <rect x="16.5" y="0" width="3.5" height="13" rx="1" fill={color} />
        </svg>
        {/* WiFi */}
        <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
          <path d="M9 13a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill={color} />
          <path d="M5.636 9.364a4.5 4.5 0 016.728 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3.05 6.757a8 8 0 0111.9 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M.636 4.222C3.938 1.407 6.469 0 9 0s5.062 1.407 8.364 4.222" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {/* Battery */}
        <svg width="29" height="14" viewBox="0 0 29 14" fill="none">
          <rect x="0.5" y="0.5" width="25" height="13" rx="3.5" stroke={color} strokeOpacity={opacity} />
          <rect x="27" y="4" width="1.5" height="5" rx="0.75" fill={color} fillOpacity={fillOpacity} />
          <rect x="2.5" y="2.5" width="18" height="9" rx="2" fill={color} />
        </svg>
      </div>
    </div>
  )
}
