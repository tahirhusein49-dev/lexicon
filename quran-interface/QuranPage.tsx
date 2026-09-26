import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Bookmark, BookOpen, ChevronLeft, Search, Settings2 } from "lucide-react";

const SURAHS = [
  { number: 1, name: "الفاتحة", verses: 7, meaning: "الافتتاح والثناء والهداية" },
  { number: 2, name: "البقرة", verses: 286, meaning: "الإيمان والتشريع وبناء الأمة" },
  { number: 3, name: "آل عمران", verses: 200, meaning: "التوحيد والثبات والمحاجة" },
  { number: 4, name: "النساء", verses: 176, meaning: "الأسرة والحقوق والعدل" },
  { number: 5, name: "المائدة", verses: 120, meaning: "العهود والحلال والحرام" },
  { number: 6, name: "الأنعام", verses: 165, meaning: "التوحيد وآيات الخلق" },
];

export default function QuranPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(1);
  const current = SURAHS.find(surah => surah.number === selected) ?? SURAHS[0];
  const filtered = useMemo(() => SURAHS.filter(surah => `${surah.name} ${surah.number}`.includes(query.trim())), [query]);

  return <main className="quran-shell" dir="rtl">
    <header className="quran-header"><div className="quran-header-inner"><Link href="/" className="quran-brand"><span className="brand-mark"><BookOpen size={20} /></span><span><strong>المصحف الشريف</strong><small>قراءة وتأمل وربط حقولي</small></span></Link><nav><Link href="/">المعجم</Link><Link href="/about">المنهج</Link><button aria-label="إعدادات القراءة"><Settings2 size={17} /></button></nav></div></header>
    <section className="quran-hero"><div><span className="section-kicker">واجهة القراءة القرآنية</span><h1>المصحف الشريف</h1><p>مساحة هادئة لقراءة السور، ثم الانتقال من الآية إلى الحقل الدلالي والأصل الحقولي دون تشويش على النص.</p></div><div className="quran-hero-mark"><BookOpen size={30} /><span>اقرأ<br /><em>بتدبر</em></span></div></section>
    <section className="quran-layout"><aside className="surah-sidebar"><div className="surah-sidebar-head"><div><span className="section-kicker">الفهرس</span><h2>السور</h2></div><span className="surah-count">{SURAHS.length} / 114</span></div><label className="quran-search"><Search size={15} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="ابحث عن سورة" /></label><div className="surah-list">{filtered.map(surah => <button key={surah.number} className={`surah-item ${selected === surah.number ? "active" : ""}`} onClick={() => setSelected(surah.number)}><span className="surah-number">{String(surah.number).padStart(2, "0")}</span><span><strong>{surah.name}</strong><small>{surah.verses} آية · {surah.meaning}</small></span><ChevronLeft size={15} /></button>)}</div><p className="surah-note">الفهرس المعروض حالياً نموذج أولي قابل للتوسعة إلى الفهرس الكامل بعد اعتماد مصدر النص وبيانات السور.</p></aside><article className="reading-pane"><div className="reading-toolbar"><div><span className="section-kicker">السورة {String(current.number).padStart(3, "0")}</span><h2>سورة {current.name}</h2></div><div className="reading-actions"><button title="حفظ موضع القراءة"><Bookmark size={17} /></button><span>{current.verses} آية</span></div></div><div className="basmala">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div><div className="quran-empty"><div className="quran-empty-icon"><BookOpen size={25} /></div><h3>مساحة النص القرآني المعتمد</h3><p>تم تجهيز واجهة القراءة ومسارات السور. سيُعرض النص القرآني هنا بعد ربط مصدر مصحف موثوق ومراجع، مع إبقاء النص منفصلاً عن طبقة التحليل الحقولي.</p><div className="quran-empty-meta"><span>السورة: {current.name}</span><span>عدد الآيات: {current.verses}</span><span>الربط الحقولي: جاهز</span></div></div><div className="reading-footer"><span>انتقل من القراءة إلى التحليل عند الحاجة</span><Link href="/">استكشف الحقول <ArrowRight size={15} /></Link></div></article></section>
  </main>;
}
