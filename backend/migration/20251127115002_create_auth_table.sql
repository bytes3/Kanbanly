-- +goose Up
-- +goose StatementBegin
CREATE TABLE user_auth (
  id SERIAL PRIMARY KEY,
  username varchar(16) NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE user_auth;
-- +goose StatementEnd
