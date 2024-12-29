# 使用するベースイメージ
FROM node:18

# 作業ディレクトリの設定
WORKDIR /app

# npmのパスを環境変数に追加
ENV PATH="/app/node_modules/.bin:${PATH}"

# 必要なパッケージのインストールと不要なファイルの削除
RUN apt update && apt install -y jq moreutils && apt clean && rm -rf /var/lib/apt/lists/*

# AWS CLIのインストール (ARM版)
# RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip" && \
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf awscliv2.zip aws

# AWS CDK のインストール
RUN npm install -g aws-cdk

# アプリケーションのソースコードをコンテナにコピー
COPY ../ /app

# # npmパッケージのインストール
# RUN npm install

# スクリプトファイルに実行権限を付与
RUN chmod +x /app/scripts/entrypoint.sh /app/scripts/run.sh

# コンテナ起動時に実行するコマンドを指定
CMD ["/app/scripts/entrypoint.sh"]
