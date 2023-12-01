import React from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="h-full w-full">
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <h1 className="text-center text-8xl font-bold text-neutral-900">404</h1>
        <p className="text-center text-4xl font-medium text-neutral-600">
          Page not found
        </p>
        <button
          onClick={router.back}
          className="mt-5 rounded-full bg-violet-700 px-10 py-3 text-white hover:bg-violet-800"
        >
          Go back
        </button>
      </div>
    </section>
  );
}

