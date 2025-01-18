# E-Commerce Full-Stack Projesi

Bu proje, Node.js ve MongoDB ile geliştirilen bir backend ve React tabanlı bir frontend içeren tam kapsamlı bir e-ticaret uygulamasıdır. Kullanıcılar için dinamik bir alışveriş deneyimi sağlarken, yöneticiler için ürün yönetimi özellikleri sunmaktadır.

## Özellikler

### Kullanıcı Özellikleri

- **Üyelik Sistemi**: Kullanıcılar yeni bir hesap oluşturabilir ve mevcut hesaplarıyla giriş yapabilir.
- **Şifre Sıfırlama**: "Şifremi Unuttum" seçeneği ile şifre sıfırlama e-postası gönderilebilir.
- **Ürün Arama**: Header'da bulunan arama çubuğu ile istenilen ürün bulunabilir.
- **Ürün Kartları**: Anasayfada seçili ürünler ve ürünler sayfasında tüm ürünler listelenir.
- **Filtreleme**: Kategorilere, fiyat aralıklarına ve puanlamaya göre ürünler filtrelenebilir.
- **Sepet Yönetimi**: Kullanıcılar ürünleri sepete ekleyip sepet detaylarını görüntüleyebilir.
- **Profil Yönetimi**: Profil sayfasından kullanıcı bilgileri güncellenebilir.
- **Yetkisiz Erişim Kısıtlamaları**: Giriş yapılmadan profil ve sepet sayfalarına erişim engellenir.

### Yönetici Özellikleri

- **Ürün Yönetimi**: Yöneticiler ürün ekleme, silme ve güncelleme işlemleri yapabilir.
- **Yetki Kontrolü**: Sadece admin rolüne sahip kullanıcılar panel sayfasına erişebilir.

### Medya Yönetimi

- **Cloudinary Entegrasyonu**: Ürün görselleri ve kullanıcı avatarları Cloudinary üzerinde saklanmaktadır.

## Kullanılan Teknolojiler

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**

### Frontend

- **React**
- **Redux Toolkit**
- **React Pagination**
- **React Router DOM**
- **React Slick**
- **React Star Ratings**
- **React Toastify**
- **React Icons**
- **Tailwind CSS**

### Diğer

- **Cloudinary**: Ürün görselleri ve kullanıcı avatarlarının güvenli bir şekilde saklanması.
- **Local Storage**: Kullanıcı login ve sepet bilgileri tarayıcıda saklanır.

## Kurulum ve Çalıştırma

### Backend

1. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. `.env` dosyasını oluşturun ve aşağıdaki değişkenleri ekleyin:
   ```env
   PORT=3094
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   MAILTRAP_USER=your_mailtrap_username
   MAILTRAP_PASS=your_mailtrap_password
   ```
3. Sunucuyu başlatın:
   ```bash
   npm run dev
   ```

### Frontend

1. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Uygulamayı başlatın:
   ```bash
   npm run dev
   ```

## Ekran Görüntüleri

![Uygulama Görüntüsü](./screenshots/ss.gif)

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır.
