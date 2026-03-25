import { Play } from "lucide-react"

interface VideoItem {
  src: string
  views: string
  badge?: string
  badgeColor?: string
}

const row1: VideoItem[] = [
  { src: "https://free.picui.cn/free/2026/03/13/69b3c9d25f9db.png", views: "16.5K", badge: "Tag text", badgeColor: "rgba(245,245,245,1)" },
  { src: "https://free.picui.cn/free/2026/03/13/69b3c9d300bd6.png", views: "16.5K", badge: "Tag text", badgeColor: "rgba(254,44,85,1)" },
  { src: "https://free.picui.cn/free/2026/03/13/69b3c9d33c8e8.png", views: "9,126" },
]

const row2: VideoItem[] = [
  { src: "https://free.picui.cn/free/2026/03/13/69b3c9d34525f.png", views: "1,202" },
  { src: "https://free.picui.cn/free/2026/03/13/69b3c9d349643.png", views: "712" },
  { src: "https://free.picui.cn/free/2026/03/13/69b3c9d51d15f.png", views: "10.1K" },
]

const row3: VideoItem[] = [
  { src: "https://picsum.photos/seed/fashion1/400/600", views: "5,432" },
  { src: "https://picsum.photos/seed/fashion2/400/600", views: "2,109" },
  { src: "https://picsum.photos/seed/fashion3/400/600", views: "8,765" },
]

const row4: VideoItem[] = [
  { src: "https://picsum.photos/seed/travel1/400/600", views: "12.4K" },
  { src: "https://picsum.photos/seed/travel2/400/600", views: "3,210" },
  { src: "https://picsum.photos/seed/travel3/400/600", views: "1.1K" },
]

const row5: VideoItem[] = [
  { src: "https://picsum.photos/seed/food1/400/600", views: "45.2K" },
  { src: "https://picsum.photos/seed/food2/400/600", views: "982" },
  { src: "https://picsum.photos/seed/food3/400/600", views: "6,700" },
]

const row6: VideoItem[] = [
  { src: "https://picsum.photos/seed/art1/400/600", views: "22.1K" },
  { src: "https://picsum.photos/seed/art2/400/600", views: "15.5K" },
  { src: "https://picsum.photos/seed/art3/400/600", views: "30.2K" },
]

function VideoThumbnail({ item }: { item: VideoItem; key?: any }) {
  const isDraftBadge = item.badge && item.badgeColor === "rgba(245,245,245,1)"
  const isPinnedBadge = item.badge && item.badgeColor === "rgba(254,44,85,1)"

  return (
    <div
      className="relative flex-1 overflow-hidden"
      style={{ height: 173 }}
    >
      <img
        src={item.src}
        alt=""
        className="h-full w-full object-cover"
        referrerPolicy="no-referrer"
      />
      {/* Bottom gradient overlay */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 52,
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.24) 100%)",
        }}
      />
      {/* View count */}
      <div
        className="absolute bottom-[6px] left-[6px] flex items-center gap-[3px]"
      >
        <Play
          size={14}
          fill="rgba(250,250,250,1)"
          color="rgba(250,250,250,1)"
        />
        <span
          className="font-sans text-[13px] font-medium leading-[16.9px] text-white"
          style={{
            letterSpacing: 0.127,
            textShadow: "0px 0.5px 0.5px rgba(0,0,0,0.15)",
          }}
        >
          {item.views}
        </span>
      </div>
      {/* Badge */}
      {isDraftBadge && (
        <div
          className="absolute left-[4px] top-[4px] flex items-center rounded px-[5px] py-[1px]"
          style={{ backgroundColor: item.badgeColor }}
        >
          <span
            className="font-sans text-[12px] font-medium leading-[15.6px] text-black"
            style={{ letterSpacing: 0.161 }}
          >
            {item.badge}
          </span>
        </div>
      )}
      {isPinnedBadge && (
        <div
          className="absolute left-[4px] top-[4px] flex items-center rounded px-[5px] py-[1px]"
          style={{ backgroundColor: item.badgeColor }}
        >
          <span
            className="font-sans text-[12px] font-medium leading-[15.6px] text-white"
            style={{ letterSpacing: 0.161 }}
          >
            {item.badge}
          </span>
        </div>
      )}
    </div>
  )
}

function VideoRow({ items }: { items: VideoItem[] }) {
  return (
    <div
      className="flex items-center"
      style={{ width: '100%', height: 173, gap: 1.5 }}
    >
      {items.map((item, i) => (
        <VideoThumbnail key={i} item={item} />
      ))}
    </div>
  )
}

export const profilePosts: VideoItem[] = [...row1, ...row2, ...row3, ...row4, ...row5, ...row6];

export function VideoGrid() {
  return (
    <div
      className="flex flex-col bg-white"
      style={{ width: '100%', gap: 1.5 }}
    >
      <VideoRow items={row1} />
      <VideoRow items={row2} />
      <VideoRow items={row3} />
      <VideoRow items={row4} />
      <VideoRow items={row5} />
      <VideoRow items={row6} />
    </div>
  )
}
