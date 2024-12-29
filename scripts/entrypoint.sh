#!/usr/bin/bash

# LOG_DIRが設定されていない場合、デフォルトのディレクトリを設定
if [ -z "$LOG_DIR" ]; then
  LOG_DIR=/temp/
fi

# ログディレクトリを作成（存在しない場合）
mkdir -p "$LOG_DIR"

# ./scripts/run.sh を実行し、その出力をタイムスタンプ付きでログファイルに記録
./scripts/run.sh 2>&1 | ts "%Y-%m-%d %H:%M:%S" | tee -a "$LOG_DIR/log.txt"
