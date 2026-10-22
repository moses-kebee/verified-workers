'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from './prisma';
import { signIn } from '../auth';
import { AuthError } from 'next-auth';

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['WORKER', 'EMPLOYER']),
});

export async function registerUser(prevState: string | undefined, formData: FormData) {
  try {
    const parsedData = RegisterSchema.safeParse(Object.fromEntries(formData));
    
    if (!parsedData.success) {
      return 'Invalid fields. Please check your inputs.';
    }

    const { email, password, role } = parsedData.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return 'Email already registered.';
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        workerProfile: role === 'WORKER' ? { create: { fullName: '', phoneNumber: '', skills: [], location: '' } } : undefined,
        employerProfile: role === 'EMPLOYER' ? { create: { companyName: '', industry: '' } } : undefined,
      },
    });

    return 'success';
  } catch (error) {
    console.error(error);
    return 'Something went wrong.';
  }
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logoutAction() {
  'use server';
  const { signOut } = await import('../auth');
  await signOut({ redirectTo: '/' });
}

import { revalidatePath } from 'next/cache';
import { auth } from '../auth';

export async function updateWorkerProfile(prevState: string | undefined, formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.email) return 'Not authenticated';

    const fullName = formData.get('fullName') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const location = formData.get('location') as string;
    const bio = formData.get('bio') as string;
    const skillsString = formData.get('skills') as string;
    
    // Split comma-separated skills into an array
    const skills = skillsString.split(',').map(s => s.trim()).filter(Boolean);

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return 'User not found';

    await prisma.workerProfile.update({
      where: { userId: user.id },
      data: {
        fullName,
        phoneNumber,
        location,
        bio,
        skills,
      },
    });

    revalidatePath('/dashboard/profile');
    revalidatePath('/dashboard');
    return 'success';
  } catch (error) {
    console.error(error);
    return 'Failed to update profile.';
  }
}
