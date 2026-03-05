export function BioLinks({ lightMode }: { lightMode?: boolean }) {
  const color = lightMode ? "white" : "black";
  return (
    <div
      className="flex flex-col px-5"
      style={{ gap: 0 }}
    >
      {/* Line 1 - Bio text */}
      <div className="flex items-center" style={{ height: 18 }}>
        <span
          className="font-sans text-[13px] font-normal leading-[18.2px]"
          style={{ letterSpacing: 0, color }}
        >
          Love adventures in life
        </span>
      </div>
      {/* Line 2 - Contact */}
      <div className="flex items-center" style={{ height: 18 }}>
        <span
          className="font-sans text-[13px] font-normal leading-[18.2px]"
          style={{ letterSpacing: 0, color }}
        >
          {'Contact me: erikagelinda@gmail.com'}
        </span>
      </div>
      {/* Link */}
      <div className="flex items-center gap-1" style={{ height: 18 }}>
        <span
          className="font-sans text-[13px] font-semibold leading-[18.2px]"
          style={{ letterSpacing: 0, color }}
        >
          lemon8-app.com/erikagelinda
        </span>
      </div>
    </div>
  )
}
