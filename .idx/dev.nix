{ pkgs, ... }: {
  # Which channel to use
  channel = "stable-23.11";

  services.docker.enable = true;

  packages = [
    pkgs.nodejs_21    # Use 21 instead of 22
    pkgs.docker-compose
  ];

  # Search for the "idx" extension in the marketplace
  idx.extensions = [
    "esbenp.prettier-vscode"
    "dbaeumer.vscode-eslint"
    "google.gemini-cli-vscode-ide-companion"
  ];
}