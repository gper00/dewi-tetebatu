# DEWI TETEBATU - BACKEND IMPLEMENTATION TODO

## SKEMA DATABASE YANG DIPERBAIKI (Supabase PostgreSQL)

### **Core Tables (Priority 1)**
```sql
-- 1. packages (Paket Wisata Utama)
- id, slug, title, description, price, duration, difficulty
- category, rating, image_url, gallery_images[]
- highlights[], includes[], excludes[], itinerary (JSONB)
- is_featured, available, created_at, updated_at

-- 2. activities (Aktivitas/Event)  
- id, slug, title, description, status (akan|sedang|selesai)
- date, duration, price, location, image_url
- highlights[], includes[], max_participants, current_participants
- created_at, updated_at

-- 3. blog_posts (Artikel Blog)
- id, slug, title, excerpt, content, category
- author, author_role, image_url, tags[]
- published, views, created_at, updated_at

-- 4. contact_messages (Pesan Kontak)
- id, name, email, phone, subject, message
- status (unread|read|replied), created_at

-- 5. testimonials (Testimoni)
- id, name, role, content, rating, image_url
- package_id (optional), activity_id (optional)
- approved, created_at

-- 6. users (User Biasa - Bisa Daftar)
- id, email, name, phone, avatar_url
- email_verified, created_at, updated_at

-- 7. admin_users (Admin - Manual Insert Only)
- id, email, name, role (admin|super_admin)
- active, last_login, created_at, updated_at
```

### **Supporting Tables (Priority 2)**
```sql
-- 6. gallery_images (Galeri Foto)
- id, title, description, image_url, category
- package_id (optional), activity_id (optional)
- featured, created_at

-- 7. settings (Pengaturan Website)
- key, value, type, description, updated_at

-- 8. admin_users (Admin Management)
- id, email, password_hash, name, role
- last_login, created_at, updated_at
```

### **Future Tables (Phase 3 - Booking System)**
```sql
-- 9. users (User Management - Future)
- id, email, name, phone, avatar_url
- email_verified, created_at, updated_at

-- 10. bookings (Sistem Booking - Future)
- id, user_id, package_id, activity_id
- booking_type (package|activity), participants
- booking_date, total_price, status
- customer_info (JSONB), special_requests
- created_at, updated_at
```

---

## TODO LIST IMPLEMENTASI

### **PHASE 1: Database Setup & Core Schema**
- [x] 1.1 Backup existing data (if any)
- [x] 1.2 Drop existing tables and create clean schema
- [x] 1.3 Setup RLS policies for security
- [x] 1.4 Create proper indexes for performance
- [x] 1.5 Update TypeScript types in `/lib/types/database.ts`
- [x] 1.6 Setup user management (regular users + admin users)
- [ ] 1.7 Test database connections and run migration

### **PHASE 2: Core API Development**
- [ ] 2.1 **Packages API**
  - [ ] GET /api/packages (filters: category, featured, limit)
  - [ ] GET /api/packages/[slug]
  - [ ] POST /api/packages (admin only)
  - [ ] PUT /api/packages/[slug] (admin only)
  - [ ] DELETE /api/packages/[slug] (admin only)

- [ ] 2.2 **Activities API**
  - [ ] GET /api/activities (filters: status, limit)
  - [ ] GET /api/activities/[slug]
  - [ ] POST /api/activities (admin only)
  - [ ] PUT /api/activities/[slug] (admin only)

- [ ] 2.3 **Blog API**
  - [ ] GET /api/blog (pagination, category filter)
  - [ ] GET /api/blog/[slug]
  - [ ] POST /api/blog (admin only)
  - [ ] PUT /api/blog/[slug] (admin only)

### **PHASE 3: Contact & Testimonials**
- [ ] 3.1 **Contact System**
  - [ ] POST /api/contact (submit message)
  - [ ] GET /api/contact (admin - list messages)
  - [ ] PUT /api/contact/[id] (admin - update status)

- [ ] 3.2 **Testimonials System**
  - [ ] GET /api/testimonials (public)
  - [ ] POST /api/testimonials (submit testimonial)
  - [ ] GET /api/admin/testimonials (admin - manage)
  - [ ] PUT /api/testimonials/[id] (admin - approve/reject)

### **PHASE 4: Admin Panel**
- [ ] 4.1 **Admin Authentication**
  - [ ] Admin login system
  - [ ] Protected admin routes middleware
  - [ ] Session management

- [ ] 4.2 **Admin Dashboard**
  - [ ] Statistics overview
  - [ ] Content management interface
  - [ ] Message management

### **PHASE 5: Media & Gallery**
- [ ] 5.1 **File Upload System**
  - [ ] Supabase Storage setup
  - [ ] Image upload API
  - [ ] Image optimization

- [ ] 5.2 **Gallery Management**
  - [ ] Gallery CRUD operations
  - [ ] Image categorization
  - [ ] Featured images system

### **PHASE 6: Data Integration**
- [ ] 6.1 **Seed Initial Data**
  - [ ] Create sample packages
  - [ ] Create sample activities
  - [ ] Create sample blog posts
  - [ ] Create sample testimonials

- [ ] 6.2 **Frontend Integration**
  - [ ] Update existing components to use new APIs
  - [ ] Test all frontend functionality
  - [ ] Fix any data mapping issues

### **PHASE 7: Future Features (Booking System)**
- [ ] 7.1 **User Management**
  - [ ] User registration/login
  - [ ] User profiles
  - [ ] Email verification

- [ ] 7.2 **Booking System**
  - [ ] Booking creation flow
  - [ ] Payment integration (future)
  - [ ] Booking management
  - [ ] Email notifications

### **PHASE 8: Production Ready**
- [ ] 8.1 **Testing & Validation**
  - [ ] API endpoint testing
  - [ ] Database integrity tests
  - [ ] Performance testing

- [ ] 8.2 **SEO & Performance**
  - [ ] Metadata generation
  - [ ] Caching strategies
  - [ ] Image optimization

- [ ] 8.3 **Deployment**
  - [ ] Environment variables setup
  - [ ] Database backup strategy
  - [ ] Monitoring setup

---

## PRIORITAS EKSEKUSI

**IMMEDIATE (Week 1):**
- Phase 1: Database Setup
- Phase 2.1: Packages API
- Phase 2.2: Activities API

**SHORT TERM (Week 2-3):**
- Phase 2.3: Blog API
- Phase 3: Contact & Testimonials
- Phase 6.1: Seed Data

**MEDIUM TERM (Month 1):**
- Phase 4: Admin Panel
- Phase 5: Media Management
- Phase 6.2: Frontend Integration

**LONG TERM (Future):**
- Phase 7: Booking System
- Phase 8: Production Optimization

---

## CATATAN PENTING

1. **Fokus pada paket wisata sebagai core feature**
2. **Booking system akan diimplementasi di fase mendatang**
3. **Prioritaskan API yang sudah digunakan frontend**
4. **Pastikan backward compatibility dengan komponen existing**
5. **Setup proper error handling dan validation**
