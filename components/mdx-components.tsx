import { Children, isValidElement, type ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';
import { slugifyHeading } from '@/lib/posts';

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return '';
}

// Markdown images become captioned figures; the alt text doubles as the caption.
function Figure({ src = '', alt = '' }: { src?: string; alt?: string }) {
  return (
    <figure className="post-figure">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={894} height={521} loading="lazy" decoding="async" />
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  );
}

// MDX creates <img> elements with this component as their type, so <p> can detect a lone image.
const Img: MDXComponents['img'] = props => <Figure src={props.src as string} alt={props.alt} />;

export const mdxComponents: MDXComponents = {
  img: Img,
  // Markdown wraps a lone image in <p>; unwrap it so <figure> isn't nested inside <p>.
  p: ({ children }) => {
    const kids = Children.toArray(children);
    if (kids.length === 1 && isValidElement(kids[0]) && kids[0].type === Img) return <>{kids}</>;
    return <p>{children}</p>;
  },
  h2: ({ children }) => <h2 id={slugifyHeading(textOf(children))}>{children}</h2>,
  table: props => (
    <div className="post-table">
      <table {...props} />
    </div>
  ),
  a: ({ href = '', ...props }) => (
    <a
      href={href}
      {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    />
  ),
};
