export function ProfileHeader() {
  return (
    <div className="relative flex items-start justify-between px-5 pb-0 pt-[28px]" style={{ minHeight: 154 }}>
      {/* Left side: Name, Username, Stats */}
      <div className="flex flex-col gap-[12px]">
        {/* Name */}
        <div className="flex flex-col">
          <span
            className="font-sans text-[20px] font-bold leading-[25px] text-current"
            style={{ letterSpacing: 0 }}
          >
            Erika Gelinda
          </span>
          <span
            className="font-sans text-[13px] font-normal leading-[16.9px]"
            style={{ color: "inherit", opacity: 0.6, letterSpacing: 0 }}
          >
            @erika0526
          </span>
        </div>

        {/* Stats row */}
        <div className="flex items-center" style={{ gap: 24 }}>
          <StatItem value="618" label="following" />
          <StatItem value="1,834" label="followers" />
          <StatItem value="3,073" label="likes" />
        </div>
      </div>

      {/* Right side: Avatar image, position X=266 */}
      <div className="absolute flex-shrink-0" style={{ width: 126, height: 126, left: 266, top: 12 }}>
        <img
          src="https://free.picui.cn/free/2026/03/13/69b3c96ade7e1.png"
          alt="Erika Gelinda"
          className="h-full w-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-start gap-0.5">
      <span
        className="font-sans text-[15px] font-bold leading-[19.5px] text-current"
        style={{ letterSpacing: 0 }}
      >
        {value}
      </span>
      <span
        className="font-sans text-[13px] font-normal leading-[16.9px]"
        style={{ color: "inherit", opacity: 0.6, letterSpacing: 0 }}
      >
        {label}
      </span>
    </div>
  );
}
