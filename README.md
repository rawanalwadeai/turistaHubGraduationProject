# Turista Hub 

---

## 1. Giriş (Introduction)

Turista Hub, Türkiye seyahatlerini kolaylaştırmak için geliştirilmiş çok yönlü bir dijital platformdur.  
Platform, konaklama, araç kiralama, tekne turu, tercümanlık ve tur hizmetlerini tek bir yerde sunarak kullanıcı dostu ve entegre bir deneyim sağlar.

---

## 2. Proje Yapısı (Project Structure)

- `backend/` — Sunucu tarafı kodları (Node.js, Express, MongoDB)  
- `frontend/` — İstemci tarafı kodları (React.js)  
- `.gitignore` — Git tarafından takip edilmeyecek dosya ve klasörleri belirler  
- `.env` — Ortam değişkenleri (MongoDB bağlantı dizesi vb.) — gizli tutulmalıdır

---

## 3. Gereksinimler (Requirements)

- Node.js v18.x önerilir  
- npm (Node Package Manager)  
-  MongoDB Compass
-  env dosyas ekleyin 

---

## 4. Kurulum ve Çalıştırma (Setup & Run)

### 4.1. Projeyi klonlayın:

```bash
git clone <repository-url>
cd turistaHubGraduationProject

### 4.2.  Bağımlılıkları yükleyin:

# Backend klasörüne gidin ve bağımlılıkları yükleyin
cd turista-hubApi-v2
npm install

# Frontend klasörüne gidin ve bağımlılıkları yükleyin
cd ../turista-hub-v2
npm install

 ### 4.3. Sunucuları başlatın

# Backend için (geliştirme modunda otomatik izler)
cd turista-hubApi-v2
npm run start-dev

# Başka terminalde frontend için
cd turista-hub-v2
npm start


## 5. Veritabanı Verilerini Görüntüleme
MongoDB Compass uygulamasını indirip kurabilirsiniz: https://www.mongodb.com/products/compass
Uygulamayı açın ve .env dosyasındaki MONGO_URI bağlantı dizesini yapıştırarak Connect butonuna tıklayın.
Veritabanındaki koleksiyonları ve dokümanları görüntüleyebilirsiniz.




