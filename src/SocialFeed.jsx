import React from "react";
import { ArrowRight, BookOpen, Clock, HelpCircle, Image as ImageIcon, ListChecks, MessageCircle, Users } from "lucide-react";

function Avatar({ person }) {
  return <span className={`avatar ${person.color}`} aria-hidden="true">{person.initials}</span>;
}

// Adapted from the group's CreatePostBox. Each shortcut opens the corresponding Cùng Học flow.
function CreatePostBox({ user }) {
  return (
    <section className="card post-composer" aria-label="Chia sẻ với cộng đồng">
      <div className="composer">
        <Avatar person={user} />
        <a className="composer-prompt" href="#ask">Bạn muốn thảo luận điều gì hôm nay?</a>
      </div>
      <nav className="composer-actions" aria-label="Thao tác với bảng tin">
        <a className="button" href="#ask"><HelpCircle className="icon" /> Hỏi mentor</a>
        <a className="button" href="#home/resources"><ImageIcon className="icon" /> Tài liệu</a>
        <a className="button" href="#plan"><ListChecks className="icon" /> Kế hoạch</a>
      </nav>
    </section>
  );
}

// Uses the group's PostCard author, content, highlighted attachment and footer structure.
function PostCard({ post }) {
  const { person, meta, label, tone, title, text, attachment, href, count, action } = post;
  return (
    <article className="card post">
      <div className="post-content">
        <header className="post-header">
          <Avatar person={person} />
          <div><strong>{person.name}</strong><p className="muted small">{meta}</p></div>
          <span className={`badge ${tone}`}>{label}</span>
        </header>
        {title ? <h3 className="post-title">{title}</h3> : null}
        <p>{text}</p>
        {attachment ? (
          <a className="resource-preview" href={href}>
            <BookOpen className="icon" />
            <span><strong>{attachment.title}</strong><small>{attachment.subtitle}</small></span>
            <ArrowRight className="icon" />
          </a>
        ) : null}
      </div>
      <footer className="post-footer">
        <span className="muted small">{attachment ? <Clock className="icon" /> : <MessageCircle className="icon" />}{count}</span>
        <a className="button soft" href={href}><ArrowRight className="icon" />{action}</a>
      </footer>
    </article>
  );
}

export function SocialFeed({ title, user, query, filter, filters, clearUrl, posts }) {
  return (
    <>
      <header className="feed-heading">
        <p><Users className="icon" /> Cộng đồng học tập</p>
        <h1>{title}</h1>
      </header>
      <CreatePostBox user={user} />
      <form id="search-form" className="card composer search-form" role="search" data-filter={filter} key={clearUrl + "?" + query}>
        <input type="search" name="query" aria-label="Tìm tài liệu và hỏi đáp" placeholder="Tìm tài liệu và hỏi đáp..." maxLength={120} defaultValue={query} />
        <button className="button" type="submit">Tìm kiếm</button>
        {query ? <a className="button outline" href={clearUrl}>Xóa tìm kiếm</a> : null}
      </form>
      <nav className="feed-toolbar filters" aria-label="Lọc bảng tin">
        {filters.map(item => (
          <a key={item.id} className={`filter${item.id === filter ? " active" : ""}`} href={item.href}
            aria-current={item.id === filter ? "true" : undefined}>{item.label}</a>
        ))}
      </nav>
      {query ? <p role="status" className="muted small">{posts.length} kết quả cho “{query}”</p> : null}
      {posts.length ? posts.map(post => <PostCard key={post.href} post={post} />) : (
        <p className="card section muted">{query ? "Không tìm thấy nội dung phù hợp." : "Bạn chưa đăng vướng mắc nào."}</p>
      )}
    </>
  );
}
