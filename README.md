# 💬 MyChat

MyChat is a simple, browser-based real-time chat simulation app built using **HTML**, **CSS**, and **JavaScript**, utilizing `localStorage` and `sessionStorage` for persistent user data and message history across sessions.

---

##  Features

- **LocalStorage + SessionStorage**: Stores messages and active users without a backend.
- **Real-time Updates**: Uses `storage` events to update messages and users across browser tabs.
- **User Presence**: Tracks active users in `activeUsers` and removes them on tab close.
- **Clean Chat UI**: User-friendly interface styled with CSS.
- **Message History**: All messages are saved and persist on page reload.

---

## 🛠️ Tech Stack

- **HTML** – Structure of the app.
- **CSS** – Styling for chat interface.
- **JavaScript** – Functionality for chat, storage handling, and dynamic UI updates.
- **Web Storage API**
  - `sessionStorage` – Tracks current user in the active session.
  - `localStorage` – Persists chat data and user list across tabs and reloads.

---

## 🧪 How to Run

1. Clone or download this repository.
2. Open `index.html` in any modern browser.
3. Open multiple tabs to simulate multiple users (set different `sessionStorage` users via console).