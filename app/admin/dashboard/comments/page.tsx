import { commentsConfigured, commentsDb, type CommentRow } from '@/lib/comments';
import { getAllPosts } from '@/lib/posts';
import CommentsClient from './CommentsClient';

export const metadata = { title: 'Comments — Admin' };

export default async function CommentsPage() {
  const posts = Object.fromEntries(getAllPosts().map(p => [p.slug, p.title]));

  if (!commentsConfigured()) {
    return (
      <div className="admin-page">
        <div className="admin-page-header"><div><h1>Comments</h1></div></div>
        <div className="admin-card admin-card--padded">
          Comments need <code>SUPABASE_SERVICE_ROLE_KEY</code> set in the environment.
        </div>
      </div>
    );
  }

  const { data, error } = await commentsDb()
    .from('blog_comments')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500);

  return (
    <CommentsClient
      comments={(data as CommentRow[] | null) ?? []}
      posts={posts}
      loadError={error ? 'Could not load comments. Has the blog_comments migration been run in Supabase?' : ''}
    />
  );
}
