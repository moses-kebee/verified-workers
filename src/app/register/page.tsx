'use client';

import { useActionState, useEffect } from 'react';
import { registerUser } from '../../lib/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  
  // Explicitly typing the action state
  const [message, dispatch, isPending] = useActionState<string | undefined, FormData>(
    registerUser, 
    undefined
  );

  useEffect(() => {
    if (message === 'success') {
      router.push('/login');
    }
  }, [message, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <form action={dispatch} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-slate-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-900">Create an Account</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">I am a:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-slate-900 font-medium">
              <input type="radio" name="role" value="WORKER" defaultChecked /> Job Seeker
            </label>
            <label className="flex items-center gap-2 text-slate-900 font-medium">
              <input type="radio" name="role" value="EMPLOYER" /> Employer
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input type="email" name="email" required className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1">Password (min 6 chars)</label>
          <input type="password" name="password" required className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        {message && message !== 'success' && <p className="text-red-500 text-sm mb-4">{message}</p>}

        <button disabled={isPending} className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {isPending ? 'Registering...' : 'Register'}
        </button>
        
        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account? <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">Log in</Link>
        </p>
      </form>
    </div>
  );
}
