import { useState } from "react";

const groceryItems = [
  {
    id: 1,
    name: "Novel Overlord Vol 16",
    quantity: 5,
  },
  {
    id: 2,
    name: "Komik Jojo Bizzare Adventure",
    quantity: 4,
  },
  {
    id: 3,
    name: "Komik One Punch Man",
    quantity: 1,
  },
];

export default function App() {
  const [items, setItems] = useState(groceryItems);

  function handleAddItem(item) {
    setItems([...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleClearItems() {
    setItems([]);
  }

  return (
    <div className="app">
      <Header />

      <Form onAddItem={handleAddItem} />

      <List items={items} onDeleteItem={handleDeleteItem} onClearItems={handleClearItems} />
    </div>
  );
}

function Header() {
  return <h1>Daftar Buku</h1>;
}

function Form({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    const newItem = { name, quantity, id: Date.now() };
    onAddItem(newItem);

    console.log(newItem);
    setName("");
    setQuantity(1);
  }

  const quantityNum = [...Array(10)].map((_, i) => (
    <option value={i + 1} key={i + 1}>
      {i + 1}
    </option>
  ));

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label>
          Kuantitas
          <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
            {quantityNum}
          </select>
        </label>
        <input type="text" placeholder="Masukkan Nama Buku" value={name} onChange={(e) => setName(e.target.value)}></input>
        <button type="submit">Tambah</button>
      </div>
    </form>
  );
}

function List({ items, onDeleteItem, onClearItems }) {
  return (
    <>
      <div className="list">
        <h2>Daftar Buku yang Tersedia:</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <span>
                {item.quantity} {item.name}
              </span>
              <button className="Hapus" onClick={() => onDeleteItem(item.id)}>
                Hapus
              </button>
            </li>
          ))}
        </ul>
        <div className="actions">
          <div className="button1">
            <button onClick={onClearItems}>Bersihkan Daftar Buku</button>
          </div>
        </div>
        <p>Perpustakaan Muhammad Hamzah Al Farisi</p>
      </div>
    </>
  );
}
