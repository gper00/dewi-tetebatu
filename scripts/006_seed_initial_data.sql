-- Seed packages data
INSERT INTO public.packages (slug, title, description, price, duration, difficulty, category, rating, image_url, highlights, includes, excludes) VALUES
('trekking-gunung-rinjani', 'Trekking Gunung Rinjani', 'Petualangan mendaki gunung tertinggi kedua di Indonesia dengan pemandangan spektakuler Danau Segara Anak.', 3500000, '3 Hari 2 Malam', 'Sedang', 'Petualangan', 4.9, '/placeholder.svg?height=400&width=600', 
  ARRAY['Danau Segara Anak', 'Puncak Rinjani 3,726 mdpl', 'Air terjun Sindang Gila', 'Camping dengan view sunrise'], 
  ARRAY['Guide profesional', 'Peralatan camping', 'Makan 3x sehari', 'Porter untuk barang', 'Transportasi PP', 'Tiket masuk'], 
  ARRAY['Peralatan pribadi', 'Asuransi perjalanan', 'Pengeluaran pribadi']),
  
('traditional-cooking-class', 'Kelas Memasak Tradisional', 'Belajar memasak masakan khas Sasak dengan bahan organik langsung dari kebun desa.', 250000, '4 Jam', 'Mudah', 'Kuliner', 5.0, '/placeholder.svg?height=400&width=600', 
  ARRAY['Resep masakan Sasak autentik', 'Bahan organik dari desa', 'Hands-on cooking experience', 'Makan hasil masakan bersama'], 
  ARRAY['Chef lokal berpengalaman', 'Semua bahan masakan', 'Apron dan peralatan', 'Recipe book', 'Sertifikat'], 
  ARRAY['Transportasi', 'Minuman tambahan']),

('air-terjun-jeruk-manis', 'Eksplorasi Air Terjun Jeruk Manis', 'Trekking santai menuju air terjun tersembunyi dengan kolam alami untuk berenang.', 150000, '3 Jam', 'Mudah', 'Alam', 4.8, '/placeholder.svg?height=400&width=600', 
  ARRAY['Air terjun 3 tingkat', 'Kolam alami untuk berenang', 'Trekking melalui hutan', 'Foto spot instagramable'], 
  ARRAY['Guide lokal', 'Welcome drink', 'Snack', 'Life jacket', 'Tiket masuk'], 
  ARRAY['Handuk', 'Pakaian ganti', 'Transportasi']),

('cycling-village-tour', 'Cycling Tour Desa Tetebatu', 'Bersepeda menyusuri persawahan hijau dan desa-desa tradisional Sasak sambil berinteraksi dengan penduduk lokal.', 200000, '5 Jam', 'Mudah', 'Budaya', 4.7, '/placeholder.svg?height=400&width=600', 
  ARRAY['Rute melalui sawah terasering', 'Kunjungi rumah adat Sasak', 'Interaksi dengan petani lokal', 'Stop di warung kopi tradisional'], 
  ARRAY['Sepeda dan helm', 'Guide berpengalaman', 'Makan siang tradisional', 'Air mineral', 'Asuransi dasar'], 
  ARRAY['Pakaian pribadi', 'Kamera']),

('bird-watching-tetebatu', 'Bird Watching Tetebatu', 'Amati burung-burung endemik Lombok di habitat alaminya bersama ornithologist lokal.', 300000, '4 Jam', 'Mudah', 'Alam', 4.9, '/placeholder.svg?height=400&width=600', 
  ARRAY['20+ spesies burung', 'Burung endemik Lombok', 'Teropong profesional', 'Bird identification guide'], 
  ARRAY['Ornithologist berpengalaman', 'Teropong binoculars', 'Bird checklist', 'Morning tea/coffee', 'Transportasi dalam desa'], 
  ARRAY['Kamera telephoto', 'Sarapan']),

('tree-adoption-program', 'Program Adopsi Pohon', 'Tanam dan adopsi pohon untuk mendukung reforestasi dan konservasi alam Tetebatu.', 0, '2 Jam', 'Mudah', 'Konservasi', 5.0, '/placeholder.svg?height=400&width=600', 
  ARRAY['Tanam pohon pribadi', 'Sertifikat adopsi', 'Update pertumbuhan pohon', 'Kontribusi konservasi'], 
  ARRAY['Bibit pohon lokal', 'Peralatan tanam', 'Plakat nama', 'Dokumentasi', 'Sertifikat digital'], 
  ARRAY['Donasi sukarela untuk perawatan']);

-- Seed activities data
INSERT INTO public.activities (slug, title, description, status, date, duration, price, location, image_url, highlights, includes, max_participants) VALUES
('festival-panen-raya-2025', 'Festival Panen Raya', 'Rayakan hasil panen dengan parade tradisional, pertunjukan seni, dan pameran produk lokal.', 'akan', '2025-05-15', '1 Hari', 0, 'Lapangan Desa Tetebatu', '/placeholder.svg?height=400&width=600', 
  ARRAY['Parade hasil panen', 'Pertunjukan tari Sasak', 'Pameran produk UMKM', 'Lomba tradisional', 'Kuliner gratis'], 
  ARRAY['Free entrance', 'Welcome drink', 'Festival map', 'Souvenir'], 100),

('workshop-tenun-ikat', 'Workshop Tenun Ikat', 'Belajar teknik menenun kain ikat tradisional Sasak dari pengrajin berpengalaman.', 'sedang', '2025-03-20', '3 Jam', 150000, 'Sanggar Tenun Desa', '/placeholder.svg?height=400&width=600', 
  ARRAY['Teknik tenun dasar', 'Pewarnaan alami', 'Hands-on practice', 'Bawa pulang hasil karya'], 
  ARRAY['Instruktur ahli', 'Bahan dan alat', 'Snack dan minuman', 'Sertifikat'], 20),

('sunrise-yoga-sawah', 'Sunrise Yoga di Sawah', 'Sesi yoga pagi dengan latar belakang sawah terasering dan udara pegunungan yang segar.', 'akan', '2025-04-10', '2 Jam', 100000, 'Sawah Terasering Tetebatu', '/placeholder.svg?height=400&width=600', 
  ARRAY['Instruktur yoga bersertifikat', 'View sawah spektakuler', 'Meditasi mindfulness', 'Healthy breakfast'], 
  ARRAY['Matras yoga', 'Breakfast organik', 'Mineral water', 'Herbal tea'], 30);

-- Seed blog posts data
INSERT INTO public.blog_posts (slug, title, excerpt, content, category, author, author_role, image_url, tags, published) VALUES
('panduan-lengkap-mendaki-gunung-rinjani', 'Panduan Lengkap Mendaki Gunung Rinjani dari Tetebatu', 'Tips dan trik untuk perjalanan trekking yang aman dan menyenangkan ke puncak tertinggi kedua Indonesia.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gunung Rinjani dengan ketinggian 3,726 mdpl menawarkan pengalaman mendaki yang tak terlupakan...', 'Petualangan', 'Hermiwandi', 'Tour Guide', '/placeholder.svg?height=400&width=800', ARRAY['Trekking', 'Rinjani', 'Tips'], true),

('kuliner-khas-sasak-yang-wajib-dicoba', 'Kuliner Khas Sasak yang Wajib Dicoba di Tetebatu', 'Jelajahi cita rasa autentik masakan tradisional Lombok yang kaya rempah dan penuh cerita.', 'Masakan Sasak memiliki karakteristik unik dengan penggunaan sambal yang pedas dan bumbu rempah yang kaya...', 'Kuliner', 'Siti Aminah', 'Culinary Expert', '/placeholder.svg?height=400&width=800', ARRAY['Kuliner', 'Sasak', 'Tradisi'], true);
