import prisma from '../../lib/prisma';
import Link from 'next/link';

export default async function WorkersPage() {
  // Fetch all verified workers (for now, we'll just fetch all workers)
  const workers = await prisma.workerProfile.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Browse Workers</h1>
            <p className="text-slate-500 text-sm mt-1">Find the perfect candidate for your business.</p>
          </div>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
            Back to Dashboard
          </Link>
        </div>

        <div className="grid gap-4">
          {workers.length === 0 ? (
            <div className="text-center p-12 bg-white rounded-lg border border-slate-200">
              <p className="text-slate-500">No workers registered yet.</p>
            </div>
          ) : (
            workers.map((worker) => (
              <div key={worker.id} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-lg font-semibold text-slate-900">{worker.fullName || 'Anonymous Worker'}</h2>
                    {worker.isVerified && (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded uppercase tracking-wide">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm mb-1">{worker.location} &bull; {worker.skills.join(', ')}</p>
                  <p className="text-slate-500 text-sm line-clamp-2">{worker.bio || 'No bio provided.'}</p>
                </div>
                
                <div className="flex-shrink-0 mt-4 md:mt-0">
                  <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                    Unlock Contact
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
