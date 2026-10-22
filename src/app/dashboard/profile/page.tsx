import { auth } from '../../../auth';
import prisma from '../../../lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ProfileForm from './ProfileForm';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.email) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { workerProfile: true },
  });

  if (!user || user.role !== 'WORKER') redirect('/dashboard');

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/dashboard" className="text-slate-500 hover:text-slate-900 font-medium">
            &larr; Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h1 className="text-xl font-semibold text-slate-900">Edit Profile</h1>
            <p className="text-slate-500 text-sm mt-1">This information will be visible to employers.</p>
          </div>
          
          <ProfileForm initialData={user.workerProfile} />
          
        </div>
      </div>
    </div>
  );
}
