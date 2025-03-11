FROM python:3.11-slim

# Install basic development tools
RUN apt update && apt install -y \
    git \
    zsh \
    curl \
    vim \
    less \
    man-db \
    sudo \
    build-essential

# Create non-root user
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Install Oh My Zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Install Python tools
RUN pip install --no-cache-dir \
    black \
    flake8 \
    pylint \
    pytest

# Set shell to zsh for vscode user
RUN chsh -s $(which zsh) $USERNAME

# Set `DEVCONTAINER` environment variable to help with debugging
ENV DEVCONTAINER=true \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    SHELL=/bin/zsh

WORKDIR /workspaces/project-B

USER $USERNAME
