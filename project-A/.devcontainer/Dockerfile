FROM node:18

# Install basic development tools
RUN apt update && apt install -y \
    git \
    zsh \
    curl \
    vim \
    less \
    man-db \
    sudo

# Install Oh My Zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Ensure default `node` user has access to `sudo`
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Set shell to zsh
RUN chsh -s $(which zsh) $USERNAME

# Set `DEVCONTAINER` environment variable to help with debugging
ENV DEVCONTAINER=true

WORKDIR /workspaces/project-A

# Set zsh as the default shell
ENV SHELL=/bin/zsh

USER $USERNAME
