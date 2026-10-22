import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <header className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Simple Logo SVG */}
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Verified Workers</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Log in
            </Link>
            <Link href="/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Trusted by employers across Kenya
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              Connecting Employers with <span className="text-blue-600">Verified</span> Workers.
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto md:mx-0">
              Hire a verified job seeker today. Unlock their number and interview them directly. No agencies, no hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link href="/register" className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors text-center">
                Register as a Job Seeker
              </Link>
              <Link href="/register" className="w-full sm:w-auto px-6 py-3 bg-white text-slate-700 border border-slate-300 font-medium rounded-md hover:bg-slate-50 transition-colors text-center">
                Hire Talent
              </Link>
            </div>
          </div>

          {/* Right side visual (Abstract UI mockup) */}
          <div className="flex-1 w-full max-w-lg hidden md:block">
            <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-xl">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
              <div className="space-y-4">
                {/* Mock Worker Card */}
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                  </div>
                  <div className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded">VERIFIED</div>
                </div>
                {/* Mock Worker Card 2 */}
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 opacity-70">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 rounded w-5/6 mb-2"></div>
                    <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                  </div>
                </div>
                {/* Unlock Button Mockup */}
                <div className="bg-blue-600 text-white text-center py-3 rounded-lg font-medium shadow-md">
                  Unlock Contact Info
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-slate-50 py-20 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why use Verified Workers?</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">We take the guesswork out of hiring by ensuring every worker on our platform is thoroughly vetted.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Profiles</h3>
                <p className="text-slate-600 text-sm">Every worker is vetted and verified before appearing in our search results.</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Unlock Contacts</h3>
                <p className="text-slate-600 text-sm">Pay a small fee to unlock verified phone numbers and interview candidates directly.</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Instant Hiring</h3>
                <p className="text-slate-600 text-sm">No waiting for agencies. Connect directly with your next employee today.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 Verified Workers KE. All rights reserved.</p>
      </footer>
    </div>
  );
}
