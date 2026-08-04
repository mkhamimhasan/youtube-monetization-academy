const channels = [
  {
    name: "ভবিষ্যৎ বাংলা",
    handle: "@FutureBanglaS",
    url: "https://youtube.com/@FutureBanglaS",
    videos: [
      { id: "Aa5bmegQfMM" },
      { id: "sdqzq5oehFs" },
      { id: "kAcua0bpas4" },
    ],
  },
  {
    name: "Silent Legacy",
    handle: "@SilentLegacyStudio",
    url: "https://youtube.com/@SilentLegacyStudio",
    videos: [
      { id: "k4T0bHE3r4I" },
      { id: "xnA-_l37hYE" },
      { id: "PCeilUj4iww" },
    ],
  },
  {
    name: "কার্টুন টেক",
    handle: "@KatunTek",
    url: "https://youtube.com/@KatunTek",
    videos: [
      { id: "tCl3zcD5UuI" },
      { id: "wD-Uyel70zg" },
      { id: "SIlGuYe6NPc" },
    ],
  },
];

export default function YouTubeSection() {
  return (
    <section className="section-padding border-t border-line">
      <div className="container-shell">
        <p className="kicker-purple justify-center inline-flex mb-4">Our YouTube Channels</p>
        <h2 className="text-center mb-12">Results We are Building</h2>
        <div className="flex flex-col gap-16">
          {channels.map((channel) => (
            <div key={channel.handle}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-ink-primary text-xl font-bold">{channel.name}</h3>
                  <p className="text-ink-secondary text-sm">{channel.handle}</p>
                </div>
                <a href={channel.url} target="_blank" rel="noopener noreferrer" className="text-purple-400 text-sm hover:text-purple-300 transition-colors">
                  View Channel
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {channel.videos.map((video) => (
                  <a key={video.id} href={"https://youtu.be/" + video.id} target="_blank" rel="noopener noreferrer" className="group relative rounded-xl overflow-hidden border border-line hover:border-purple-500 transition-all duration-300">
                    <img src={"https://img.youtube.com/vi/" + video.id + "/mqdefault.jpg"} alt="video thumbnail" className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
