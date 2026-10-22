'use client';

import { useActionState } from 'react';
import { registerUser } from '../../lib/actions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [message, dispatch, isPending] = useActionState(registerUser, undefined);

  useEffect(() => {
    if (message === 'success') {
      router.push('/login');
    }
  }, [message, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form action={dispatch} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-900">Create an Account</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">I am a:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-gray-900 font-medium">
              <input type="radio" name="role" value="WORKER" defaultChecked /> Job Seeker
            </label>
            <label className="flex items-center gap-2 text-gray-900 font-medium">
              <input type="radio" name="role" value="EMPLOYER" /> Employer
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password (min 6 chars)</label>
          <input type="password" name="password" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>

        {message && message !== 'success' && <p className="text-red-500 text-sm mb-4">{message}</p>}

        <button disabled={isPending} className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 disabled:opacity-50">
          {isPending ? 'Registering...' : 'Register'}
        </button>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </form>
    </div>
  );
}
