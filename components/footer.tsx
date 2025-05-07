import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SocialBoost</h3>
            <p className="text-sm text-muted-foreground">Get real followers, likes, and views at unbeatable prices.</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/instagram" className="text-sm text-muted-foreground hover:text-foreground">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="/services/youtube" className="text-sm text-muted-foreground hover:text-foreground">
                  YouTube
                </Link>
              </li>
              <li>
                <Link href="/services/tiktok" className="text-sm text-muted-foreground hover:text-foreground">
                  TikTok
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-sm text-muted-foreground hover:text-foreground">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SocialBoost. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground">
              Twitter
            </Link>
            <Link href="https://instagram.com" className="text-muted-foreground hover:text-foreground">
              Instagram
            </Link>
            <Link href="https://facebook.com" className="text-muted-foreground hover:text-foreground">
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
