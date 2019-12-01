FROM node:lts

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# Configure apt and install packages
RUN apt-get update \
    && apt-get -y install --no-install-recommends apt-utils 2>&1 \ 
    #
    # Verify git and needed tools are installed
    && apt-get install -y git procps \
    #
    # Remove outdated yarn from /opt and install via package 
    # so it can be easily updated via apt-get upgrade yarn
    && rm -rf /opt/yarn-* \
    && rm -f /usr/local/bin/yarn \
    && rm -f /usr/local/bin/yarnpkg \
    && apt-get install -y curl apt-transport-https lsb-release \
    && curl -sS https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/pubkey.gpg | apt-key add - 2>/dev/null \
    && echo "deb https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get -y install --no-install-recommends yarn zsh \
    #
    # Sudo support for non-root user
    && apt-get -y install sudo \
    && echo node ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node \
    #
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

USER node

# Configure and install zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" \
    # Install and set up pure prompt
    && mkdir -p "$HOME/.zsh" \
    && git clone https://github.com/sindresorhus/pure.git "$HOME/.zsh/pure" \
    && echo 'fpath+=("$HOME/.zsh/pure")\n\
export ZSH="/home/node/.oh-my-zsh"\n\
ZSH_THEME=""\n\
plugins=(git ssh-agent)\n\
source $ZSH/oh-my-zsh.sh\n\
autoload -U promptinit; promptinit \n\
prompt pure' > "$HOME/.zshrc"

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=dialog

CMD ["zsh"]