Install **goose** from: [https://github.com/pressly/goose](https://github.com/pressly/goose)

### Using Homebrew

```bash
brew install goose
```

---

### Using `go install`

```bash
echo 'export PATH="$PATH:$HOME/go/bin"' >> ~/.bashrc && \
go install github.com/pressly/goose/v3/cmd/goose@latest
```

### To create migration files use

```bash
yarn migration create <your_migration_name>
```

*Make sure to have ../.env file configured*
