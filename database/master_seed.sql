-- MASTER SEED DATA
-- Run this AFTER master_schema.sql

-- 1. PACKAGES
INSERT INTO public.packages
(title, slug, description, short_description, price, duration, difficulty, category, rating, image_url, included, is_featured, is_active)
VALUES
('Trekking Gunung Rinjani Summit 3H2M', 'trekking-rinjani-summit-3d2n',
 'Petualangan mendaki puncak tertinggi kedua di Indonesia. Saksikan matahari terbit dari atap Lombok dan keindahan Danau Segara Anak.',
 'Pendakian ke Puncak Rinjani 3726 mdpl',
 3500000, '3 Hari 2 Malam', 'hard', 'Trekking', 4.9,
 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?q=80&w=1200',
 ARRAY['Guide & Porter', 'Tiket Masuk', 'Makan & Minum', 'Tenda & Sleeping Bag', 'Transport PP'],
 true, true),

('Soft Trekking Air Terjun Tetebatu', 'soft-trekking-waterfall',
 'Jelajahi keindahan tersembunyi air terjun di sekitar hutan Tetebatu. Cocok untuk keluarga dan semua umur.',
 'Wisata alam santai ke air terjun',
 150000, '4 Jam', 'easy', 'Nature', 4.7,
 'https://images.unsplash.com/photo-1627403767280-99c7501a52c3?q=80&w=1200',
 ARRAY['Local Guide', 'Air Mineral', 'Tiket Masuk'],
 true, true),

('Camping Bukit Pergasingan', 'camping-pergasingan-hill',
 'Nikmati pemandangan kotak-kotak sawah Sembalun yang ikonik dari ketinggian 1700 mdpl tanpa pendakian berat.',
 'Camping santai dengan view sawah Sembalun',
 750000, '2 Hari 1 Malam', 'moderate', 'Camping', 4.8,
 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=1200',
 ARRAY['Tenda & Alat Masak', 'Guide', 'Makan Malam & Pagi', 'Api Unggun'],
 true, true),

('Tetebatu Rice Terrace Walk', 'rice-terrace-walk',
 'Berjalan santai menyusuri persawahan hijau yang luas dengan latar Gunung Rinjani. Temui petani lokal dan lihat kearifan lokal.',
 'Walking tour di persawahan',
 100000, '2 Jam', 'easy', 'Culture', 4.6,
 'https://images.unsplash.com/photo-1539613982442-2b620fd78893?q=80&w=1200',
 ARRAY['Local Guide', 'Kelapa Muda'],
 false, true);

-- 2. ACTIVITIES
INSERT INTO public.activities
(title, slug, description, category, duration, price, location, image_url, status, date, is_featured, is_active)
VALUES
('Festival Budaya Tetebatu', 'festival-budaya-tetebatu-2024', 'Perayaan tahunan menampilkan musik tradisional, tarian, dan pameran kerajinan.', 'Culture', '1 Hari', 50000, 'Lapangan Desa', 'https://images.unsplash.com/photo-1560938476-c56dd6a2cb93?q=80&w=1200', 'sedang', '2024-12-15', true, true),
('Workshop Tenun Sasak', 'workshop-tenun', 'Belajar menenun kain tradisional Sasak langsung dari pengrajin lokal.', 'Workshop', '3 Jam', 200000, 'Rumah Tenun', 'https://images.unsplash.com/photo-1605218427306-633ba86ccc6e?q=80&w=1200', 'akan', '2025-01-10', true, true),
('Pasar Buah & Sayur Organik', 'pasar-organik-mingguan', 'Belanja hasil bumi segar langsung dari petani Tetebatu setiap minggu pagi.', 'Market', '3 Jam', 0, 'Pasar Desa', 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1200', 'akan', '2025-01-05', false, true);

-- 3. BLOG POSTS
INSERT INTO public.blog_posts
(title, slug, content, excerpt, category, author, is_published, featured_image, read_time)
VALUES
('5 Alasan Mengapa Tetebatu Wajib Dikunjungi', '5-alasan-visit-tetebatu', 'Tetebatu sering disebut sebagai Ubud-nya Lombok karena suasananya yang tenang, hijau, dan udaranya yang sejuk. Berikut adalah 5 alasan utama...', 'Temukan pesona tersembunyi Lombok Timur di desa yang asri ini.', 'Travel Guide', 'Admin', true, 'https://images.unsplash.com/photo-1493612276216-9c5907c6f378?q=80&w=1200', '3 min read'),
('Tips Aman Mendaki Rinjani Saat Musim Hujan', 'tips-mendaki-rinjani-hujan', 'Mendaki gunung saat musim hujan membutuhkan persiapan ekstra. Jangan sampai petualanganmu terganggu...', 'Persiapan wajib sebelum trekking Rinjani di kala hujan.', 'Tips', 'Ranger', true, 'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=1200', '5 min read');

-- 4. GALLERY
INSERT INTO public.gallery_images (title, image_url, category, is_featured) VALUES
('Sunrise Rinjani', 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?q=80&w=1200', 'Nature', true),
('Air Terjun', 'https://images.unsplash.com/photo-1627403767280-99c7501a52c3?q=80&w=1200', 'Nature', true),
('Sawah Tetebatu', 'https://images.unsplash.com/photo-1596401057633-55998df49243?q=80&w=1200', 'Landscape', true),
('Tari Tradisional', 'https://images.unsplash.com/photo-1535973489814-dd23315a67a0?q=80&w=1200', 'Culture', true);

-- 5. TESTIMONIALS
INSERT INTO public.testimonials (name, comment, rating, is_approved, is_featured) VALUES
('Sarah J.', 'Pengalaman trekking terbaik! Guide sangat ramah dan sabar.', 5, true, true),
('Michael B.', 'Tetebatu sangat damai. Penduduknya ramah sekali.', 5, true, true),
('Agus T.', 'Makanan di homestay sangat enak, asli masakan Lombok.', 4, true, false);

-- 6. ADMIN USER INSTRUCTION
-- Cannot seed auth.users via SQL easily as it requires hashing.
-- Instruct user to Sign Up via the App, then update their role manually in DB.
