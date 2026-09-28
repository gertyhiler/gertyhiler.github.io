## The problem

My everyday configuration lived in different places. Zsh belonged to my Mac, Fish to my work laptop, and Neovim already had its own repository. I wanted a setup I could inspect and carry with me without building another tool to maintain.

## The decision

Keep one repository with a flat directory for each application. Keep Neovim as a Git submodule. Start with manually created symbolic links, so installation stays explicit.

```text
dotfiles/
  fish/
  ghostty/
  git/
  nvim/        # Git submodule
  tmux/
  zsh/
```

The repository stores configuration. Machine identity, secrets, sessions, and mutable application state stay outside it.

## Why keep installation manual?

An installer would save a few commands, but it would also need to handle existing files, backups, different machines, and partial failures. For my own setup, explicit links are a reasonable trade-off.

The same choice applies to repository structure: a directory per application is enough. There is no configuration framework to learn before changing a shell alias.

## What this shows

The useful result is a small, readable repository with English documentation and a pinned Neovim dependency. macOS is the primary environment; Fish configuration comes from the work laptop.

This is a setup I can evolve when a real need appears. Automatic installation can wait.

[Read the repository on GitHub ↗](https://github.com/gertyhiler/dotfiles)
