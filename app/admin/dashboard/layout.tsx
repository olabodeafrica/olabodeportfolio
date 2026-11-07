import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { commentsConfigured, commentsDb } from '@/lib/comments';
import { COMMENTS_SEEN_COOKIE } from '@/lib/comments-shared';
import { createClient } from '@/lib/supabase/server';
import AdminNav from './AdminNav';

export const metadata = { robots: { index: false, follow: false } };
import './admin.css';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin');

  const newComments = await countNewComments();

  return (
    <div className="admin-shell">
      <AdminNav userEmail={user.email ?? ''} badges={{ '/admin/dashboard/comments': newComments }} />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}

// Reader comments posted since the admin last opened the Comments page (0 if unavailable).
async function countNewComments(): Promise<number> {
  if (!commentsConfigured()) return 0;
  try {
    const seen = Number((await cookies()).get(COMMENTS_SEEN_COOKIE)?.value ?? 0);
    const { count } = await commentsDb()
      .from('blog_comments')
      .select('id', { count: 'exact', head: true })
      .eq('is_author', false)
      .gt('created_at', new Date(Number.isFinite(seen) ? seen : 0).toISOString());
    return count ?? 0;
  } catch {
    return 0;
  }
}
