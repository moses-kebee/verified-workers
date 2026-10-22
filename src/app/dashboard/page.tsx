import { auth } from '../../auth';
import prisma from '../../lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { logoutAction } from '../../lib/actions';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      workerProfile: true,
      employerProfile: true,
    },
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation - Muted Dark Slate */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white tracking-tight">Verified Workers</h2>
          <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider font-semibold">Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/dashboard" className="block px-3 py-2 bg-slate-800 text-white rounded-md text-sm font-medium">
            Overview
          </Link>
          {user.role === 'WORKER' ? (
            <Link href="/dashboard/profile" className="block px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md text-sm transition-colors">
              My Profile
            </Link>
          ) : (
            <Link href="/workers" className="block px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md text-sm transition-colors">
              Browse Workers
            </Link>
          )}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <form action={logoutAction}>
            <button className="w-full text-left px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-md text-sm transition-colors">
              Log Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-10 border-b border-slate-200 pb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back, {user.email}</p>
        </header>

        {/* Stats Row - Clean, Minimal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Account Type</h3>
            <p className="text-xl font-medium text-slate-900 mt-2">{user.role}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</h3>
            <p className="text-xl font-medium text-emerald-600 mt-2">Active</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {user.role === 'WORKER' ? 'Verification' : 'Company'}
            </h3>
            <p className="text-xl font-medium text-slate-900 mt-2">
              {user.role === 'WORKER' 
                ? (user.workerProfile?.isVerified ? 'Verified' : 'Pending Review') 
                : (user.employerProfile?.companyName || 'Not Set')}
            </p>
          </div>
        </div>

        {/* Action Area */}
        {user.role === 'WORKER' ? (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Worker Profile Status</h2>
            </div>
            
            <div className="p-6">
              {!user.workerProfile?.hasPaidVerificationFee ? (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-slate-900">Your profile is unverified</h3>
                    <p className="text-slate-500 text-sm mt-1 mb-4">
                      Verified workers are 3x more likely to be hired. Pay a one-time fee of 99 KES to unlock your verification badge.
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                      Pay 99 KES to Verify
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-slate-900">Verification Fee Paid</h3>
                    <p className="text-slate-500 text-sm mt-1 mb-4">
                      Your payment is confirmed. Please complete your profile and upload your ID for admin review.
                    </p>
                    <Link href="/dashboard/profile" className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors inline-block">
                      Complete Profile
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Employer Tools</h2>
            </div>
            <div className="p-6">
              <p className="text-slate-500 text-sm mb-4">Ready to find your next great hire? Browse our database of verified workers.</p>
              <Link href="/workers" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors inline-block">
                Browse Workers
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
