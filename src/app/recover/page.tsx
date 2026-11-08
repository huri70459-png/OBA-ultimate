// Native form recovery page. Its navigation and submit work even if client-side
// React event handlers have not hydrated yet.
import Link from "next/link";

interface RecoveryPageProps { searchParams: Promise<Record<string, string | string[] | undefined>> }

const RecoveryPage = async ({ searchParams }: RecoveryPageProps) => {
  const params = await searchParams;
  const message = params.success ? "Password reset. You are now signed in." : params.disabled ? "Recovery is not enabled for this workspace." : params.invalid ? "Check the email, recovery code, and password, then try again." : params.failed ? "Password reset failed. Please try again." : null;

  return (
    <main className="brain-workspace flex min-h-screen items-center justify-center p-4">
      <section className="w-full max-w-md rounded-2xl border border-primary/25 bg-card/70 p-6 shadow-2xl shadow-primary/10 backdrop-blur">
        <p className="text-sm font-bold tracking-tight text-foreground">PROJECT BRAIN OS</p>
        <h1 className="mt-5 text-base font-bold text-foreground">Reset owner password</h1>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Enter the owner email, the local recovery code, and a new password.</p>
        {message && <p className="mt-4 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-xs text-foreground">{message}</p>}
        <form action="/api/auth/reset" method="post" className="mt-4 space-y-3">
          <label className="block"><span className="mb-1 block text-[11px] font-medium text-muted-foreground">Owner email</span><input name="email" type="email" required autoComplete="email" className="w-full rounded-lg border border-input bg-background/70 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none" /></label>
          <label className="block"><span className="mb-1 block text-[11px] font-medium text-muted-foreground">New password (min 8 chars)</span><input name="newPassword" type="password" required minLength={8} autoComplete="new-password" className="w-full rounded-lg border border-input bg-background/70 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none" /></label>
          <label className="block"><span className="mb-1 block text-[11px] font-medium text-muted-foreground">Recovery code</span><input name="recoveryCode" type="password" required autoComplete="off" className="w-full rounded-lg border border-input bg-background/70 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none" /></label>
          <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary-400">Reset password</button>
        </form>
        <Link href="/" className="mt-3 block text-center text-[11px] text-muted-foreground transition-colors hover:text-foreground">Back to sign in</Link>
      </section>
    </main>
  );
};

export default RecoveryPage;
