'use client';

import React, { useState, useTransition } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Spinner } from '@/components/ui';
import { signIn } from 'next-auth/react';

interface SignupFormProps {}

export const SignupForm: React.FC<SignupFormProps> = ({}) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const hdSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    axios
      .post('/api/signup', data)
      .then((res) => {
        console.log(res);
        if (res.status !== 500) {
          signIn('credentials', {
            email: user.email,
            password: user.password,
            redirect: true,
            callbackUrl: '/',
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => router.push('/'));
  };
  return (
    <div className="w-full max-w-md rounded-md">
      <form
        action=""
        method="post"
        className="form"
        onSubmit={(e) => startTransition(() => hdSignUpSubmit(e))}
      >
        <div className="form_input">
          <input
            className="m_input peer"
            id="floating_name"
            type="text"
            name="name"
            placeholder=""
            required
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <label htmlFor="floating_name" className="form_label">
            Name
          </label>
        </div>
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
            type="password"
            name="password"
            placeholder=""
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <label htmlFor="floating_email" className="form_label">
            Password
          </label>
        </div>
        <button type="submit" className="form_btn">
          {isPending ? <Spinner /> : 'Sign Up'}
        </button>
      </form>
      <div className="form_more">
        <Link href={'/signin'}>or Sign In</Link>
      </div>
    </div>
  );
};
