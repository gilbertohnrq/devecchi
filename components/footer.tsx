"use client"

export function Footer() {
  return (
    <footer className="px-6 py-10 bg-[#121212] border-t border-[#ffffff10]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="text-sm text-[#f2f2f2]">Isabella Devecchi</p>
          <p className="text-xs text-[#8e8b84] mt-1">Arquitetura, interiores e direcao de design</p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-[#a8a5a0]">
          <a
            href="https://www.instagram.com/belladevecchi/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#f2f2f2] transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://www.behance.net/isabelladevecchi?locale=pt_BR"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#f2f2f2] transition-colors"
          >
            Behance
          </a>
          <a href="#faq" className="hover:text-[#f2f2f2] transition-colors">
            FAQ
          </a>
        </div>
      </div>
    </footer>
  )
}
