import { useEffect, useRef, useState } from "react";
import banner from "./assets/hatay-doner-banner.png";
import "./doydoy.css";

const restaurant = {
  name: "Doy Doy Hatay Döner",
  address: "",
  phone: "0535 106 59 27",
  hours: [
    { day: "Pazartesi", hours: "10:00–01:00" },
    { day: "Salı", hours: "10:00–01:00" },
    { day: "Çarşamba", hours: "09:00–00:00" },
    { day: "Perşembe", hours: "09:00–00:00" },
    { day: "Cuma", hours: "09:00–00:00" },
    { day: "Cumartesi", hours: "09:00–00:00" },
    { day: "Pazar", hours: "Kapalı" },
  ],
  mapEmbedUrl: "https://maps.google.com/maps?q=37.1969566,28.3729716&z=17&output=embed",
  mapsUrl: "https://www.google.com/maps/place/Doy+doy+hatay+d%C3%B6ner/data=!4m2!3m1!1s0x14bf737f2b725b97:0x9b6f591316be11ae",
};

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}
interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  // ── 1. DÖNER & DÜRÜM ────────────────────────────────────
  {
    id: "doner-durum",
    name: "Döner & Dürüm",
    items: [
      {
        id: "pilav-ustu",
        name: "Pilav Üstü",
        description: "Tereyağlı pirinç pilavı üzerinde bol döner eti",
        price: 300,
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "ekmek-arasi",
        name: "Ekmek Arası",
        description: "Taze ekmek içinde lezzetli Hatay döneri",
        price: 220,
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "hatay-soslu-durum",
        name: "Hatay Soslu Dürüm",
        description: "Özel Hatay sosu ile hazırlanan lezzetli dürüm",
        price: 220,
        image: "https://images.unsplash.com/photo-1561651188-d207bbec4ec3?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "zurna-durum",
        name: "Zurna Dürüm",
        description: "Büyük boy zurna dürüm, bol döner eti ile",
        price: 270,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "kasarli-durum",
        name: "Kaşarlı Dürüm",
        description: "Erimiş kaşar peyniri ile zenginleştirilmiş dürüm",
        price: 250,
        image: "https://images.unsplash.com/photo-1561651188-d207bbec4ec3?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "kasarli-zurna-durum",
        name: "Kaşarlı Zurna Dürüm",
        description: "Büyük boy, kaşar peynirli özel zurna dürüm",
        price: 300,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "full-karisik-zurna-durum",
        name: "Full Karışık Soslu Zurna Dürüm",
        description: "Büyük boy, tüm soslarımızla hazırlanan özel zurna dürüm",
        price: 270,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "full-karisik-durum",
        name: "Full Karışık Soslu Dürüm",
        description: "Tüm soslarımız bir arada, tam lezzet dürüm",
        price: 220,
        image: "https://images.unsplash.com/photo-1561651188-d207bbec4ec3?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "mantar-soslu-durum",
        name: "Mantar Soslu Dürüm",
        description: "Özel mantar sosu ile hazırlanan lezzetli dürüm",
        price: 220,
        image: "https://images.unsplash.com/photo-1561651188-d207bbec4ec3?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "mantar-soslu-zurna-durum",
        name: "Mantar Soslu Zurna Dürüm",
        description: "Büyük boy, özel mantar sosu ile zurna dürüm",
        price: 270,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=400&fit=crop&auto=format",
      },
    ],
  },

  // ── 2. MENÜLER ──────────────────────────────────────────
  {
    id: "menuler",
    name: "Menüler",
    items: [
      {
        id: "durum-ayran-menu",
        name: "Dürüm Ayran Menü",
        description: "Hatay dürüm + soğuk ev yapımı ayran",
        price: 220,
        image: "https://images.unsplash.com/photo-1561651188-d207bbec4ec3?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "durum-menu",
        name: "Dürüm Menü",
        description: "Hatay dürüm + içecek seçeneği",
        price: 270,
        image: "https://images.unsplash.com/photo-1561651188-d207bbec4ec3?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "ekmek-arasi-ayran-menu",
        name: "Ekmek Arası Ayran Menü",
        description: "Ekmek arası döner + soğuk ev yapımı ayran",
        price: 220,
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "zurna-menu",
        name: "Zurna Menü",
        description: "Büyük boy zurna dürüm + içecek seçeneği",
        price: 300,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=400&fit=crop&auto=format",
      },
    ],
  },

  // ── 3. PİDE & LAHMACUN ──────────────────────────────────
  {
    id: "pide-lahmacun",
    name: "Pide & Lahmacun",
    items: [
      {
        id: "kiymalı-pide",
        name: "Kıymalı Pide",
        description: "Geleneksel Türk kıymalı pidesi, fırından taze",
        price: 200,
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "kusbasi-pide",
        name: "Kuşbaşılı Pide",
        description: "Bol kuşbaşı et ile doyurucu fırın pidesi",
        price: 300,
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "kasarli-pide",
        name: "Kaşarlı Pide",
        description: "Bol kaşar peynirli fırın pidesi",
        price: 180,
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "karisik-pide",
        name: "Karışık Pide",
        description: "Kıyma, kuşbaşı ve kaşar peynirli karışık pide",
        price: 330,
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "peynirli-pide",
        name: "Peynirli Pide",
        description: "Beyaz peynir ile hazırlanan geleneksel pide",
        price: 180,
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "sucuklu-pide",
        name: "Sucuklu Pide",
        description: "Türk sucuğu ile lezzetli fırın pidesi",
        price: 200,
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "lahmacun",
        name: "Lahmacun",
        description: "İnce hamur üzerinde kıymalı Türk lahmacunu",
        price: 120,
        image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "extra-lahmacun",
        name: "Extra Lahmacun",
        description: "Ekstra malzemeli, büyük boy lahmacun",
        price: 150,
        image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "kasarli-lahmacun",
        name: "Kaşarlı Lahmacun",
        description: "Üzerinde erimiş kaşar peyniri ile lahmacun",
        price: 180,
        image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=600&h=400&fit=crop&auto=format",
      },
    ],
  },

  // ── 4. PİZZA ────────────────────────────────────────────
  {
    id: "pizza",
    name: "Pizza",
    items: [
      {
        id: "karisik-pizza",
        name: "Karışık Pizza",
        description: "Et, mantar, biber, soğan ve zeytinli karışık pizza",
        price: 250,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "sucuklu-pizza",
        name: "Sucuklu Pizza",
        description: "Türk sucuğu ve kaşar peyniri ile pizza",
        price: 200,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "tonbalikli-pizza",
        name: "Tonbalıklı Pizza",
        description: "Ton balığı, soğan ve kapari ile pizza",
        price: 200,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "vejeteryan-pizza",
        name: "Vejeteryan Pizza",
        description: "Taze sebzeler, mantar ve kaşar peynirli pizza",
        price: 180,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "peynirli-pizza",
        name: "Peynirli Pizza",
        description: "Dört çeşit peynirle hazırlanan özel pizza",
        price: 190,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "margarita-pizza",
        name: "Margarita Pizza",
        description: "Domates sosu, mozzarella ve taze fesleğen",
        price: 190,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop&auto=format",
      },
    ],
  },

  // ── 5. TATLILAR & ATIŞTIRMALIK ──────────────────────────
  {
    id: "tatlilar-atistirmalik",
    name: "Tatlılar & Atıştırmalık",
    items: [
      {
        id: "kunefe",
        name: "Künefe",
        description: "Taze peynirli tel kadayıf, şerbet ve fıstık ile sıcak servis",
        price: 200,
        image: "https://images.unsplash.com/photo-1676014959543-81df1079b423?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "sutlac",
        name: "Sütlaç",
        description: "Geleneksel fırın sütlacı, tarçın ile servis",
        price: 100,
        image: "https://images.unsplash.com/photo-1606728099646-68d5a0a4d423?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "patso",
        name: "Patso",
        description: "Çıtır çıtır kızarmış patates",
        price: 150,
        image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "cips",
        name: "Cips",
        description: "Çıtır cips atıştırmalık",
        price: 100,
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&h=400&fit=crop&auto=format",
      },
    ],
  },

  // ── ÇİĞKÖFTE ────────────────────────────────────────────
  {
    id: "cigkofte",
    name: "Çiğköfte",
    items: [
      {
        id: "cigkofte-durum-ayran-menu",
        name: "Çiğköfte Dürüm Ayran (100 gr) Menü",
        description: "Çiğköfte dürüm + soğuk ev yapımı ayran",
        price: 150,
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "cigkofte-durum-ayran-menu-150",
        name: "Çiğköfte Dürüm Ayran (150 gr) Menü",
        description: "150 gram çiğköfte ile dürüm + soğuk ev yapımı ayran",
        price: 170,
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "cigkofte-500",
        name: "500 gr Çiğköfte",
        description: "El yapımı 500 gram çiğköfte, limon ve nar ekşisi ile",
        price: 300,
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "cigkofte-1000",
        name: "1 Kg Çiğköfte",
        description: "El yapımı 1 kilogram çiğköfte, limon ve nar ekşisi ile",
        price: 500,
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop&auto=format",
      },
    ],
  },

  // ── 6. İÇECEKLER ────────────────────────────────────────
  {
    id: "icecekler",
    name: "İçecekler",
    items: [
      {
        id: "cay",
        name: "Çay",
        description: "Demlikten taze ince belli bardakta Türk çayı",
        price: 10,
        image: "https://images.unsplash.com/photo-1564890369478-c89ca3d9cdd6?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "kucuk-ayran",
        name: "Küçük Ayran",
        description: "Soğuk ev yapımı ayran",
        price: 30,
        image: "https://images.unsplash.com/photo-1558113583-d75f23fcb8a9?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "buyuk-ayran",
        name: "Büyük Ayran",
        description: "Büyük boy soğuk ev yapımı ayran",
        price: 50,
        image: "https://images.unsplash.com/photo-1558113583-d75f23fcb8a9?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "coca-cola",
        name: "Coca Cola",
        description: "Soğuk Coca Cola, 330ml",
        price: 80,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "fanta",
        name: "Fanta",
        description: "Soğuk Fanta, 330ml",
        price: 80,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "fuse-tea",
        name: "Fuse Tea",
        description: "Soğuk Fuse Tea, 330ml",
        price: 80,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&h=400&fit=crop&auto=format",
      },
      {
        id: "salgam",
        name: "Şalgam",
        description: "Soğuk geleneksel Türk şalgam suyu",
        price: 50,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop&auto=format",
      },
    ],
  },
];


const money = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 });
const normalizeSearch = (value: string) => value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i");

export default function BoldUrbanStandalone() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const categoryPickerRef = useRef<HTMLDivElement>(null);
  const categoryButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!categoriesOpen) return;
    const outside = (event: PointerEvent) => {
      if (!categoryPickerRef.current?.contains(event.target as Node)) setCategoriesOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCategoriesOpen(false);
        categoryButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [categoriesOpen]);

  useEffect(() => {
    if (!infoOpen) return;
    const dialog = dialogRef.current;
    dialog?.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = oldOverflow;
    };
  }, [infoOpen]);

  const selectCategory = (id: string) => {
    setActive(id);
    setQuery("");
    setCategoriesOpen(false);
    categoryButtonRef.current?.focus();
    requestAnimationFrame(() => {
      const nav = navRef.current;
      const results = document.getElementById("dd-menu-results");
      if (nav && results && results.getBoundingClientRect().top < nav.offsetHeight) {
        window.scrollTo({ top: results.getBoundingClientRect().top + window.scrollY - nav.offsetHeight });
      }
    });
  };
  const search = normalizeSearch(query.trim());
  const visibleCategories = menuCategories
    .filter(category => active === "all" || category.id === active)
    .map(category => ({ ...category, items: category.items.filter(item => !search || normalizeSearch(item.name + " " + item.description + " " + category.name).includes(search)) }))
    .filter(category => category.items.length > 0);
  const resultCount = visibleCategories.reduce((count, category) => count + category.items.length, 0);
  const categoryOptions = [{ id: "all", name: "Tüm kategoriler" }, ...menuCategories];

  return (
    <div className="dd-menu">
      <header className="dd-hero">
        <img className="dd-banner" src={banner} alt="" width="1536" height="1024" fetchPriority="high" />
        <div className="dd-hero-shade" />
        <div className="dd-hero-inner">
          <button className="dd-info-button" type="button" onClick={() => setInfoOpen(true)} aria-label="Mekan bilgileri" aria-haspopup="dialog" aria-expanded={infoOpen}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7v1" /></svg>
            <span>Bilgi</span>
          </button>
          <div className="dd-brand">
            <h1><span>Doy Doy</span><span>Hatay Döner</span></h1>
          </div>
        </div>
      </header>

      <nav className="dd-nav" ref={navRef} aria-label="Menü kategorileri">
        <div className="dd-toolbar">
          <div className="dd-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
            <input type="search" aria-label="Menüde ara" placeholder="Menüde ara…" value={query} onChange={event => { setQuery(event.target.value); setActive("all"); }} />
          </div>
          <div className="dd-category-picker" ref={categoryPickerRef}>
            <button ref={categoryButtonRef} className="dd-category-toggle" type="button" aria-label="Kategoriler" aria-expanded={categoriesOpen} aria-controls="dd-category-dropdown" onClick={() => setCategoriesOpen(open => !open)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            {categoriesOpen && <div className="dd-category-dropdown" id="dd-category-dropdown">
              {categoryOptions.map(category => <button key={category.id} type="button" aria-pressed={active === category.id} onClick={() => selectCategory(category.id)}>{category.name}</button>)}
            </div>}
          </div>
        </div>
        <div className="dd-nav-inner">
          {categoryOptions.map(category => (
            <button type="button" key={category.id} onClick={() => selectCategory(category.id)} aria-pressed={active === category.id}>
              {category.name}
            </button>
          ))}
        </div>
      </nav>

      <main className="dd-content" id="dd-menu-results">
        <p className="dd-results" role="status">{query.trim() ? `“${query.trim()}” için ${resultCount} ürün` : `${categoryOptions.find(category => category.id === active)?.name} · ${resultCount} ürün`}</p>
        {!resultCount && <div className="dd-empty"><h2>Ürün bulunamadı</h2><p>Başka bir ürün adıyla arayın.</p><button type="button" onClick={() => selectCategory("all")}>Tüm menüyü göster</button></div>}
        {visibleCategories.map(category => (
          <section className="dd-section" id={category.id} key={category.id} aria-labelledby={category.id + "-heading"}>
            <h2 id={category.id + "-heading"}>{category.name}</h2>
            <div className="dd-grid">
              {category.items.map(item => (
                <article className="dd-card" key={item.id}>
                  <img className="dd-product-image" src={item.image} alt={item.name} loading="lazy" width="600" height="400" />
                  <div className="dd-card-body">
                    <div className="dd-product-heading">
                      <h3>{item.name}</h3>
                      <span className="dd-price">{money.format(item.price)} ₺</span>
                    </div>
                    <p className="dd-description">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="dd-footer">
        <p>{restaurant.name}</p>
        <a href={restaurant.mapsUrl} target="_blank" rel="noopener noreferrer">Konumu haritada aç</a>
        <small>© {new Date().getFullYear()} {restaurant.name}</small>
      </footer>

      <dialog ref={dialogRef} className="dd-info-dialog" aria-labelledby="dd-info-title" onCancel={() => setInfoOpen(false)} onClose={() => setInfoOpen(false)} onClick={event => { if (event.target === event.currentTarget) setInfoOpen(false); }}>
        <div className="dd-info-panel">
          <div className="dd-dialog-heading">
            <div><p>Mekan bilgileri</p><h2 id="dd-info-title">{restaurant.name}</h2></div>
            <button className="dd-close" type="button" onClick={() => setInfoOpen(false)} aria-label="Bilgi penceresini kapat" autoFocus>×</button>
          </div>
          <section className="dd-info-section">
            <h3>Konum</h3>
            {restaurant.address && <p>{restaurant.address}</p>}
            {infoOpen && <iframe className="dd-map" title="Doy Doy Hatay Döner konumu — Google Maps" src={restaurant.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />}
          </section>
          <section className="dd-info-section">
            <h3>Telefon</h3>
            {restaurant.phone ? <a href={"tel:" + restaurant.phone.replace(/[^+\d]/g, "")}>{restaurant.phone}</a> : <p>Telefon bilgisi henüz eklenmedi.</p>}
          </section>
          <section className="dd-info-section">
            <h3>Çalışma saatleri</h3>
            {restaurant.hours.length ? <dl>{restaurant.hours.map(row => <div className="dd-hours-row" key={row.day}><dt>{row.day}</dt><dd>{row.hours}</dd></div>)}</dl> : <p>Çalışma saatleri henüz eklenmedi.</p>}
          </section>
        </div>
      </dialog>
    </div>
  );
}
