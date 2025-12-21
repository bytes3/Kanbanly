-- +goose Up
-- +goose StatementBegin

CREATE TABLE project (
    id            SERIAL PRIMARY KEY,
    account_id    SERIAL NOT NULL REFERENCES account(id),
    name          TEXT NOT NULL,
    description   TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE project_board (
    id          SERIAL PRIMARY KEY,
    project_id  SERIAL NOT NULL REFERENCES project(id),
    name        TEXT NOT NULL,
    is_default  BOOLEAN NOT NULL DEFAULT FALSE,
    position    INTEGER,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE board_list (
    id                SERIAL PRIMARY KEY,
    project_board_id  SERIAL NOT NULL REFERENCES project_board(id),
    name              TEXT NOT NULL,
    position          INTEGER NOT NULL,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE board_list_item (
    id             SERIAL PRIMARY KEY,
    board_list_id  SERIAL NOT NULL REFERENCES board_list(id),
    title          TEXT NOT NULL,
    description    TEXT,
    position       INTEGER NOT NULL,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed_at   TIMESTAMPTZ
);

CREATE OR REPLACE FUNCTION fn_init_board(
  account_id INTEGER,
  p_name TEXT,
  p_desc TEXT,
  b_name TEXT,
  b_list_names TEXT[],
  OUT project_id INTEGER,
  OUT project_name TEXT,
  OUT project_created_at TIMESTAMPTZ
) RETURNS record AS $$
DECLARE
    project_board_id INTEGER;
    bl_name TEXT;
    bl_position INTEGER = 0;
BEGIN
  INSERT INTO project(account_id, name, description)
    VALUES (
      account_id,
      p_name,
      p_desc
    ) returning id, name, created_at
      INTO project_id, project_name, project_created_at;

  INSERT INTO project_board(project_id, name, is_default, position)
    VALUES (
      project_id,
      b_name,
      TRUE,
      0
    ) returning id INTO project_board_id;

  FOREACH bl_name IN ARRAY b_list_names LOOP
    INSERT INTO board_list(project_board_id, name, position)
      VALUES (
        project_board_id,
        bl_name,
        bl_position
      );

    bl_position := bl_position + 1;
  END LOOP;
END
$$ LANGUAGE plpgsql;

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

DROP TABLE IF EXISTS board_list_item;
DROP TABLE IF EXISTS board_list;
DROP TABLE IF EXISTS project_board;
DROP TABLE IF EXISTS project;
DROP FUNCTION IF EXISTS fn_init_board;

-- +goose StatementEnd

