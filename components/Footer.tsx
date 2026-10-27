import { Github, Mail } from "lucide-react";
import { footer, nav, profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="px-5 sm:px-8 pt-16 pb-10 border-t border-line">
      <div className="mx-auto max-w-shell">
        <div className="grid sm:grid-cols-3 gap-10 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="w-2 h-2 rounded-full bg-ember" />
                <span className="w-2 h-2 rounded-full bg-gold" />
                <span className="w-2 h-2 rounded-full bg-signal" />
              </span>
              <span className="mono text-sm">{profile.name}.dev</span>
            </div>
            <p className="text-mute text-sm max-w-[32ch] leading-relaxed">{footer.tagline}</p>
          </div>

          <div>
            <h4 className="mono text-[11px] text-mute mb-4">navigasi</h4>
            <ul className="space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-mute hover:text-ink transition-colors">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mono text-[11px] text-mute mb-4">terhubung</h4>
            <div className="flex gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-mute hover:text-ink hover:border-mute transition-colors"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>
              <span
                className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-mute/50"
                aria-label="GitHub — private"
                title="Repo private"
              >
                <Github size={15} />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-line mono text-[11px] text-mute">
          <span>© {footer.year} {profile.name}. All rights reserved.</span>
          <span>built with next.js · framer motion</span>
        </div>
      </div>
    </footer>
  );
}
