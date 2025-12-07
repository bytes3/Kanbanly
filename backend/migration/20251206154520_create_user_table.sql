-- +goose Up
-- +goose StatementBegin
CREATE TABLE account_user(
  id SERIAL PRIMARY KEY,
  account_id INTEGER REFERENCES account(id),
  username VARCHAR(24) UNIQUE NOT NULL,
  first_name VARCHAR(24) NOT NULL,
  last_name VARCHAR(24) NOT NULL,
  date_birth TIMESTAMPTZ NOT NULL,
  gender VARCHAR(24),
  city CHAR(2) NOT NULL,
  country CHAR(2) NOT NULL,
  state CHAR(2),
  completed_onboarding BOOLEAN NOT NULL DEFAULT TRUE
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE account_user;
-- +goose StatementEnd
