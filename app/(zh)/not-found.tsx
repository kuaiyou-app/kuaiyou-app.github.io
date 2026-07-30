import Link from "next/link";

import homeStyles from "@/components/HomePage.module.css";
import skillStyles from "@/components/SkillCard.module.css";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className={`${homeStyles.container} animate-fade-in ${skillStyles["not-found"]}`}
    >
      <div className={`glass-panel ${skillStyles["not-found-panel"]}`}>
        <p className={`${homeStyles["hero-badge"]} code-font`}>404</p>
        <h1>页面未找到 / Page not found</h1>
        <p>
          该路径不属于本站，请返回首页或查看安装指南。
          <br />
          That route is not part of this site. Try the homepage or setup guide.
        </p>
        <div className={homeStyles["hero-actions"]}>
          <Link href="/" className="btn btn-primary">中文首页</Link>
          <Link href="/docs/#quick-start" className="btn btn-secondary">中文文档</Link>
          <Link href="/en/" className="btn btn-primary">English home</Link>
          <Link href="/en/docs/#quick-start" className="btn btn-secondary">English docs</Link>
        </div>
      </div>
    </main>
  );
}
