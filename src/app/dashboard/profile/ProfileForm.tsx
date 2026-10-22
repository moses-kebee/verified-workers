'use client';

import { useActionState } from 'react';
import { updateWorkerProfile } from '../../../lib/actions';

export default function ProfileForm({ initialData }: { initialData: any }) {
  const [message, dispatch, isPending] = useActionState(updateWorkerProfile, undefined);

  return (
    <form action={dispatch} className="p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
        <input type="text" name="fullName" defaultValue={initialData?.fullName} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. John Doe" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
        <input type="tel" name="phoneNumber" defaultValue={initialData?.phoneNumber} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 0712 345 678" />
        <p className="text-xs text-slate-500 mt-1">Employers will pay to unlock this number.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
        <input type="text" name="location" defaultValue={initialData?.location} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Nairobi, Kenya" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Skills (comma separated)</label>
        <input type="text" name="skills" defaultValue={initialData?.skills?.join(', ')} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Plumbing, Electrical, Carpentry" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Short Bio</label>
        <textarea name="bio" defaultValue={initialData?.bio} rows={4} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tell employers a bit about your experience..."></textarea>
      </div>

      {message === 'success' && <p className="text-emerald-600 text-sm font-medium">Profile saved successfully!</p>}
      {message && message !== 'success' && <p className="text-red-600 text-sm font-medium">{message}</p>}

      <div className="pt-4 border-t border-slate-200 flex justify-end">
        <button disabled={isPending} className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50">
          {isPending ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  );
}
