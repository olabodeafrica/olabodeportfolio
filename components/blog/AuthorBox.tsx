import Link from 'next/link';
import { PERSON } from '@/lib/site';

// Author credibility block (E-E-A-T): who wrote this, why they're qualified, where to follow.
export default function AuthorBox() {
  return (
    <aside className="author-box" aria-label="About the author">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="author-box__photo" src={PERSON.image} alt={PERSON.name} width={64} height={64} loading="lazy" />
      <div>
        <p className="author-box__label">Written by</p>
        <p className="author-box__name">
          <Link href="/#about" rel="author">{PERSON.name}</Link>
        </p>
        <p className="author-box__bio">
          Product leader with 12 years building banking, payments and government technology across six African
          markets. I own the OMNI Channel banking suite at Inlaks and build payment infrastructure and agentic AI
          workflows.
        </p>
        <p className="author-box__links">
          <a href={PERSON.sameAs[0]} target="_blank" rel="noopener noreferrer me">LinkedIn</a>
          <a href={PERSON.sameAs[1]} target="_blank" rel="noopener noreferrer me">X</a>
          <Link href="/#work">Case studies</Link>
        </p>
      </div>
    </aside>
  );
}
