-- +goose Up
-- +goose StatementBegin
DROP TABLE user_auth;
CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  email varchar(255) NOT NULL,
  password_hash varchar(64) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(email)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE account;
CREATE TABLE user_auth (
  id SERIAL PRIMARY KEY,
  username varchar(16) NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
-- +goose StatementEnd
