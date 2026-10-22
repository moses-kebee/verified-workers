'use client';

import { useActionState } from 'react';
import { authenticate } from '../../lib/actions';
import Link from 'next/link';

export default function LoginPage() {
  // Explicitly typing the action state to satisfy strict TS
  const [errorMessage, dispatch, isPending] = useActionState<string | undefined, FormData>(
    authenticate, 
    undefined
  );

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <form action={dispatch} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-slate-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-900">Log in to Verified Workers</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input type="email" name="email" required className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input type="password" name="password" required className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

        <button disabled={isPending} className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {isPending ? 'Logging in...' : 'Log in'}
        </button>
        
        <p className="mt-4 text-center text-sm text-slate-600">
          Do not have an account? <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">Register</Link>
        </p>
      </form>
    </div>
  );
}
