import { useState } from "react";
import "./App.css";

const BOOKS = [
  { id: 1, title: "O'tkan kunlar", author: "Abdulla Qodiriy", category: "Roman", price: 45000, color: "#2F6F62" },
  { id: 2, title: "Mehrobdan chayon", author: "Abdulla Qodiriy", category: "Roman", price: 42000, color: "#1F2A44" },
  { id: 3, title: "Sariq devni minib", author: "Xudoyberdi To'xtaboyev", category: "Bolalar", price: 35000, color: "#C98B1B" },
  { id: 4, title: "Shum bola", author: "G'afur G'ulom", category: "Bolalar", price: 30000, color: "#7A3E65" },
  { id: 5, title: "Alkimyogar", author: "Paulo Koelo", category: "Falsafa", price: 55000, color: "#3E5C8A" },
  { id: 6, title: "Atom odatlar", author: "Jeyms Klir", category: "Rivojlanish", price: 68000, color: "#B5483A" },
  { id: 7, title: "Boy ota, kambag'al ota", author: "Robert Kiyosaki", category: "Rivojlanish", price: 60000, color: "#26734D" },
  { id: 8, title: "Ufq", author: "Said Ahmad", category: "Roman", price: 48000, color: "#4A4E69" },
];

const CATEGORIES = ["Hammasi", "Roman", "Bolalar", "Falsafa", "Rivojlanish"];

const formatPrice = (n) => n.toLocaleString("uz-UZ") + " so'm";

function Header({ query, onQuery, cartCount }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="logo">Kitobxon</a>
        <nav className="nav" aria-label="Asosiy menyu">
          <a href="#katalog">Katalog</a>
          <a href="#katalog">Yangiliklar</a>
          <a href="#footer">Aloqa</a>
        </nav>
        <input
          className="search"
          type="search"
          placeholder="Kitob yoki muallifni qidiring"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          aria-label="Qidiruv"
        />
        <button className="cart" type="button">Savat: {cartCount}</button>
      </div>
    </header>
  );
}

function BookCard({ book, onAdd }) {
  return (
    <article className="book">
      <div className="book__cover" style={{ background: book.color }}>
        <span>{book.title}</span>
      </div>
      <h3 className="book__title">{book.title}</h3>
      <p className="book__author">{book.author}</p>
      <div className="book__row">
        <strong>{formatPrice(book.price)}</strong>
        <button type="button" onClick={() => onAdd(book)}>Savatga</button>
      </div>
    </article>
  );
}

function Main({ query, category, onCategory, onAdd }) {
  const q = query.trim().toLowerCase();
  const list = BOOKS.filter(
    (b) =>
      (category === "Hammasi" || b.category === category) &&
      (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
  );

  return (
    <main id="top">
      <section className="hero">
        <div className="container">
          <h1>Keyingi kitobingiz shu yerda kutmoqda</h1>
          <p>O'zbek va jahon adabiyotining sevimli asarlari, uyingizgacha yetkazib beramiz.</p>
          <a className="hero__cta" href="#katalog">Katalogni ochish</a>
        </div>
      </section>

      <section id="katalog" className="container catalog">
        <div className="chips" role="tablist" aria-label="Turkumlar">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              className={c === category ? "chip chip--active" : "chip"}
              onClick={() => onCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="empty">Hech narsa topilmadi. Qidiruv so'zini o'zgartiring yoki boshqa turkumni tanlang.</p>
        ) : (
          <div className="grid">
            {list.map((b) => (
              <BookCard key={b.id} book={b} onAdd={onAdd} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="container footer__inner">
        <div>
          <p className="logo logo--light">Kitobxon</p>
          <p className="footer__text">Toshkent, Amir Temur ko'chasi 10</p>
        </div>
        <div>
          <p className="footer__head">Aloqa</p>
          <p className="footer__text">+998 71 000 00 00</p>
          <p className="footer__text">salom@kitobxon.uz</p>
        </div>
        <div>
          <p className="footer__head">Ish vaqti</p>
          <p className="footer__text">Dushanba – Shanba, 9:00 – 20:00</p>
        </div>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} Kitobxon. Barcha huquqlar himoyalangan.</p>
    </footer>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Hammasi");
  const [cart, setCart] = useState([]);

  return (
    <>
      <Header query={query} onQuery={setQuery} cartCount={cart.length} />
      <Main
        query={query}
        category={category}
        onCategory={setCategory}
        onAdd={(book) => setCart((c) => [...c, book])}
      />
      <Footer />
    </>
  );
}
