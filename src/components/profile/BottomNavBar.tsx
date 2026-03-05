import { Home, Users, Plus, MessageSquare, User } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", active: false },
  { icon: Users, label: "Friends", active: false },
  { id: "create", label: "Create", active: false },
  { icon: MessageSquare, label: "Inbox", active: false },
  { icon: User, label: "Profile", active: true },
]

export function BottomNavBar() {
  return (
    <div
      className="flex flex-col"
      style={{
        width: '100%',
        height: 83,
        backgroundColor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Nav items */}
      <div
        className="flex items-start overflow-hidden"
        style={{ width: '100%', height: 49, gap: 2 }}
      >
        {navItems.map((item, index) => {
          if (item.id === "create") {
            return (
              <div
                key={index}
                className="flex flex-1 items-center justify-center"
                style={{ height: 49 }}
              >
                {/* TikTok create button */}
                <button 
                  className="relative active:scale-90 transition-transform" 
                  style={{ width: 48, height: 48 }}
                >
                  {/* Pink/Cyan layers */}
                  <div
                    className="absolute rounded-lg"
                    style={{
                      width: 23,
                      height: 29,
                      left: 5,
                      top: 10,
                      backgroundColor: "rgba(250,45,108,1)",
                      borderRadius: 8,
                    }}
                  />
                  <div
                    className="absolute rounded-lg"
                    style={{
                      width: 23,
                      height: 29,
                      right: 5,
                      top: 10,
                      backgroundColor: "rgba(32,213,236,1)",
                      borderRadius: 8,
                    }}
                  />
                  {/* Black center */}
                  <div
                    className="absolute flex items-center justify-center rounded-lg"
                    style={{
                      width: 38,
                      height: 29,
                      left: 5,
                      top: 10,
                      backgroundColor: "rgba(0,0,0,1)",
                      borderRadius: 8,
                    }}
                  >
                    <Plus size={18} strokeWidth={3} color="white" />
                  </div>
                </button>
              </div>
            )
          }

          const Icon = item.icon!
          const isActive = item.active
          return (
            <div
              key={index}
              className="flex flex-1 flex-col items-center justify-start overflow-hidden pt-0.5 pb-[3px]"
              style={{ height: 49, gap: -1 }}
            >
              <div
                className="flex items-center justify-center overflow-hidden"
                style={{ width: 32, height: 32 }}
              >
                <Icon
                  size={24}
                  strokeWidth={isActive ? 2.5 : 2}
                  color="rgba(0,0,0,1)"
                  fill={isActive ? "rgba(0,0,0,1)" : "none"}
                />
              </div>
              <span
                className="text-center font-sans text-[10px] leading-[13px] text-black"
                style={{
                  fontWeight: 560,
                  letterSpacing: 0.229,
                }}
              >
                {item.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Home indicator */}
      <div className="flex flex-1 items-end justify-center pb-2">
        <div
          className="rounded-full bg-black"
          style={{ width: 140, height: 5, borderRadius: 29 }}
        />
      </div>
    </div>
  )
}
