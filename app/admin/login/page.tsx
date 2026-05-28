"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = null;

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    loginAction,
    initialState
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <form action={formAction} className="w-full max-w-sm bg-surface border border-border p-8">
        <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-3">
          FFE Admin
        </p>
        <h1 className="font-display font-light text-3xl text-white mb-8 leading-none">
          Sign in
        </h1>

        <label className="block mb-5">
          <span className="font-label tracking-widest text-[10px] text-muted-dark uppercase">
            Email
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            autoFocus
            className="mt-2 w-full bg-black border border-border px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </label>

        <label className="block mb-6">
          <span className="font-label tracking-widest text-[10px] text-muted-dark uppercase">
            Password
          </span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            className="mt-2 w-full bg-black border border-border px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </label>

        {state?.error && (
          <p className="text-sm text-red-400 mb-4">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-accent text-black font-label tracking-widest text-xs uppercase px-8 py-3 hover:bg-accent-dim transition-colors disabled:opacity-50"
        >
          {isPending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
