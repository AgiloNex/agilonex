-- ============================================================
-- Schema D1 — Sistema de comentários (UGC) com moderação
-- seoSchemas.ts emite Comment JSON-LD a partir dos registros
-- aprovados desta tabela.
-- ============================================================

CREATE TABLE IF NOT EXISTS comments (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  post_slug    TEXT    NOT NULL,
  author_name  TEXT    NOT NULL,
  author_url   TEXT,                       -- site/website opcional; renderizado com rel="ugc nofollow"
  body         TEXT    NOT NULL,
  rating       INTEGER DEFAULT NULL,       -- 1..5 opcional (review-style comment)
  status       TEXT    NOT NULL DEFAULT 'pending',  -- pending | approved | spam | rejected
  created_at   TEXT    NOT NULL DEFAULT (datetime('now')),
  ip_hash      TEXT,                       -- hash do IP para rate-limiting (SHA-256)
  user_agent   TEXT,
  lang         TEXT    NOT NULL DEFAULT 'pt'
);

-- índice para listar comentários aprovados de um post (ordenados por data)
CREATE INDEX IF NOT EXISTS idx_comments_post_status
  ON comments(post_slug, status, created_at DESC);

-- índice para moderação (listar pendentes)
CREATE INDEX IF NOT EXISTS idx_comments_status
  ON comments(status, created_at DESC);

-- índice para rate-limiting por IP nos últimos minutos
CREATE INDEX IF NOT EXISTS idx_comments_iphash
  ON comments(ip_hash, created_at DESC);
