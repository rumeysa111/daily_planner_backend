# 📌 Daily Planner Backend

## 📖 Proje Özellikleri

Bu proje, **DDD (Domain-Driven Design)** yaklaşımıyla geliştirilmiş bir **Daily Planner uygulamasının backend kısmıdır**. MongoDB veritabanı üzerinde çalışan, **Express ve Node.js ile yazılmış bir RESTful API**'dir.

---

## ✨ Özellikler

### 🔑 **Kullanıcı Yönetimi**
- ✅ Kayıt olma ve giriş yapma
- 🔒 JWT tabanlı kimlik doğrulama
- 🛠 Profil yönetimi ve şifre değiştirme

### ✅ **Todo Yönetimi**
- 📝 Görev oluşturma, düzenleme, silme ve listeleme
- 📅 Tarih bazlı filtreleme
- 📂 Kategori bazlı organizasyon

### 🏷️ **Kategori Yönetimi**
- 🎨 Özelleştirilebilir kategoriler (simge ve renk)
- 📌 Varsayılan kategori ataması
- 🔄 CRUD işlemleri (Oluştur, Oku, Güncelle, Sil)

### 📊 **İstatistikler**
- 📈 Tamamlanma oranları
- 📂 Kategori bazlı dağılımlar
- 📅 Haftalık ilerleme takibi
- 🔥 Günlük tamamlama serisi (streak)

---

## 🛠 Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|-----------|----------|
| **Backend** | Node.js, Express.js |
| **Veritabanı** | MongoDB (Mongoose ORM) |
| **Kimlik Doğrulama** | JWT (JSON Web Tokens) |
| **Güvenlik** | bcryptjs (Şifre hashleme) |
| **Dağıtım** | Azure Web Apps |

---

## 🚀 Kurulum

### **1️⃣ Projeyi Klonlayın**
```bash
git clone https://github.com/rumeysa111/daily_planner_backend.git
```

### **2️⃣ Bağımlılıkları Yükleyin**
```bash
npm install
```

### **3️⃣ .env Dosyasını Konfigüre Edin**
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8080
```

### **4️⃣ Uygulamayı Başlatın**
```bash
npm start
```

---

## 📡 API Endpointleri

### 🔑 **Kullanıcı İşlemleri**
| Endpoint | Metod | Açıklama |
|----------|-------|----------|
| `/api/auth/register` | POST | Yeni kullanıcı kaydı |
| `/api/auth/login` | POST | Kullanıcı girişi |
| `/api/auth/user` | GET | Kullanıcı profilini görüntüleme |
| `/api/auth/profile` | PUT | Kullanıcı profilini güncelleme |
| `/api/auth/change-password` | POST | Şifre değiştirme |

### 📝 **Todo İşlemleri**
| Endpoint | Metod | Açıklama |
|----------|-------|----------|
| `/api/todos` | POST | Yeni görev oluşturma |
| `/api/todos` | GET | Kullanıcı görevlerini listeleme |
| `/api/todos/by-date` | GET | Tarih bazlı görev listeleme |
| `/api/todos/:id` | PUT | Görev güncelleme |
| `/api/todos/:id` | DELETE | Görev silme |

### 🏷️ **Kategori İşlemleri**
| Endpoint | Metod | Açıklama |
|----------|-------|----------|
| `/api/categories` | POST | Yeni kategori oluşturma |
| `/api/categories/:id` | GET | Kullanıcı kategorilerini listeleme |
| `/api/categories/:id` | PUT | Kategori güncelleme |
| `/api/categories/:id` | DELETE | Kategori silme |

### 📊 **İstatistik İşlemleri**
| Endpoint | Metod | Açıklama |
|----------|-------|----------|
| `/api/statistics` | GET | Kullanıcı istatistiklerini getirme |

---

## 🏗️ Mimari

Proje, **Domain-Driven Design (DDD)** prensiplerine uygun olarak geliştirilmiştir:

- **Controller**: İstek ve yanıtları yönetir
- **Service**: İş mantığını içerir
- **Model**: Veritabanı şemalarını tanımlar
- **Middleware**: Kimlik doğrulama gibi ara işlemleri yönetir
- **Routes**: API endpoint yönlendirmelerini tanımlar
- **Config**: Yapılandırma ayarlarını içerir

---
## 🎯 Katkıda Bulunma

1. **Fork yapın** (Sağ üst köşedeki Fork butonuna basın).
2. Yeni bir **özellik dalı** oluşturun (`git checkout -b feature/amazing-feature`).
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`).
4. **Dalınıza push edin** (`git push origin feature/amazing-feature`).
5. **Pull Request açın** 🎉

## ⚙️ CI/CD

Proje, **GitHub Actions** kullanılarak **Azure Web Apps**'e otomatik olarak dağıtılacak şekilde yapılandırılmıştır. **main** branch'ine yapılan her commit sonrası dağıtım gerçekleştirilir.

---

## 📜 Lisans

*MIT Lisansı** altında sunulmaktadır. *

)
