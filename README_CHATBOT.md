# Chatbot Sistemi - Özet

## Ne Yaptık?

Klasik liderlik testinin yerine **yansıtıcı liderlik diyaloğu** sistemi kurduk.

## Özellikler

✅ **ChatGPT Tarzı Diyalog** - Açık uçlu konuşma  
✅ **Gizlilik Öncelikli** - Kullanıcı verileri saklanmaz  
✅ **Etik Yaklaşım** - Puan/kategori/teşhis yok  
✅ **Meta Analytics** - Sadece kullanım istatistikleri  
✅ **NPL & LIR Odaklı** - İlk etapta iki program için  

## Dosyalar

```
app/
├── reflection/page.tsx           # Chatbot giriş sayfası
├── api/
│   ├── chat/route.ts          # AI diyalog API
│   └── analytics/route.ts     # Kullanım istatistikleri
components/
└── chat/
    └── ChatInterface.tsx      # Chat arayüzü
```

## Kullanım

1. Siteye git: `/reflection`
2. "Diyaloğa Başla" butonuna tıkla
3. Soruları yanıtla, soru sor
4. "Ne sonuca vardın?" diye sor
5. Yansıma raporu al

## Kurulum

### 1. API Anahtarı Ekle

`.env.local` dosyası oluştur:

```
OPENAI_API_KEY=sk-...
```

veya

```
ANTHROPIC_API_KEY=sk-ant-...
```

### 2. API Kodunu Aktifleştir

`app/api/chat/route.ts` dosyasında placeholder kodunu gerçek API çağrısıyla değiştir.

Detaylı talimatlar: `CHATBOT_SETUP.md`

### 3. Çalıştır

```bash
npm install
npm run dev
```

## Nasıl Çalışır?

1. **İlk Soru**: AI otomatik ilk soruyu sorar
2. **Diyalog**: 4-6 yansıtıcı soru sorar
3. **Takip Soruları**: Kullanıcı ek soru sorabilir
4. **Tamamlama**: "Sonuç" sorusunda rapor üretir

## Rapor İçeriği

- Genel liderlik yaklaşımı
- Güçlü yönler
- Gelişim alanları
- Odak temaları
- Eğitim önerisi (NPL veya LIR)

## Analytics (Gizli)

Sadece şunlar kaydedilir:
- Kaç kişi başladı
- Kaç kişi tamamladı
- Kaç kişi yarıda bıraktı
- NPL vs LIR önerileri

**Konuşma içeriği asla saklanmaz.**

## Test Etme (API Key Olmadan)

API key olmadan da test edebilirsin:
- Placeholder sorular çalışır
- Örnek rapor üretilir
- Tüm UI fonksiyonları aktif

## Sonraki Adımlar

Eğitim içeriği hazır olduğunda:
1. Gerçek API anahtarı ekle
2. System prompt'u rafine et
3. Test et ve geri bildirim topla
4. Production'a al

## Destek

Sorular için: Alican

---

**Düşünme ve yansıtma için tasarlandı** 🌿
