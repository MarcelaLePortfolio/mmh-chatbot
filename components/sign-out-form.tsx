'use client';

export function SignOutForm() {
  return (
    <form
      action="/auth/sign-out"
      method="post"
      className="w-full flex justify-center"
    >
      <button
        type="submit"
        className="text-sm text-muted-foreground hover:underline"
      >
        Sign Out
      </button>
    </form>
  );
}
