import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-8 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Local Democracy</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Making local governance accessible and impactful for every Indian
              citizen.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/notifications"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  Notifications
                </Link>
              </li>
              <li>
                <Link
                  href="/legislation"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  Legislation
                </Link>
              </li>
              <li>
                <Link
                  href="/feedback"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <Link
                  href="/voting"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  Voting
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              Email: contact@localdemocracy.in
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Phone: +91 98765 43210
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t text-center text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Local Democracy.</p>
        </div>
      </div>
    </footer>
  );
}
