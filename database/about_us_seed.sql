-- About Us Tables

CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  image_url text,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT team_members_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.village_values (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon text, -- Store Lucide icon name, e.g., 'Heart', 'Leaf'
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT village_values_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.village_achievements (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  label text NOT NULL, -- e.g., 'Besar ADWI 2023'
  value text NOT NULL, -- e.g., '300'
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT village_achievements_pkey PRIMARY KEY (id)
);

-- Seed Data

-- Team
INSERT INTO public.team_members (name, role, image_url, bio, display_order) VALUES
('Hermiwandi', 'Founder & Contact Person', 'https://jadesta.kemenparekraf.go.id/imguser/4560.jpg', 'Pendiri Desa Wisata Tetebatu dengan visi memberdayakan komunitas lokal melalui pariwisata berkelanjutan.', 1),
('Ketut Widiana', 'Operations Manager', '/indonesian-man-professional.jpg', 'Mengelola operasional harian dan memastikan setiap wisatawan mendapat pengalaman terbaik di Tetebatu.', 2),
('Ni Made Sari', 'Cultural Experience Coordinator', '/indonesian-woman-professional.jpg', 'Merancang paket wisata budaya yang autentik dan mendekatkan wisatawan dengan tradisi lokal Tetebatu.', 3),
('Komang Surya', 'Adventure Guide Lead', '/indonesian-guide-outdoor.jpg', 'Memimpin tim pemandu trekking profesional untuk petualangan aman dan berkesan di Gunung Rinjani dan sekitarnya.', 4);

-- Values
INSERT INTO public.village_values (title, description, icon, display_order) VALUES
('Autentisitas', 'Memberikan pengalaman wisata yang genuine dan berkesan, menampilkan kehidupan nyata masyarakat Tetebatu.', 'Heart', 1),
('Keberlanjutan', 'Menjaga kelestarian lingkungan Gunung Rinjani dan pelestarian budaya untuk generasi mendatang.', 'Leaf', 2),
('Pemberdayaan Komunitas', 'Mendukung ekonomi lokal dan pemberdayaan masyarakat melalui keterlibatan aktif dalam setiap paket wisata.', 'Users', 3),
('Kualitas Layanan', 'Memberikan pelayanan terbaik dan memanjakan setiap tamu dengan standar internasional.', 'Award', 4);

-- Achievements
INSERT INTO public.village_achievements (value, label, display_order) VALUES
('300', 'Besar ADWI 2023', 1),
('UNWTO', 'World Best Tourism Village 2021', 2),
('10K+', 'Wisatawan Per Tahun', 3),
('50+', 'Paket Wisata Tersedia', 4);

-- Settings (Story)
INSERT INTO public.settings (key, value, type, description) VALUES
('about_story_title', 'Kisah Desa Tetebatu', 'string', 'Judul bagian cerita di halaman Tentang Kami'),
('about_story_content', 'Tetebatu adalah sebuah desa yang terletak di ketinggian 700 meter di atas permukaan laut... (isi lengkap dari halaman about)', 'text', 'Isi cerita sejarah desa'),
('about_image_url', 'https://jadesta.kemenparekraf.go.id/imgpost/116570.jpg', 'string', 'Gambar utama di halaman Tentang Kami')
ON CONFLICT (key) DO NOTHING;
