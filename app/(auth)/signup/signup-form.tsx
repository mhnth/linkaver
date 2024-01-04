'use client';

import React, { useState, useTransition } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Spinner } from '@/components/ui';

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
      })
      .catch((err) => console.log(err))
      .finally(() => router.push('/'));
  };
  return (
    <div className="w-full max-w-md rounded-md bg-white p-6">
      <form
        action=""
        method="post"
        className="form"
        onSubmit={(e) => startTransition(() => hdSignUpSubmit(e))}
      >
        <div className="form_input">
          <input
            className="m_input"
            type="text"
            name="name"
            placeholder="Username"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="form_input">
          <input
            className="m_input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="form_input">
          <input
            className="m_input"
            type="password"
            name="password"
            placeholder="**********"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
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
