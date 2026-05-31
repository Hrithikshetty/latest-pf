import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LogoMark from "./LogoMark";
import styles from "./SubPageHeader.module.scss";

export default function SubPageHeader({
  backHref = "/",
  backLabel = "Back",
  children,
}) {
  return (
    <header className={styles.header}>
      <div className={`section-container ${styles.inner} subpage-header-inner`}>
        <Link href={backHref} className={`link ${styles.backBtn}`}>
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>{backLabel}</span>
        </Link>

        {children ? (
          <div className={styles.actions}>{children}</div>
        ) : (
          <div className={styles.spacer} aria-hidden />
        )}

        <LogoMark href="/" />
      </div>
    </header>
  );
}
