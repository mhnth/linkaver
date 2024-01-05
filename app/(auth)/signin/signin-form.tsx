'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Spinner } from '@/components/ui';

interface SignInFormProps {}

export const SignInForm: React.FC<SignInFormProps> = ({}) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const hdSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      signIn('credentials', {
        email: user.email,
        password: user.password,
        redirect: true,
        callbackUrl: '/',
      });
    } catch {
      console.log('Error while logging in');
    }
  };

  return (
    <div className="w-full max-w-md rounded-md">
      <form
        action=""
        method="post"
        className="form"
        onSubmit={(e) => startTransition(() => hdSubmit(e))}
      >
        <div className="form_input">
          <input
            className="m_input peer"
            id="floating_email"
            type="email"
            name="email"
            placeholder=""
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label htmlFor="floating_email" className="form_label">
            Email
          </label>
        </div>
        <div className="form_input">
          <input
            className="m_input peer"
            id="floating_pwd"
            type="password"
            name="pwd"
            placeholder=""
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <label htmlFor="floating_pwd" className="form_label">
            Password
          </label>
        </div>

        <button type="submit" className="form_btn">
          {isPending ? <Spinner /> : 'Sign In'}
        </button>
      </form>
      <div className="form_more">
        <Link href={'/signup'}>or Sign Up</Link>
      </div>
    </div>
  );
};
